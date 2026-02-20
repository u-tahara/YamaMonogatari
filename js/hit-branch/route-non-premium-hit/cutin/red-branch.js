const LEVER_ON_EFFECT_FINISHED_EVENT_NAME = 'slot:lever-on-effect-finished';
const EFFECT_VISIBLE_MS = 1000;

// カットイン演出（赤）分岐の処理です。
export const runCutInRedBranch = (detail) => {
  const signboardImage = document.querySelector('.js-signboard-hit-effect');
  const cutinImage = document.querySelector('.js-cutin-hit-effect');

  if (signboardImage) {
    signboardImage.hidden = true;
  }

  if (!cutinImage) {
    window.dispatchEvent(
      new CustomEvent(LEVER_ON_EFFECT_FINISHED_EVENT_NAME, {
        detail: {
          ...detail,
          effectType: 'cutin-red',
        },
      }),
    );
    return;
  }

  cutinImage.hidden = false;

  window.setTimeout(() => {
    cutinImage.hidden = true;
    window.dispatchEvent(
      new CustomEvent(LEVER_ON_EFFECT_FINISHED_EVENT_NAME, {
        detail: {
          ...detail,
          effectType: 'cutin-red',
        },
      }),
    );
  }, EFFECT_VISIBLE_MS);

  console.log('当たり演出: カットイン（赤）');
};
