import { runLeverOnCutInEffect } from '../../../lever-on-cutin-effect.js';

// カットイン演出（red）分岐の処理です。
export const runCutInRedBranch = (detail) => {
  runLeverOnCutInEffect({
    detail,
    effectType: 'cutin-red',
    color: 'red',
    logMessage: '当たり演出: カットイン（赤）',
  });
};
