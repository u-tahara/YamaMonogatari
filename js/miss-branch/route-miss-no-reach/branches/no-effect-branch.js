const LEVER_ON_EFFECT_FINISHED_EVENT_NAME = 'slot:lever-on-effect-finished';

// 演出なしの分岐先処理です。
export const runMissNoEffectBranch = (detail) => {
  const signboardImage = document.querySelector('.js-signboard-hit-effect');
  const cutinImage = document.querySelector('.js-lever-on-cutin-hit-effect');

  if (signboardImage) {
    signboardImage.hidden = true;
  }

  if (cutinImage) {
    cutinImage.hidden = true;
  }

  window.dispatchEvent(
    new CustomEvent(LEVER_ON_EFFECT_FINISHED_EVENT_NAME, {
      detail: {
        ...detail,
        effectType: 'none',
      },
    }),
  );

  console.log('外れ演出: 演出なし');
};
