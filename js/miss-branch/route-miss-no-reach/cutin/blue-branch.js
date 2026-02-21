import { runLeverOnCutInEffect } from '../../../lever-on-cutin-effect.js';

// カットイン演出（blue）分岐の処理です。
export const runMissCutInBlueBranch = (detail) => {
  runLeverOnCutInEffect({
    detail,
    effectType: 'cutin-blue',
    color: 'blue',
    logMessage: '外れ演出: カットイン（青）',
  });
};
