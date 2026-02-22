const LEVER_ON_EFFECT_FINISHED_EVENT_NAME = 'slot:lever-on-effect-finished';
const LEVER_ON_CUTIN_CENTER_EVENT_NAME = 'slot:lever-on-cutin-center';
const EFFECT_VISIBLE_MS = 3000;
const BIRD_CENTER_REACHED_MS = 850;
const BIRD_RESET_FADE_IN_MS = 300;

const wait = (ms) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

const animateBird = async (birdImage) => {
  if (!birdImage) {
    await wait(EFFECT_VISIBLE_MS);
    return;
  }

  birdImage.classList.add('is-lever-on-cutin-active');

  await wait(EFFECT_VISIBLE_MS);

  birdImage.classList.remove('is-lever-on-cutin-active');

  birdImage.style.transition = `opacity ${BIRD_RESET_FADE_IN_MS}ms ease`;
  birdImage.style.opacity = '1';

  await wait(BIRD_RESET_FADE_IN_MS);

  birdImage.style.transition = '';
  birdImage.style.opacity = '';
};

const notifyBirdCenterReached = async ({ detail, effectType }) => {
  await wait(BIRD_CENTER_REACHED_MS);

  window.dispatchEvent(
    new CustomEvent(LEVER_ON_CUTIN_CENTER_EVENT_NAME, {
      detail: {
        ...detail,
        effectType,
      },
    }),
  );
};

// レバーオン向けカットイン演出を実行します。
export const runLeverOnCutInEffect = async ({ detail, effectType, color, logMessage }) => {
  const signboardImage = document.querySelector('.js-signboard-hit-effect');
  const cutinImage = document.querySelector('.js-lever-on-cutin-hit-effect');
  const cutinMovie = document.querySelector('.js-lever-on-cutin-movie-effect');
  const leftBirdImage = document.querySelector('.js-main-bird-left');
  const rightBirdImage = document.querySelector('.js-main-bird-right');

  if (signboardImage) {
    signboardImage.hidden = true;
  }

  if (!cutinImage) {
    window.dispatchEvent(
      new CustomEvent(LEVER_ON_EFFECT_FINISHED_EVENT_NAME, {
        detail: {
          ...detail,
          effectType,
        },
      }),
    );
    return;
  }

  cutinImage.src = `./img/bird-cutin/${color}.png`;
  cutinImage.hidden = false;

  if (cutinMovie) {
    cutinMovie.src = `./movie/${color}.mov`;
    cutinMovie.hidden = false;
    cutinMovie.currentTime = 0;
    cutinMovie.play().catch(() => {});
  }

  await Promise.all([
    animateBird(leftBirdImage),
    animateBird(rightBirdImage),
    notifyBirdCenterReached({ detail, effectType }),
  ]);

  cutinImage.hidden = true;

  if (cutinMovie) {
    cutinMovie.pause();
    cutinMovie.currentTime = 0;
    cutinMovie.hidden = true;
  }

  window.dispatchEvent(
    new CustomEvent(LEVER_ON_EFFECT_FINISHED_EVENT_NAME, {
      detail: {
        ...detail,
        effectType,
      },
    }),
  );

  console.log(logMessage);
};
