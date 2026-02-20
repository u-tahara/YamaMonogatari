// 看板演出（熱）分岐の処理です。
export const runSignboardHotBranch = (detail) => {
  window.dispatchEvent(
    new CustomEvent('slot:hit-effect-signboard', {
      detail: {
        ...detail,
        effectType: 'signboard-hot',
      },
    }),
  );
  console.log('当たり演出: 看板（熱）');
};
