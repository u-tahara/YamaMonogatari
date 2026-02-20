import { routeNonPremiumHit } from './hit-branch/route-non-premium-hit.js';
import { routeNonPremiumReachHit } from './hit-branch/route-non-premium-reach-hit.js';

export const HIT_EVENT_NAME = 'slot:hit';
const REACH_POPUP_FINISHED_EVENT_NAME = 'slot:reach-popup-finished';
const PREMIUM_HIT_NUMBER = 7;

window.addEventListener(HIT_EVENT_NAME, (event) => {
  const hitNumber = event.detail?.numbers?.[0];

  console.log('当たり');

  if (hitNumber === PREMIUM_HIT_NUMBER) {
    return;
  }

  routeNonPremiumHit(event.detail);
});

window.addEventListener(REACH_POPUP_FINISHED_EVENT_NAME, (event) => {
  const hitNumber = event.detail?.numbers?.[0];

  if (!event.detail?.isHit || hitNumber === PREMIUM_HIT_NUMBER) {
    return;
  }

  routeNonPremiumReachHit(event.detail);
});

// 当たりイベントを発火し、必要な詳細情報を通知します。
export const dispatchHitEvent = (detail) => {
  window.dispatchEvent(new CustomEvent(HIT_EVENT_NAME, { detail }));
};
