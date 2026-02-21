import { runReachCutInWhiteBranch } from './white-branch.js';
import { runReachCutInBlueBranch } from './blue-branch.js';
import { runReachCutInGreenBranch } from './green-branch.js';
import { runReachCutInRedBranch } from './red-branch.js';
import { runReachCutInGoldBranch } from './gold-branch.js';

const CUT_IN_WHITE_RATE = 0.45;
const CUT_IN_BLUE_RATE = 0.25;
const CUT_IN_GREEN_RATE = 0.25;
const CUT_IN_RED_RATE = 0.04;

// リーチ後カットイン演出内の分岐を行います。
export const routeReachCutInBranch = (detail) => {
  const randomValue = Math.random();

  if (randomValue < CUT_IN_WHITE_RATE) {
    runReachCutInWhiteBranch(detail);
    return;
  }

  if (randomValue < CUT_IN_WHITE_RATE + CUT_IN_BLUE_RATE) {
    runReachCutInBlueBranch(detail);
    return;
  }

  if (randomValue < CUT_IN_WHITE_RATE + CUT_IN_BLUE_RATE + CUT_IN_GREEN_RATE) {
    runReachCutInGreenBranch(detail);
    return;
  }

  if (randomValue < CUT_IN_WHITE_RATE + CUT_IN_BLUE_RATE + CUT_IN_GREEN_RATE + CUT_IN_RED_RATE) {
    runReachCutInRedBranch(detail);
    return;
  }

  runReachCutInGoldBranch(detail);
};
