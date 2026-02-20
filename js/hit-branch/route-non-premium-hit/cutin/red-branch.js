// カットイン演出（赤）分岐の処理です。
export const runCutInRedBranch = (detail) => {
  window.dispatchEvent(
    new CustomEvent('slot:hit-effect-cutin', {
      detail: {
        ...detail,
        effectType: 'cutin-red',
      },
    }),
  );
  console.log('当たり演出: カットイン（赤）');
};
