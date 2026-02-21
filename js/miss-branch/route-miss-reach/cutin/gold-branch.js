const REACH_HIT_EFFECT_FINISHED_EVENT_NAME = 'slot:reach-miss-effect-finished';
const EFFECT_VISIBLE_MS = 1000;

// リーチ後カットイン演出（金）分岐の処理です。
export const runReachCutInGoldBranch = (detail) => {
  const cutinImage = document.querySelector('.js-reach-cutin-hit-effect');
  const signboardImage = document.querySelector('.js-signboard-hit-effect');
  const characterGroupVideo = document.querySelector('.js-reach-character-group-effect');

  if (signboardImage) {
    signboardImage.hidden = true;
  }

  if (characterGroupVideo) {
    characterGroupVideo.hidden = true;
  }

  if (!cutinImage) {
    window.dispatchEvent(
      new CustomEvent(REACH_HIT_EFFECT_FINISHED_EVENT_NAME, {
        detail: {
          ...detail,
          effectType: 'reach-cutin-gold',
        },
      }),
    );
    return;
  }

  // TODO: 後続対応用（金）
  cutinImage.src = './img/smoke-cutin/gold.png';
  cutinImage.hidden = false;

  window.setTimeout(() => {
    cutinImage.hidden = true;

    window.dispatchEvent(
      new CustomEvent(REACH_HIT_EFFECT_FINISHED_EVENT_NAME, {
        detail: {
          ...detail,
          effectType: 'reach-cutin-gold',
        },
      }),
    );
  }, EFFECT_VISIBLE_MS);

  console.log('リーチ後外れ演出: カットイン（金）');
};
