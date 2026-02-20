const REACH_HIT_EFFECT_FINISHED_EVENT_NAME = 'slot:reach-hit-effect-finished';
const EFFECT_VISIBLE_MS = 3000;

// リーチ後スズ背景演出の分岐先処理です。
export const runReachSuzuBackgroundBranch = (detail) => {
  const suzuBackgroundImage = document.querySelector('.js-reach-suzu-background-effect');
  const cutinImage = document.querySelector('.js-cutin-hit-effect');
  const signboardImage = document.querySelector('.js-signboard-hit-effect');
  const characterGroupVideo = document.querySelector('.js-reach-character-group-effect');

  if (cutinImage) {
    cutinImage.hidden = true;
  }

  if (signboardImage) {
    signboardImage.hidden = true;
  }

  if (characterGroupVideo) {
    characterGroupVideo.hidden = true;
  }

  if (!suzuBackgroundImage) {
    window.dispatchEvent(
      new CustomEvent(REACH_HIT_EFFECT_FINISHED_EVENT_NAME, {
        detail: {
          ...detail,
          effectType: 'suzu-background',
        },
      }),
    );
    return;
  }

  suzuBackgroundImage.src = './img/suzu-background/suzu.png';
  suzuBackgroundImage.hidden = false;

  window.setTimeout(() => {
    suzuBackgroundImage.hidden = true;

    window.dispatchEvent(
      new CustomEvent(REACH_HIT_EFFECT_FINISHED_EVENT_NAME, {
        detail: {
          ...detail,
          effectType: 'suzu-background',
        },
      }),
    );
  }, EFFECT_VISIBLE_MS);

  window.dispatchEvent(new CustomEvent('slot:hit-effect-reach-suzu-background', { detail }));
  console.log('リーチ後当たり演出: スズ背景');
};
