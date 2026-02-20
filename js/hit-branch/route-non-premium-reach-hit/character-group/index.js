import { runReachCharacterGroupManyBranch } from './many-branch.js';
import { runReachCharacterGroupFewBranch } from './few-branch.js';
import { runReachCharacterGroupCommentBranch } from './comment-branch.js';

const CHARACTER_GROUP_MANY_RATE = 0.4;
const CHARACTER_GROUP_FEW_RATE = 0.2;

// リーチ後キャラ群演出内の分岐を行います。
export const routeReachCharacterGroupBranch = (detail) => {
  const randomValue = Math.random();

  if (randomValue < CHARACTER_GROUP_MANY_RATE) {
    runReachCharacterGroupManyBranch(detail);
    return;
  }

  if (randomValue < CHARACTER_GROUP_MANY_RATE + CHARACTER_GROUP_FEW_RATE) {
    runReachCharacterGroupFewBranch(detail);
    return;
  }

  runReachCharacterGroupCommentBranch(detail);
};
