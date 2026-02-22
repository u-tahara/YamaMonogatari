const LEVER_ON_EFFECT_FINISHED_EVENT_NAME = 'slot:lever-on-effect-finished';

// 演出なしの分岐先処理です。
export const runNoEffectBranch = (detail) => {
  const signboardImage = document.querySelector('.js-signboard-hit-effect');
  const cutinMovie = document.querySelector('.js-lever-on-cutin-movie-effect');

  if (signboardImage) {
    signboardImage.hidden = true;
  }

  if (cutinMovie) {
    cutinMovie.hidden = true;
  }

  window.dispatchEvent(
    new CustomEvent(LEVER_ON_EFFECT_FINISHED_EVENT_NAME, {
      detail: {
        ...detail,
        effectType: 'none',
      },
    }),
  );

  console.log('当たり演出: 演出なし');
};
