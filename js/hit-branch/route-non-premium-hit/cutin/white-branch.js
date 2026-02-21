import { runLeverOnCutInEffect } from '../../../lever-on-cutin-effect.js';

// カットイン演出（white）分岐の処理です。
export const runCutInWhiteBranch = (detail) => {
  runLeverOnCutInEffect({
    detail,
    effectType: 'cutin-white',
    color: 'white',
    logMessage: '当たり演出: カットイン（白）',
  });
};
