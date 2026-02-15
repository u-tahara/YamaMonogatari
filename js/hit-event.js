export const HIT_EVENT_NAME = 'slot:hit';

window.addEventListener(HIT_EVENT_NAME, () => {
  console.log('当たり');
});

export const dispatchHitEvent = (detail) => {
  window.dispatchEvent(new CustomEvent(HIT_EVENT_NAME, { detail }));
};
