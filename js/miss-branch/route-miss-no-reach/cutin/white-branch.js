import { runLeverOnCutInEffect } from '../../../lever-on-cutin-effect.js';

// カットイン演出（white）分岐の処理です。
export const runMissCutInWhiteBranch = (detail) => {
  runLeverOnCutInEffect({
    detail,
    effectType: 'cutin-white',
    color: 'white',
    logMessage: '外れ演出: カットイン（白）',
  });
};
