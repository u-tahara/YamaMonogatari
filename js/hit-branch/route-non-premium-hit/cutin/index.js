import { runCutInWhiteBranch } from './white-branch.js';
import { runCutInBlueBranch } from './blue-branch.js';
import { runCutInGreenBranch } from './green-branch.js';
import { runCutInRedBranch } from './red-branch.js';
import { runCutInGoldBranch } from './gold-branch.js';

const CUT_IN_WHITE_RATE = 0.05;
const CUT_IN_BLUE_RATE = 0.15;
const CUT_IN_GREEN_RATE = 0.4;
const CUT_IN_RED_RATE = 0.35;

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
