import { getTimeValue } from '../../time-summary.js';

// 7図柄当たり時のプレミア動画演出を管理するコントローラーを生成します。
export const createPremiumHitMovieController = ({
  blackoutMovie,
  changeMovie,
  onChangeStarted,
  onFadeOutCompleted,
  onCompleted,
}) => {
  let isRunning = false;
  const PREMIUM_FADE_OUT_DURATION_MS = getTimeValue('premiumFadeOutDurationMs');
  const PREMIUM_FADE_OUT_CLASS_NAME = 'js-premium-movie-fade-out';

  const wait = (ms) => new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

  const normalizeMovie = (movieElement) => {
    if (!movieElement) {
      return;
    }

    movieElement.pause();
    movieElement.currentTime = 0;
    movieElement.classList.remove(PREMIUM_FADE_OUT_CLASS_NAME);
    movieElement.hidden = true;
  };

  const safePlayMovie = (movieElement) => {
    if (!movieElement) {
      return;
    }

    movieElement.play().catch(() => {
      // ユーザー操作制限時は次の操作で再試行されます。
    });
  };

  const hideMovie = async (movieElement, { useFadeOut = true } = {}) => {
    if (!movieElement) {
      return;
    }

    if (useFadeOut) {
      movieElement.classList.add(PREMIUM_FADE_OUT_CLASS_NAME);
      await wait(PREMIUM_FADE_OUT_DURATION_MS);
      movieElement.classList.remove(PREMIUM_FADE_OUT_CLASS_NAME);
    }

    movieElement.pause();
    movieElement.currentTime = 0;
    movieElement.hidden = true;
  };

  const showMovie = (movieElement) => {
    if (!movieElement) {
      return;
    }

    movieElement.classList.remove(PREMIUM_FADE_OUT_CLASS_NAME);
    movieElement.hidden = false;
    movieElement.currentTime = 0;
  };

  const reset = () => {
    isRunning = false;
    normalizeMovie(blackoutMovie);
    normalizeMovie(changeMovie);
  };

  const run = async () => {
    if (!changeMovie || isRunning) {
      return false;
    }

    isRunning = true;

    showMovie(changeMovie);
    safePlayMovie(changeMovie);

    if (typeof onChangeStarted === 'function') {
      onChangeStarted();
    }

    await new Promise((resolve) => {
      const handleEnded = () => {
        changeMovie.removeEventListener('ended', handleEnded);
        resolve();
      };

      changeMovie.addEventListener('ended', handleEnded);
    });

    if (!isRunning) {
      return false;
    }

    await Promise.all([
      hideMovie(blackoutMovie, { useFadeOut: true }),
      hideMovie(changeMovie, { useFadeOut: true }),
    ]);

    if (typeof onFadeOutCompleted === 'function') {
      onFadeOutCompleted();
    }

    isRunning = false;

    if (typeof onCompleted === 'function') {
      onCompleted();
    }

    return true;
  };

  return {
    isRunning: () => isRunning,
    reset,
    run,
  };
};
