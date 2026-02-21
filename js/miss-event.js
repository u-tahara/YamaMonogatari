export const MISS_EVENT_NAME = 'slot:miss';
const SLOT_NUMBER_MIN = 1;
const SLOT_NUMBER_MAX = 9;
const PREMIUM_HIT_NUMBER = 7;
const MISS_REACH_PROBABILITY = 0.3;

// 1〜9の範囲でランダムなスロット数字を返します。
const getRandomSlotNumber = () =>
  Math.floor(Math.random() * (SLOT_NUMBER_MAX - SLOT_NUMBER_MIN + 1)) + SLOT_NUMBER_MIN;

// 外れ時にリーチ演出を発生させるかどうかを確率で判定します。
const shouldShowMissReach = () => Math.random() < MISS_REACH_PROBABILITY;

// 外れ時のリーチ用（左右同数・中央のみ不一致）の数字配列を生成します。
const createMissReachNumbers = () => {
  const reachCandidates = Array.from(
    { length: SLOT_NUMBER_MAX - SLOT_NUMBER_MIN + 1 },
    (_, index) => SLOT_NUMBER_MIN + index,
  ).filter((number) => number !== PREMIUM_HIT_NUMBER);

  const reachNumber = reachCandidates[Math.floor(Math.random() * reachCandidates.length)];

  let centerNumber = getRandomSlotNumber();

  while (centerNumber === reachNumber) {
    centerNumber = getRandomSlotNumber();
  }

  return [reachNumber, centerNumber, reachNumber];
};

// 外れ時の非リーチ用（左右不一致）の数字配列を生成します。
const createMissNoReachNumbers = () => {
  let leftNumber = getRandomSlotNumber();
  let rightNumber = getRandomSlotNumber();

  while (leftNumber === rightNumber) {
    rightNumber = getRandomSlotNumber();
  }

  return [leftNumber, getRandomSlotNumber(), rightNumber];
};

// 配列内の数字がすべて同じかどうかを判定します。
const isAllSameNumber = (numbers) => numbers.every((number) => number === numbers[0]);

// 外れ時の数字配列を生成します。
export const createMissNumbers = (slotCount) => {
  if (slotCount <= 0) {
    return [];
  }

  if (slotCount === 3) {
    return shouldShowMissReach() ? createMissReachNumbers() : createMissNoReachNumbers();
  }

  let missNumbers = Array.from({ length: slotCount }, () => getRandomSlotNumber());

  while (isAllSameNumber(missNumbers)) {
    missNumbers = Array.from({ length: slotCount }, () => getRandomSlotNumber());
  }

  return missNumbers;
};

window.addEventListener(MISS_EVENT_NAME, () => {
  console.log('外れ');
});

// 外れイベントを発火し、必要な詳細情報を通知します。
export const dispatchMissEvent = (detail) => {
  window.dispatchEvent(new CustomEvent(MISS_EVENT_NAME, { detail }));
};
