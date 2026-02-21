const LEVER_ON_EFFECT_FINISHED_EVENT_NAME = 'slot:lever-on-effect-finished';
const EFFECT_VISIBLE_MS = 3000;
const MOVE_TO_CENTER_MS = 1000;
const WAIT_AT_CENTER_MS = 1000;
const FLY_TO_LEFT_MS = 1000;
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

  const birdRect = birdImage.getBoundingClientRect();
  const centerLeftPx = (window.innerWidth - birdRect.width) / 2;
  const flyOutLeftPx = -birdRect.width - 40;
  const originalLeft = birdImage.style.left;
  const originalOpacity = birdImage.style.opacity;
  const originalTransition = birdImage.style.transition;

  birdImage.style.willChange = 'left, opacity';

  const toCenterAnimation = birdImage.animate(
    [
      { left: `${birdRect.left}px` },
      { left: `${centerLeftPx}px` },
    ],
    {
      duration: MOVE_TO_CENTER_MS,
      easing: 'cubic-bezier(0.4, 0, 1, 1)',
      fill: 'forwards',
    },
  );

  await toCenterAnimation.finished;

  await wait(WAIT_AT_CENTER_MS);

  const flyLeftAnimation = birdImage.animate(
    [
      { left: `${centerLeftPx}px` },
      { left: `${flyOutLeftPx}px` },
    ],
    {
      duration: FLY_TO_LEFT_MS,
      easing: 'cubic-bezier(0.4, 0, 1, 1)',
      fill: 'forwards',
    },
  );

  await flyLeftAnimation.finished;

  birdImage.style.transition = 'none';
  birdImage.style.opacity = '0';
  birdImage.style.left = originalLeft;
  void birdImage.offsetWidth;
  birdImage.style.transition = `opacity ${BIRD_RESET_FADE_IN_MS}ms ease`;
  birdImage.style.opacity = '1';

  await wait(BIRD_RESET_FADE_IN_MS);

  birdImage.style.transition = originalTransition;
  birdImage.style.opacity = originalOpacity;
  birdImage.style.willChange = '';
};

// レバーオン向けカットイン演出を実行します。
export const runLeverOnCutInEffect = async ({ detail, effectType, color, logMessage }) => {
  const signboardImage = document.querySelector('.js-signboard-hit-effect');
  const cutinImage = document.querySelector('.js-lever-on-cutin-hit-effect');
  const leftBirdImage = document.querySelector('.js-main-bird-left');

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

  await animateBird(leftBirdImage);

  cutinImage.hidden = true;

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
