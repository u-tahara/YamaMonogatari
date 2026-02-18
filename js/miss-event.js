export const MISS_EVENT_NAME = 'slot:miss';

window.addEventListener(MISS_EVENT_NAME, () => {
  console.log('外れ');
});

// 外れイベントを発火し、必要な詳細情報を通知します。
export const dispatchMissEvent = (detail) => {
  window.dispatchEvent(new CustomEvent(MISS_EVENT_NAME, { detail }));
};
