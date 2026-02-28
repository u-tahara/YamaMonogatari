const REACH_CHANGE_MOVIE_PAUSE_MS = 3400;
const ENTER_KEY = 'Enter';
const REACH_PUSH_BUTTON_MOVIE_STARTED_EVENT_NAME = 'slot:reach-push-button-movie-started';

// 当たりリーチ後の動画演出を管理するコントローラーを生成します。
export const createReachHitMovieSequenceController = ({
  reachChangeMovie,
  pushButtonMovie,
}) => {
  let isRunning = false;
  let isAwaitingEnter = false;
  let pendingResolver = null;
  let pauseTimeoutId = null;

  const safePlayMovie = (movieElement) => {
    if (!movieElement) {
      return;
    }

    movieElement
      .play()
      .catch(() => {
        // ユーザー操作制限時は次の入力で再試行されます。
      });
  };

  const stopAndHideMovie = (movieElement) => {
    if (!movieElement) {
      return;
    }

    movieElement.pause();
    movieElement.currentTime = 0;
    movieElement.hidden = true;
  };

  const clearPauseTimer = () => {
    if (pauseTimeoutId !== null) {
      window.clearTimeout(pauseTimeoutId);
      pauseTimeoutId = null;
    }
  };

  const resolvePending = () => {
    if (pendingResolver) {
      pendingResolver();
      pendingResolver = null;
    }
  };

  const reset = () => {
    clearPauseTimer();
    isRunning = false;
    isAwaitingEnter = false;
    resolvePending();
    stopAndHideMovie(reachChangeMovie);
    stopAndHideMovie(pushButtonMovie);
  };

  const waitForEnterOnPushButtonMovie = () =>
    new Promise((resolve) => {
      pendingResolver = resolve;
    });

  const handleAdvanceInput = () => {
    if (!isAwaitingEnter) {
      return false;
    }

    isAwaitingEnter = false;
    resolvePending();
    return true;
  };

  const handleEnterKeyDown = (event) => {
    if (event.key !== ENTER_KEY) {
      return false;
    }

    const hasHandled = handleAdvanceInput();

    if (!hasHandled) {
      return false;
    }

    event.preventDefault();
    return true;
  };

  const run = async () => {
    if (!reachChangeMovie || !pushButtonMovie) {
      return false;
    }

    isRunning = true;

    reachChangeMovie.currentTime = 0;
    reachChangeMovie.hidden = false;

    const pauseBgmOnReachChangeMoviePlay = () => {
      if (typeof window.pauseBgm === 'function') {
        window.pauseBgm();
      }
    };

    reachChangeMovie.addEventListener('play', pauseBgmOnReachChangeMoviePlay, {
      once: true,
    });
    safePlayMovie(reachChangeMovie);

    await new Promise((resolve) => {
      pauseTimeoutId = window.setTimeout(resolve, REACH_CHANGE_MOVIE_PAUSE_MS);
    });
    pauseTimeoutId = null;

    if (!isRunning) {
      return false;
    }

    reachChangeMovie.pause();

    isAwaitingEnter = true;
    pushButtonMovie.currentTime = 0;
    pushButtonMovie.hidden = false;
    safePlayMovie(pushButtonMovie);
    window.dispatchEvent(new CustomEvent(REACH_PUSH_BUTTON_MOVIE_STARTED_EVENT_NAME));

    await waitForEnterOnPushButtonMovie();

    if (!isRunning) {
      return false;
    }

    stopAndHideMovie(pushButtonMovie);
    safePlayMovie(reachChangeMovie);

    await new Promise((resolve) => {
      const handleEnded = () => {
        reachChangeMovie.removeEventListener('ended', handleEnded);
        resolve();
      };

      reachChangeMovie.addEventListener('ended', handleEnded);
    });

    if (!isRunning) {
      return false;
    }

    if (typeof window.resumeBgmWithFadeIn === 'function') {
      window.resumeBgmWithFadeIn();
    }

    reset();
    return true;
  };

  return {
    handleAdvanceInput,
    handleEnterKeyDown,
    isRunning: () => isRunning,
    reset,
    run,
  };
};
