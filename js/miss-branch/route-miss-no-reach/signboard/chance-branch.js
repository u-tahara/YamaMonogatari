const LEVER_ON_EFFECT_FINISHED_EVENT_NAME = 'slot:lever-on-effect-finished';
const EFFECT_VISIBLE_MS = 1000;

// 看板演出（好機）分岐の処理です。
export const runMissSignboardChanceBranch = (detail) => {
  const signboardImage = document.querySelector('.js-signboard-hit-effect');
  const cutinImage = document.querySelector('.js-lever-on-cutin-hit-effect');

  if (cutinImage) {
    cutinImage.hidden = true;
  }

  if (!signboardImage) {
    window.dispatchEvent(
      new CustomEvent(LEVER_ON_EFFECT_FINISHED_EVENT_NAME, {
        detail: {
          ...detail,
          effectType: 'signboard-chance',
        },
      }),
    );
    return;
  }

  signboardImage.hidden = false;

  window.setTimeout(() => {
    signboardImage.hidden = true;
    window.dispatchEvent(
      new CustomEvent(LEVER_ON_EFFECT_FINISHED_EVENT_NAME, {
        detail: {
          ...detail,
          effectType: 'signboard-chance',
        },
      }),
    );
  }, EFFECT_VISIBLE_MS);

  console.log('外れ演出: 看板（好機）');
};
