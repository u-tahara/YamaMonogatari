// カットイン演出（白）分岐の処理です。
export const runCutInWhiteBranch = (detail) => {
  window.dispatchEvent(
    new CustomEvent('slot:hit-effect-cutin', {
      detail: {
        ...detail,
        effectType: 'cutin-white',
      },
    }),
  );
  console.log('当たり演出: カットイン（白）');
};
