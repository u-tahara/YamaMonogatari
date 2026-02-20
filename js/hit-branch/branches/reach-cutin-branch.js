// リーチ後カットイン演出の分岐先処理です。
export const runReachCutInBranch = (detail) => {
  window.dispatchEvent(new CustomEvent('slot:hit-effect-reach-cutin', { detail }));
  window.dispatchEvent(
    new CustomEvent('slot:reach-hit-effect-finished', {
      detail: {
        ...detail,
        effectType: 'cutin',
      },
    }),
  );
  console.log('リーチ後当たり演出: カットイン');
};
