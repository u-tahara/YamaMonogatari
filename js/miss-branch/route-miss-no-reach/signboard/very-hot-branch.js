import { runSignboardBranchEffect } from '../../../signboard-branch-effect.js';

// 看板演出（激熱）分岐の処理です。
export const runMissSignboardVeryHotBranch = (detail) => {
  runSignboardBranchEffect({
    detail,
    effectType: 'signboard-very-hot',
    imageType: 'veryhot',
    logMessage: '外れ演出: 看板（激熱）',
  });
};
