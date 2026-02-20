// カットイン演出（緑）分岐の処理です。
export const runCutInGreenBranch = (detail) => {
  window.dispatchEvent(
    new CustomEvent('slot:hit-effect-cutin', {
      detail: {
        ...detail,
        effectType: 'cutin-green',
      },
    }),
  );
  console.log('当たり演出: カットイン（緑）');
};
