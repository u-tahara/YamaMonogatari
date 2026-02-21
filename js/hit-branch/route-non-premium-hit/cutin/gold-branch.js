import { runLeverOnCutInEffect } from '../../../lever-on-cutin-effect.js';

// カットイン演出（gold）分岐の処理です。
export const runCutInGoldBranch = (detail) => {
  runLeverOnCutInEffect({
    detail,
    effectType: 'cutin-gold',
    color: 'gold',
    logMessage: '当たり演出: カットイン（金）',
  });
};
