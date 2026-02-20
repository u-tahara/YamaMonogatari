// カットイン演出の分岐先処理です。
export const runCutInBranch = (detail) => {
  window.dispatchEvent(new CustomEvent('slot:hit-effect-cutin', { detail }));
  console.log('当たり演出: カットイン');
};
