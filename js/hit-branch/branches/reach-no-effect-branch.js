// リーチ後演出なし演出の分岐先処理です。
export const runReachNoEffectBranch = (detail) => {
  window.dispatchEvent(new CustomEvent('slot:hit-effect-reach-none', { detail }));
  window.dispatchEvent(
    new CustomEvent('slot:reach-hit-effect-finished', {
      detail: {
        ...detail,
        effectType: 'none',
      },
    }),
  );
  console.log('リーチ後当たり演出: 演出なし');
};
