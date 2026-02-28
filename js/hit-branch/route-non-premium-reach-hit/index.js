import { runReachCutInBranch } from './branches/reach-cutin-branch.js';
import { runReachCharacterGroupBranch } from './branches/reach-character-group-branch.js';
import { runReachSuzuBackgroundBranch } from './branches/reach-suzu-background-branch.js';
import { runReachNoEffectBranch } from './branches/reach-no-effect-branch.js';
import { getProbabilityValue } from '../../probability-summary.js';

const REACH_CUT_IN_RATE = getProbabilityValue('routeNonPremiumReachHitCutIn');
const REACH_CHARACTER_GROUP_RATE = getProbabilityValue('routeNonPremiumReachHitCharacterGroup');
const REACH_SUZU_BACKGROUND_RATE = getProbabilityValue('routeNonPremiumReachHitSuzuBackground');

// リーチポップアップ表示後の当たり演出分岐を行います。
export const routeNonPremiumReachHit = (detail) => {
  const randomValue = Math.random();

  if (randomValue < REACH_CUT_IN_RATE) {
    runReachCutInBranch(detail);
    return;
  }

  if (randomValue < REACH_CUT_IN_RATE + REACH_CHARACTER_GROUP_RATE) {
    runReachCharacterGroupBranch(detail);
    return;
  }

  if (
    randomValue <
    REACH_CUT_IN_RATE + REACH_CHARACTER_GROUP_RATE + REACH_SUZU_BACKGROUND_RATE
  ) {
    runReachSuzuBackgroundBranch(detail);
    return;
  }

  runReachNoEffectBranch(detail);
};
