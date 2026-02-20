// 看板演出（ちょい熱）分岐の処理です。
export const runSignboardSlightlyHotBranch = (detail) => {
  window.dispatchEvent(
    new CustomEvent('slot:hit-effect-signboard', {
      detail: {
        ...detail,
        effectType: 'signboard-slightly-hot',
      },
    }),
  );
  console.log('当たり演出: 看板（ちょい熱）');
};
