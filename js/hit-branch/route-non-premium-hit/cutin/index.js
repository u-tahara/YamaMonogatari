import { runCutInWhiteBranch } from './white-branch.js';
import { runCutInBlueBranch } from './blue-branch.js';
import { runCutInGreenBranch } from './green-branch.js';
import { runCutInRedBranch } from './red-branch.js';
import { runCutInGoldBranch } from './gold-branch.js';
import { getProbabilityValue } from '../../../probability-summary.js';

const CUT_IN_WHITE_RATE = getProbabilityValue('routeNonPremiumHitCutInWhite');
const CUT_IN_BLUE_RATE = getProbabilityValue('routeNonPremiumHitCutInBlue');
const CUT_IN_GREEN_RATE = getProbabilityValue('routeNonPremiumHitCutInGreen');
const CUT_IN_RED_RATE = getProbabilityValue('routeNonPremiumHitCutInRed');

// カットイン演出内の分岐を行います。
export const routeCutInBranch = (detail) => {
  const randomValue = Math.random();

  if (randomValue < CUT_IN_WHITE_RATE) {
    runCutInWhiteBranch(detail);
    return;
  }

  if (randomValue < CUT_IN_WHITE_RATE + CUT_IN_BLUE_RATE) {
    runCutInBlueBranch(detail);
    return;
  }

  if (randomValue < CUT_IN_WHITE_RATE + CUT_IN_BLUE_RATE + CUT_IN_GREEN_RATE) {
    runCutInGreenBranch(detail);
    return;
  }

  if (
    randomValue <
    CUT_IN_WHITE_RATE + CUT_IN_BLUE_RATE + CUT_IN_GREEN_RATE + CUT_IN_RED_RATE
  ) {
    runCutInRedBranch(detail);
    return;
  }

  runCutInGoldBranch(detail);
};
