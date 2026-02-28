import { runMissSignboardVeryHotBranch } from './very-hot-branch.js';
import { runMissSignboardHotBranch } from './hot-branch.js';
import { runMissSignboardSlightlyHotBranch } from './slightly-hot-branch.js';
import { runMissSignboardChanceBranch } from './chance-branch.js';
import { getProbabilityValue } from '../../../probability-summary.js';

const SIGNBOARD_VERY_HOT_RATE = getProbabilityValue('routeMissSignboardVeryHot');
const SIGNBOARD_HOT_RATE = getProbabilityValue('routeMissSignboardHot');
const SIGNBOARD_SLIGHTLY_HOT_RATE = getProbabilityValue('routeMissSignboardSlightlyHot');

// 看板演出内の分岐を行います。
export const routeMissSignboardBranch = (detail) => {
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
