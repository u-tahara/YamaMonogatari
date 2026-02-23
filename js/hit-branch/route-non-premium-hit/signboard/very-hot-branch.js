import { runSignboardBranchEffect } from '../../../signboard-branch-effect.js';

// 看板演出（激熱）分岐の処理です。
export const runSignboardVeryHotBranch = (detail) => {
  runSignboardBranchEffect({
    detail,
    effectType: 'signboard-very-hot',
    imageType: 'veryhot',
    logMessage: '当たり演出: 看板（激熱）',
  });
};
