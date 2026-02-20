// 看板演出（好機）分岐の処理です。
export const runSignboardChanceBranch = (detail) => {
  window.dispatchEvent(
    new CustomEvent('slot:hit-effect-signboard', {
      detail: {
        ...detail,
        effectType: 'signboard-chance',
      },
    }),
  );
  console.log('当たり演出: 看板（好機）');
};
