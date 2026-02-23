import { runSignboardBranchEffect } from '../../../signboard-branch-effect.js';

// 看板演出（ちょい熱）分岐の処理です。
export const runMissSignboardSlightlyHotBranch = (detail) => {
  runSignboardBranchEffect({
    detail,
    effectType: 'signboard-slightly-hot',
    imageType: 'slightly',
    logMessage: '外れ演出: 看板（ちょい熱）',
  });
};
