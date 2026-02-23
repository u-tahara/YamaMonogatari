import { runSignboardBranchEffect } from '../../../signboard-branch-effect.js';

// 看板演出（ちょい熱）分岐の処理です。
export const runSignboardSlightlyHotBranch = (detail) => {
  runSignboardBranchEffect({
    detail,
    effectType: 'signboard-slightly-hot',
    imageType: 'slightly',
    logMessage: '当たり演出: 看板（ちょい熱）',
  });
};
