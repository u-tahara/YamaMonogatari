const LEVER_ON_EFFECT_FINISHED_EVENT_NAME = 'slot:lever-on-effect-finished';
const EFFECT_VISIBLE_MS = 1000;

// カットイン演出（金）分岐の処理です。
export const runMissCutInGoldBranch = (detail) => {
  const signboardImage = document.querySelector('.js-signboard-hit-effect');
  const cutinImage = document.querySelector('.js-lever-on-cutin-hit-effect');

  if (signboardImage) {
    signboardImage.hidden = true;
  }

  if (!cutinImage) {
    window.dispatchEvent(
      new CustomEvent(LEVER_ON_EFFECT_FINISHED_EVENT_NAME, {
        detail: {
          ...detail,
          effectType: 'cutin-gold',
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
          effectType: 'cutin-gold',
        },
      }),
    );
  }, EFFECT_VISIBLE_MS);

  console.log('外れ演出: カットイン（金）');
};
