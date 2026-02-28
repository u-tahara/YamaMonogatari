import { runMissSignboardVeryHotBranch } from '../../route-miss-no-reach/signboard/very-hot-branch.js';
import { runMissSignboardHotBranch } from '../../route-miss-no-reach/signboard/hot-branch.js';
import { runMissSignboardSlightlyHotBranch } from '../../route-miss-no-reach/signboard/slightly-hot-branch.js';
import { runMissSignboardChanceBranch } from '../../route-miss-no-reach/signboard/chance-branch.js';
import { getProbabilityValue } from '../../../probability-summary.js';

const SIGNBOARD_VERY_HOT_RATE = getProbabilityValue('routeMissReachLeverOnSignboardVeryHot');
const SIGNBOARD_HOT_RATE = getProbabilityValue('routeMissReachLeverOnSignboardHot');
const SIGNBOARD_SLIGHTLY_HOT_RATE = getProbabilityValue('routeMissReachLeverOnSignboardSlightlyHot');

// 外れ時リーチ分岐のレバーオン向け看板演出内の分岐を行います。
export const routeMissReachLeverOnSignboardBranch = (detail) => {
  const randomValue = Math.random();

  if (randomValue < SIGNBOARD_VERY_HOT_RATE) {
    runMissSignboardVeryHotBranch(detail);
    return;
  }

  if (randomValue < SIGNBOARD_VERY_HOT_RATE + SIGNBOARD_HOT_RATE) {
    runMissSignboardHotBranch(detail);
    return;
  }

  if (
    randomValue <
    SIGNBOARD_VERY_HOT_RATE + SIGNBOARD_HOT_RATE + SIGNBOARD_SLIGHTLY_HOT_RATE
  ) {
    runMissSignboardSlightlyHotBranch(detail);
    return;
  }

  runMissSignboardChanceBranch(detail);
};
