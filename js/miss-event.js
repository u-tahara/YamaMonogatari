export const MISS_EVENT_NAME = 'slot:miss';

window.addEventListener(MISS_EVENT_NAME, () => {
  console.log('外れ');
});

export const dispatchMissEvent = (detail) => {
  window.dispatchEvent(new CustomEvent(MISS_EVENT_NAME, { detail }));
};
