export const HIT_EVENT_NAME = 'slot:hit';

window.addEventListener(HIT_EVENT_NAME, () => {
  console.log('当たり');
});

// 当たりイベントを発火し、必要な詳細情報を通知します。
export const dispatchHitEvent = (detail) => {
  window.dispatchEvent(new CustomEvent(HIT_EVENT_NAME, { detail }));
};
