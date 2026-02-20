// 看板演出の分岐先処理です。
export const runSignboardBranch = (detail) => {
  window.dispatchEvent(new CustomEvent('slot:hit-effect-signboard', { detail }));
  console.log('当たり演出: 看板');
};
