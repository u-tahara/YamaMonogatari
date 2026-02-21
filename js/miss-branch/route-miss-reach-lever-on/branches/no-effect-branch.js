import { runMissNoEffectBranch } from '../../route-miss-no-reach/branches/no-effect-branch.js';

// 外れ時リーチ分岐向け演出なしの分岐先処理です。
export const runMissReachLeverOnNoEffectBranch = (detail) => {
  runMissNoEffectBranch(detail);
};
