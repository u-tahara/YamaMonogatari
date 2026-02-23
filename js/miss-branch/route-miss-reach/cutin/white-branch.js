import { playReachCutinMovieEffect } from '../../../reach-cutin-effect.js';

const REACH_HIT_EFFECT_FINISHED_EVENT_NAME = 'slot:reach-miss-effect-finished';

// リーチ後カットイン演出（white）分岐の処理です。
export const runReachCutInWhiteBranch = (detail) => {
  playReachCutinMovieEffect({
    detail,
    eventName: REACH_HIT_EFFECT_FINISHED_EVENT_NAME,
    effectType: 'reach-cutin-white',
    color: 'white',
    logMessage: 'リーチ後外れ演出: カットイン（white）',
  });
};
