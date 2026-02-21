import { runMissReachLeverOnSignboardBranch } from './branches/signboard-branch.js';
import { runMissReachLeverOnCutInBranch } from './branches/cutin-branch.js';
import { runMissReachLeverOnNoEffectBranch } from './branches/no-effect-branch.js';

const SIGNBOARD_RATE = 0.25;
const CUT_IN_RATE = 0.7;

// 外れ時のリーチ分岐向けレバーオン演出を分岐します。
export const routeMissReachLeverOn = (detail) => {
  const randomValue = Math.random();

  if (randomValue < SIGNBOARD_RATE) {
    runMissReachLeverOnSignboardBranch(detail);
    return;
  }

  if (randomValue < SIGNBOARD_RATE + CUT_IN_RATE) {
    runMissReachLeverOnCutInBranch(detail);
    return;
  }

  runMissReachLeverOnNoEffectBranch(detail);
};
