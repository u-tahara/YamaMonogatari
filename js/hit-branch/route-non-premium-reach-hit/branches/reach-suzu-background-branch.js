// リーチ後スズ背景演出の分岐先処理です。
export const runReachSuzuBackgroundBranch = (detail) => {
  window.dispatchEvent(new CustomEvent('slot:hit-effect-reach-suzu-background', { detail }));
  window.dispatchEvent(
    new CustomEvent('slot:reach-hit-effect-finished', {
      detail: {
        ...detail,
        effectType: 'suzu-background',
      },
    }),
  );
  console.log('リーチ後当たり演出: スズ背景');
};
