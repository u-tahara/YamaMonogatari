// カットイン演出（青）分岐の処理です。
export const runCutInBlueBranch = (detail) => {
  window.dispatchEvent(
    new CustomEvent('slot:hit-effect-cutin', {
      detail: {
        ...detail,
        effectType: 'cutin-blue',
      },
    }),
  );
  console.log('当たり演出: カットイン（青）');
};
