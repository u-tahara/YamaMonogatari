import { playReachCutinMovieEffect } from '../../../reach-cutin-effect.js';

const REACH_HIT_EFFECT_FINISHED_EVENT_NAME = 'slot:reach-hit-effect-finished';

// リーチ後カットイン演出（white）分岐の処理です。
export const runReachCutInWhiteBranch = (detail) => {
  playReachCutinMovieEffect({
    detail,
    eventName: REACH_HIT_EFFECT_FINISHED_EVENT_NAME,
    effectType: 'reach-cutin-white',
    color: 'white',
    logMessage: 'リーチ後当たり演出: カットイン（white）',
  });
};
