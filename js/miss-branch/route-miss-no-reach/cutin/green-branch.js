import { runLeverOnCutInEffect } from '../../../lever-on-cutin-effect.js';

// カットイン演出（green）分岐の処理です。
export const runMissCutInGreenBranch = (detail) => {
  runLeverOnCutInEffect({
    detail,
    effectType: 'cutin-green',
    color: 'green',
    logMessage: '外れ演出: カットイン（緑）',
  });
};
