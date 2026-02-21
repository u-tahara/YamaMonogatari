import { routeMissSignboardBranch } from '../../route-miss-no-reach/signboard/index.js';

// 外れ時リーチ分岐向け看板演出の分岐先処理です。
export const runMissReachLeverOnSignboardBranch = (detail) => {
  routeMissSignboardBranch(detail);
};
