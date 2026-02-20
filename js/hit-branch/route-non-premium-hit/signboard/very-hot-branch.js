// 看板演出（激熱）分岐の処理です。
export const runSignboardVeryHotBranch = (detail) => {
  window.dispatchEvent(
    new CustomEvent('slot:hit-effect-signboard', {
      detail: {
        ...detail,
        effectType: 'signboard-very-hot',
      },
    }),
  );
  console.log('当たり演出: 看板（激熱）');
};
