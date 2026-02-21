import { runLeverOnCutInEffect } from '../../../lever-on-cutin-effect.js';

// カットイン演出（blue）分岐の処理です。
export const runCutInBlueBranch = (detail) => {
  runLeverOnCutInEffect({
    detail,
    effectType: 'cutin-blue',
    color: 'blue',
    logMessage: '当たり演出: カットイン（青）',
  });
};
