const LEVER_ON_EFFECT_FINISHED_EVENT_NAME = 'slot:lever-on-effect-finished';
const EFFECT_VISIBLE_MS = 1000;

// 看板演出（ちょい熱）分岐の処理です。
export const runMissSignboardSlightlyHotBranch = (detail) => {
  const signboardImage = document.querySelector('.js-signboard-hit-effect');
  const cutinMovie = document.querySelector('.js-lever-on-cutin-movie-effect');

  if (cutinMovie) {
    cutinMovie.hidden = true;
  }

  if (!signboardImage) {
    window.dispatchEvent(
      new CustomEvent(LEVER_ON_EFFECT_FINISHED_EVENT_NAME, {
        detail: {
          ...detail,
          effectType: 'signboard-slightly-hot',
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
          effectType: 'signboard-slightly-hot',
        },
      }),
    );
  }, EFFECT_VISIBLE_MS);

  console.log('外れ演出: 看板（ちょい熱）');
};
