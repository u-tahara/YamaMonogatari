// リーチ後演出なし演出の分岐先処理です。
export const runReachNoEffectBranch = (detail) => {
  window.dispatchEvent(new CustomEvent('slot:miss-effect-reach-none', { detail }));
  window.dispatchEvent(
    new CustomEvent('slot:reach-miss-effect-finished', {
      detail: {
        ...detail,
        effectType: 'none',
      },
    }),
  );
  console.log('リーチ後外れ演出: 演出なし');
};
