import { runLeverOnCutInEffect } from '../../../lever-on-cutin-effect.js';

// カットイン演出（red）分岐の処理です。
export const runMissCutInRedBranch = (detail) => {
  runLeverOnCutInEffect({
    detail,
    effectType: 'cutin-red',
    color: 'red',
    logMessage: '外れ演出: カットイン（赤）',
  });
};
