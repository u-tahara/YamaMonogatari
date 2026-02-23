import { playReachCutinMovieEffect } from '../../../reach-cutin-effect.js';

const REACH_HIT_EFFECT_FINISHED_EVENT_NAME = 'slot:reach-hit-effect-finished';

// リーチ後カットイン演出（blue）分岐の処理です。
export const runReachCutInBlueBranch = (detail) => {
  playReachCutinMovieEffect({
    detail,
    eventName: REACH_HIT_EFFECT_FINISHED_EVENT_NAME,
    effectType: 'reach-cutin-blue',
    color: 'blue',
    logMessage: 'リーチ後当たり演出: カットイン（blue）',
  });
};
