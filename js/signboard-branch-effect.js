const LEVER_ON_EFFECT_FINISHED_EVENT_NAME = 'slot:lever-on-effect-finished';
const SIGNBOARD_UP_AUDIO_EVENT_NAME = 'slot:signboard-up';
const SIGNBOARD_DOWN_AUDIO_EVENT_NAME = 'slot:signboard-down';
const SIGNBOARD_SLIDE_DURATION_MS = 400;
const SIGNBOARD_VISIBLE_MS = 1000;

const wait = (ms) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

const IMAGE_FILE_MAP = {
  veryhot: 'high',
  hot: 'middle',
  slightly: 'low',
  chance: 'chance',
};

const hideBaseSignboard = (signboardElement) => {
  if (!signboardElement) {
    return;
  }

  signboardElement.style.opacity = '0';
};

const slideOutBaseSignboard = async (signboardElement) => {
  if (!signboardElement) {
    return;
  }

  await animateSignboardMovement(signboardElement, [
    { transform: 'translateY(0)', opacity: 1 },
    { transform: 'translateY(140%)', opacity: 1 },
  ]);

  hideBaseSignboard(signboardElement);
};

const showBaseSignboard = (signboardElement) => {
  if (!signboardElement) {
    return;
  }

  signboardElement.style.opacity = '';
};

const setSignboardImage = (signboardEffectImage, imageType) => {
  const imageFileType = IMAGE_FILE_MAP[imageType];

  if (!signboardEffectImage || !imageFileType) {
    return false;
  }

  signboardEffectImage.src = `./img/signboard/signboard-${imageFileType}.png`;
  return true;
};

const animateSignboardMovement = async (signboardEffectImage, keyframes) => {
  if (!signboardEffectImage?.animate) {
    return;
  }

  const animation = signboardEffectImage.animate(keyframes, {
    duration: SIGNBOARD_SLIDE_DURATION_MS,
    easing: 'ease-out',
    fill: 'forwards',
  });

  try {
    await animation.finished;
  } catch (_error) {
    // アニメーション中断時も続行
  }
};

// 看板分岐時の専用スライド演出を実行します。
export const runSignboardBranchEffect = async ({ detail, effectType, imageType, logMessage }) => {
  const mainSignboard = document.querySelector('.js-main-signboard');
  const signboardEffectContainer = document.querySelector('.js-signboard-branch-effect');
  const signboardEffectImage = document.querySelector('.js-signboard-branch-effect-image');
  const cutinMovie = document.querySelector('.js-lever-on-cutin-movie-effect');
  const isSignboardImageReady = setSignboardImage(signboardEffectImage, imageType);

  if (cutinMovie) {
    cutinMovie.hidden = true;
  }

  if (!signboardEffectContainer || !signboardEffectImage || !isSignboardImageReady) {
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

  await slideOutBaseSignboard(mainSignboard);
  signboardEffectContainer.hidden = false;
  window.dispatchEvent(new CustomEvent(SIGNBOARD_UP_AUDIO_EVENT_NAME));

  await animateSignboardMovement(signboardEffectContainer, [
    { transform: 'translateY(140%)' },
    { transform: 'translateY(0)' },
  ]);

  await wait(SIGNBOARD_VISIBLE_MS);

  await animateSignboardMovement(signboardEffectContainer, [
    { transform: 'translateY(0)' },
    { transform: 'translateY(140%)' },
  ]);
  window.dispatchEvent(new CustomEvent(SIGNBOARD_DOWN_AUDIO_EVENT_NAME));

  signboardEffectContainer.hidden = true;

  await animateSignboardMovement(mainSignboard, [
    { transform: 'translateY(140%)', opacity: 1 },
    { transform: 'translateY(0)', opacity: 1 },
  ]);

  showBaseSignboard(mainSignboard);

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
