import { runSignboardBranch } from './branches/signboard-branch.js';
import { runCutInBranch } from './branches/cutin-branch.js';
import { runNoEffectBranch } from './branches/no-effect-branch.js';

const SIGNBOARD_RATE = 0.25;
const CUT_IN_RATE = 0.7;

// 7以外の当たり時に演出分岐を行います。
export const routeNonPremiumHit = (detail) => {
  const randomValue = Math.random();

  if (randomValue < SIGNBOARD_RATE) {
    runSignboardBranch(detail);
    return;
  }

  if (randomValue < SIGNBOARD_RATE + CUT_IN_RATE) {
    runCutInBranch(detail);
    return;
  }

  runNoEffectBranch(detail);
};
