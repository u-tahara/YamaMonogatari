import { runMissSignboardBranch } from './branches/signboard-branch.js';
import { runMissCutInBranch } from './branches/cutin-branch.js';
import { runMissNoEffectBranch } from './branches/no-effect-branch.js';

const SIGNBOARD_RATE = 0.25;
const CUT_IN_RATE = 0.7;

// 外れ時（非リーチ）に演出分岐を行います。
export const routeMissNoReach = (detail) => {
  const randomValue = Math.random();

  if (randomValue < SIGNBOARD_RATE) {
    runMissSignboardBranch(detail);
    return;
  }

  if (randomValue < SIGNBOARD_RATE + CUT_IN_RATE) {
    runMissCutInBranch(detail);
    return;
  }

  runMissNoEffectBranch(detail);
};
