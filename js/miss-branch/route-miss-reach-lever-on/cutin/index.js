import { runMissCutInWhiteBranch } from '../../route-miss-no-reach/cutin/white-branch.js';
import { runMissCutInBlueBranch } from '../../route-miss-no-reach/cutin/blue-branch.js';
import { runMissCutInGreenBranch } from '../../route-miss-no-reach/cutin/green-branch.js';
import { runMissCutInRedBranch } from '../../route-miss-no-reach/cutin/red-branch.js';
import { runMissCutInGoldBranch } from '../../route-miss-no-reach/cutin/gold-branch.js';
import { getProbabilityValue } from '../../../probability-summary.js';

const CUT_IN_WHITE_RATE = getProbabilityValue('routeMissReachLeverOnCutInWhite');
const CUT_IN_BLUE_RATE = getProbabilityValue('routeMissReachLeverOnCutInBlue');
const CUT_IN_GREEN_RATE = getProbabilityValue('routeMissReachLeverOnCutInGreen');
const CUT_IN_RED_RATE = getProbabilityValue('routeMissReachLeverOnCutInRed');

// 外れ時リーチ分岐のレバーオン向けカットイン演出内の分岐を行います。
export const routeMissReachLeverOnCutInBranch = (detail) => {
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
