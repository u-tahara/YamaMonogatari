import { runLeverOnCutInEffect } from '../../../lever-on-cutin-effect.js';

// カットイン演出（gold）分岐の処理です。
export const runMissCutInGoldBranch = (detail) => {
  runLeverOnCutInEffect({
    detail,
    effectType: 'cutin-gold',
    color: 'gold',
    logMessage: '外れ演出: カットイン（金）',
  });
};
