import { runSignboardBranchEffect } from '../../../signboard-branch-effect.js';

// 看板演出（熱）分岐の処理です。
export const runMissSignboardHotBranch = (detail) => {
  runSignboardBranchEffect({
    detail,
    effectType: 'signboard-hot',
    imageType: 'hot',
    logMessage: '外れ演出: 看板（熱）',
  });
};
