import { runReachCutInBranch } from './branches/reach-cutin-branch.js';
import { runReachCharacterGroupBranch } from './branches/reach-character-group-branch.js';
import { runReachNoEffectBranch } from './branches/reach-no-effect-branch.js';

const REACH_CUT_IN_RATE = 0.2;
const REACH_CHARACTER_GROUP_RATE = 0.2;

// リーチポップアップ表示後の外れ演出分岐を行います。
export const routeMissReach = (detail) => {
  const randomValue = Math.random();

  if (randomValue < REACH_CUT_IN_RATE) {
    runReachCutInBranch(detail);
    return;
  }

  if (randomValue < REACH_CUT_IN_RATE + REACH_CHARACTER_GROUP_RATE) {
    runReachCharacterGroupBranch(detail);
    return;
  }

  runReachNoEffectBranch(detail);
};
