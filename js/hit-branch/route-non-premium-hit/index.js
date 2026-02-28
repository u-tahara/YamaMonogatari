import { runSignboardBranch } from './branches/signboard-branch.js';
import { runCutInBranch } from './branches/cutin-branch.js';
import { runNoEffectBranch } from './branches/no-effect-branch.js';
import { getProbabilityValue } from '../../probability-summary.js';

const SIGNBOARD_RATE = getProbabilityValue('routeNonPremiumHitSignboard');
const CUT_IN_RATE = getProbabilityValue('routeNonPremiumHitCutIn');

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
