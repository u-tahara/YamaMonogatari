import { runSignboardBranchEffect } from '../../../signboard-branch-effect.js';

// 看板演出（好機）分岐の処理です。
export const runMissSignboardChanceBranch = (detail) => {
  runSignboardBranchEffect({
    detail,
    effectType: 'signboard-chance',
    imageType: 'chance',
    logMessage: '外れ演出: 看板（好機）',
  });
};
