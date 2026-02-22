import { runMissCutInWhiteBranch } from './white-branch.js';
import { runMissCutInBlueBranch } from './blue-branch.js';
import { runMissCutInGreenBranch } from './green-branch.js';
import { runMissCutInRedBranch } from './red-branch.js';
import { runMissCutInGoldBranch } from './gold-branch.js';

const CUT_IN_WHITE_RATE = 0.35;
const CUT_IN_BLUE_RATE = 1;
const CUT_IN_GREEN_RATE = 0.3;
const CUT_IN_RED_RATE = 0.04;

// カットイン演出内の分岐を行います。
export const routeMissCutInBranch = (detail) => {
  const randomValue = Math.random();

  if (randomValue < CUT_IN_WHITE_RATE) {
    runMissCutInWhiteBranch(detail);
    return;
  }

  if (randomValue < CUT_IN_WHITE_RATE + CUT_IN_BLUE_RATE) {
    runMissCutInBlueBranch(detail);
    return;
  }

  if (randomValue < CUT_IN_WHITE_RATE + CUT_IN_BLUE_RATE + CUT_IN_GREEN_RATE) {
    runMissCutInGreenBranch(detail);
    return;
  }

  if (
    randomValue <
    CUT_IN_WHITE_RATE + CUT_IN_BLUE_RATE + CUT_IN_GREEN_RATE + CUT_IN_RED_RATE
  ) {
    runMissCutInRedBranch(detail);
    return;
  }

  runMissCutInGoldBranch(detail);
};
