import { playReachCutinMovieEffect } from '../../../reach-cutin-effect.js';

const REACH_HIT_EFFECT_FINISHED_EVENT_NAME = 'slot:reach-miss-effect-finished';

// リーチ後カットイン演出（green）分岐の処理です。
export const runReachCutInGreenBranch = (detail) => {
  playReachCutinMovieEffect({
    detail,
    eventName: REACH_HIT_EFFECT_FINISHED_EVENT_NAME,
    effectType: 'reach-cutin-green',
    color: 'green',
    logMessage: 'リーチ後外れ演出: カットイン（green）',
  });
};
