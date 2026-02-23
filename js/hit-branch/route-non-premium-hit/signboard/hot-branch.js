import { runSignboardBranchEffect } from '../../../signboard-branch-effect.js';

// 看板演出（熱）分岐の処理です。
export const runSignboardHotBranch = (detail) => {
  runSignboardBranchEffect({
    detail,
    effectType: 'signboard-hot',
    imageType: 'hot',
    logMessage: '当たり演出: 看板（熱）',
  });
};
