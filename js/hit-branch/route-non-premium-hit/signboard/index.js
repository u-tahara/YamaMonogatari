import { runSignboardVeryHotBranch } from './very-hot-branch.js';
import { runSignboardHotBranch } from './hot-branch.js';
import { runSignboardSlightlyHotBranch } from './slightly-hot-branch.js';
import { runSignboardChanceBranch } from './chance-branch.js';
import { getProbabilityValue } from '../../../probability-summary.js';

const SIGNBOARD_VERY_HOT_RATE = getProbabilityValue('routeSignboardVeryHot');
const SIGNBOARD_HOT_RATE = getProbabilityValue('routeSignboardHot');
const SIGNBOARD_SLIGHTLY_HOT_RATE = getProbabilityValue('routeSignboardSlightlyHot');

// 看板演出内の分岐を行います。
export const routeSignboardBranch = (detail) => {
  const randomValue = Math.random();

  if (randomValue < SIGNBOARD_VERY_HOT_RATE) {
    runSignboardVeryHotBranch(detail);
    return;
  }

  if (randomValue < SIGNBOARD_VERY_HOT_RATE + SIGNBOARD_HOT_RATE) {
    runSignboardHotBranch(detail);
    return;
  }

  if (
    randomValue <
    SIGNBOARD_VERY_HOT_RATE + SIGNBOARD_HOT_RATE + SIGNBOARD_SLIGHTLY_HOT_RATE
  ) {
    runSignboardSlightlyHotBranch(detail);
    return;
  }

  runSignboardChanceBranch(detail);
};
