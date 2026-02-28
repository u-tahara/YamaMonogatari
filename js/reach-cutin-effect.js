import { getVolumeValue } from './volume-summary.js';

const REACH_CUTIN_MOVIE_BASE_PATH = './movie';

let reachCutinMovieVolume = getVolumeValue('reachCutinMovie');

const clampVolume = (value) => Math.min(1, Math.max(0, value));

// リーチカットイン動画の音量を設定します（0.0〜1.0）。
export const setReachCutinMovieVolume = (volume) => {
  reachCutinMovieVolume = clampVolume(volume);
};

// リーチカットイン動画の現在音量を返します。
export const getReachCutinMovieVolume = () => reachCutinMovieVolume;

// リーチカットイン動画を再生します。
export const playReachCutinMovieEffect = ({
  detail,
  eventName,
  effectType,
  color,
  logMessage,
}) => {
  const cutinMovie = document.querySelector('.js-reach-cutin-hit-effect');
  const signboardImage = document.querySelector('.js-signboard-hit-effect');
  const characterGroupVideo = document.querySelector('.js-reach-character-group-effect');

  if (signboardImage) {
    signboardImage.hidden = true;
  }

  if (characterGroupVideo) {
    characterGroupVideo.hidden = true;
  }

  const dispatchFinishedEvent = () => {
    window.dispatchEvent(
      new CustomEvent(eventName, {
        detail: {
          ...detail,
          effectType,
        },
      }),
    );
  };

  if (!cutinMovie) {
    dispatchFinishedEvent();
    return;
  }

  cutinMovie.pause();
  cutinMovie.currentTime = 0;
  cutinMovie.src = `${REACH_CUTIN_MOVIE_BASE_PATH}/reach-${color}.webm`;
  cutinMovie.volume = reachCutinMovieVolume;
  cutinMovie.hidden = false;

  const handleMovieEnd = () => {
    cutinMovie.hidden = true;
    dispatchFinishedEvent();
  };

  cutinMovie.addEventListener('ended', handleMovieEnd, { once: true });

  const playPromise = cutinMovie.play();

  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(() => {
      cutinMovie.hidden = true;
      dispatchFinishedEvent();
    });
  }

  console.log(logMessage);
};
