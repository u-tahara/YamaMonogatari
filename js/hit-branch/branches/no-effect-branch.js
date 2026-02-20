// 演出なしの分岐先処理です。
export const runNoEffectBranch = (detail) => {
  window.dispatchEvent(new CustomEvent('slot:hit-effect-none', { detail }));
  console.log('当たり演出: 演出なし');
};
