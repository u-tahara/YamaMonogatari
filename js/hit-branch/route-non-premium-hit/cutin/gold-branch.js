// カットイン演出（金）分岐の処理です。
export const runCutInGoldBranch = (detail) => {
  window.dispatchEvent(
    new CustomEvent('slot:hit-effect-cutin', {
      detail: {
        ...detail,
        effectType: 'cutin-gold',
      },
    }),
  );
  console.log('当たり演出: カットイン（金）');
};
