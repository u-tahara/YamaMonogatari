import { dispatchHitEvent } from './hit-event.js';
import { dispatchMissEvent } from './miss-event.js';

const slotReels = document.querySelectorAll('.js-slot-reel');
const reachPopup = document.querySelector('.js-reach-popup');
const REEL_STEP_DURATION_MS = 60;
const REEL_REST_TRANSLATE_Y = 'translateY(calc((-1 * var(--reel-cell-height)) + var(--reel-peek-height)))';
const REEL_STEP_TRANSLATE_Y = 'translateY(calc((-2 * var(--reel-cell-height)) + var(--reel-peek-height)))';
const SPIN_INTERVAL_MS = 80;
const STOP_CYCLE_INTERVAL_MS = Math.max(0, SPIN_INTERVAL_MS - REEL_STEP_DURATION_MS);
const STOP_SLOW_CYCLE_INTERVAL_MS = 160;
const STOP_MIN_CYCLES = 4;
const REACH_POPUP_DELAY_MS = 300;
const REACH_POPUP_VISIBLE_MS = 1000;
const START_BUTTON_INDEX = 13;
const STOP_BUTTON_INDEXES = [6, 1, 0]; // 左, 真ん中, 右
const LEFT_SLOT_INDEX = 0;
const CENTER_SLOT_INDEX = 1;
const RIGHT_SLOT_INDEX = 2;
const SPIN_START_EVENT_NAME = 'slot:spin-start';
const REACH_POPUP_FINISHED_EVENT_NAME = 'slot:reach-popup-finished';
const REACH_HIT_EFFECT_FINISHED_EVENT_NAME = 'slot:reach-hit-effect-finished';
const LEVER_ON_EFFECT_FINISHED_EVENT_NAME = 'slot:lever-on-effect-finished';
const SLOT_COUNT = slotReels.length;
const SLOT_NUMBER_MIN = 1;
const SLOT_NUMBER_MAX = 9;
const PREMIUM_HIT_NUMBER = 7;
const PREMIUM_HIT_PROBABILITY = 0.1;

// 1〜9の範囲でランダムなスロット数字を返します。
const getRandomSlotNumber = () => Math.floor(Math.random() * 9) + 1;

// 当たり判定を行い、一定確率で true を返します。
const judgeSpinResult = () => Math.random() < 1 / 13.7;

// 配列内の数字がすべて同じかどうかを判定します。
const isAllSameNumber = (numbers) => numbers.every((number) => number === numbers[0]);

// 3リールすべて同じ数字になる当たり用の配列を生成します。
const createHitNumbers = () => {
  const hitNumber = (() => {
    if (Math.random() < PREMIUM_HIT_PROBABILITY) {
      return PREMIUM_HIT_NUMBER;
    }

    const nonPremiumNumbers = Array.from(
      { length: SLOT_NUMBER_MAX - SLOT_NUMBER_MIN + 1 },
      (_, index) => SLOT_NUMBER_MIN + index,
    ).filter((number) => number !== PREMIUM_HIT_NUMBER);

    return nonPremiumNumbers[Math.floor(Math.random() * nonPremiumNumbers.length)];
  })();

  return Array.from({ length: SLOT_COUNT }, () => hitNumber);
};

// 3リールのどこかが異なる外れ用の数字配列を生成します。
const createMissNumbers = () => {
  if (SLOT_COUNT === 0) {
    return [];
  }

  let missNumbers = Array.from({ length: SLOT_COUNT }, () => getRandomSlotNumber());

  while (isAllSameNumber(missNumbers)) {
    missNumbers = Array.from({ length: SLOT_COUNT }, () => getRandomSlotNumber());
  }

  return missNumbers;
};

let spinIntervalId = null;
let slotStopped = Array.from({ length: slotReels.length }, () => false);
let slotStopping = Array.from({ length: slotReels.length }, () => false);
let spinResultNumbers = [];
let currentSpinDetail = null;
let hasShownReachPopup = false;
let centerStopLocked = false;
let areReelsStopEnabled = true;
let reachPopupTimeoutId = null;
let reachPopupHideTimeoutId = null;
let currentDisplayedNumbers = Array.from({ length: slotReels.length }, () => getRandomSlotNumber());
let reelStepQueues = Array.from({ length: slotReels.length }, () => Promise.resolve());
let previousButtonPressed = {
  start: false,
  stop: STOP_BUTTON_INDEXES.map(() => false),
};

// 現在値の次の数字（9の次は1）を返します。
const getNextSlotNumber = (currentNumber) => {
  if (
    typeof currentNumber !== 'number' ||
    currentNumber < SLOT_NUMBER_MIN ||
    currentNumber > SLOT_NUMBER_MAX
  ) {
    return SLOT_NUMBER_MIN;
  }

  return currentNumber >= SLOT_NUMBER_MAX ? SLOT_NUMBER_MIN : currentNumber + 1;
};

// 現在値の前の数字（1の前は9）を返します。
const getPreviousSlotNumber = (currentNumber) => {
  if (
    typeof currentNumber !== 'number' ||
    currentNumber < SLOT_NUMBER_MIN ||
    currentNumber > SLOT_NUMBER_MAX
  ) {
    return SLOT_NUMBER_MAX;
  }

  return currentNumber <= SLOT_NUMBER_MIN ? SLOT_NUMBER_MAX : currentNumber - 1;
};

// 指定リールの表示セルを現在値・前後値で描画します。
const renderReel = (slotIndex) => {
  const reel = slotReels[slotIndex];

  if (!reel) {
    return;
  }

  const cells = reel.querySelectorAll('.js-slot-cell');
  const currentNumber = currentDisplayedNumbers[slotIndex];
  const previousNumber = getPreviousSlotNumber(currentNumber);
  const nextNumber = getNextSlotNumber(currentNumber);

  if (cells[0]) {
    cells[0].textContent = String(previousNumber);
  }

  if (cells[1]) {
    cells[1].textContent = String(currentNumber);
  }

  if (cells[2]) {
    cells[2].textContent = String(nextNumber);
  }

  reel.style.transition = 'none';
};

// リールを1ステップだけ回転させ、表示数字を進めます。
const stepReelOnce = (slotIndex) =>
  new Promise((resolve) => {
    const reel = slotReels[slotIndex];

    if (!reel) {
      resolve();
      return;
    }

    reel.style.transition = `transform ${REEL_STEP_DURATION_MS}ms linear`;

    window.setTimeout(() => {
      currentDisplayedNumbers[slotIndex] = getNextSlotNumber(currentDisplayedNumbers[slotIndex]);
      renderReel(slotIndex);
      resolve();
    }, REEL_STEP_DURATION_MS);
  });

// リールごとの処理キューに1ステップ回転を積みます。
const enqueueReelStep = (slotIndex) => {
  reelStepQueues[slotIndex] = reelStepQueues[slotIndex].then(() => stepReelOnce(slotIndex));
  return reelStepQueues[slotIndex];
};

// リーチポップアップ関連のタイマーをすべて解除します。
const clearReachPopupTimer = () => {
  if (reachPopupTimeoutId !== null) {
    window.clearTimeout(reachPopupTimeoutId);
    reachPopupTimeoutId = null;
  }

  if (reachPopupHideTimeoutId !== null) {
    window.clearTimeout(reachPopupHideTimeoutId);
    reachPopupHideTimeoutId = null;
  }
};

// リーチポップアップを非表示にします。
const hideReachPopup = () => {
  if (reachPopup) {
    reachPopup.hidden = true;
  }
};

// リーチポップアップ演出の完了イベントを通知します。
const dispatchReachPopupFinishedEvent = () => {
  if (!currentSpinDetail?.isHit) {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(REACH_POPUP_FINISHED_EVENT_NAME, {
      detail: currentSpinDetail,
    }),
  );
};

// 遅延付きでリーチポップアップを表示し、一定時間後に閉じます。
const showReachPopupWithDelay = () => {
  if (!reachPopup) {
    hasShownReachPopup = true;
    dispatchReachPopupFinishedEvent();
    return;
  }

  centerStopLocked = true;

  reachPopupTimeoutId = window.setTimeout(() => {
    reachPopup.hidden = false;
    reachPopupTimeoutId = null;

    reachPopupHideTimeoutId = window.setTimeout(() => {
      hideReachPopup();
      reachPopupHideTimeoutId = null;
      dispatchReachPopupFinishedEvent();
    }, REACH_POPUP_VISIBLE_MS);
  }, REACH_POPUP_DELAY_MS);

  hasShownReachPopup = true;
};

// 停止していないリールだけを1ステップずつ回転させます。
const spinSlotNumbers = () => {
  slotReels.forEach((_, index) => {
    if (slotStopped[index] || slotStopping[index]) {
      return;
    }

    enqueueReelStep(index);
  });
};

// スロット回転用のインターバルを停止します。
const stopSpin = () => {
  if (!spinIntervalId) {
    return;
  }

  clearInterval(spinIntervalId);
  spinIntervalId = null;
};

// 回転初期化・当たり外れ決定・イベント通知を行って回転を開始します。
const startSpin = () => {
  if (spinIntervalId || slotReels.length === 0) {
    return;
  }

  slotStopped = slotStopped.map(() => false);
  slotStopping = slotStopping.map(() => false);
  hasShownReachPopup = false;
  centerStopLocked = false;
  areReelsStopEnabled = false;
  clearReachPopupTimer();
  hideReachPopup();
  const isHit = judgeSpinResult();
  spinResultNumbers = isHit ? createHitNumbers() : createMissNumbers();

  const detail = {
    isHit,
    numbers: spinResultNumbers,
  };

  currentSpinDetail = detail;

  window.dispatchEvent(
    new CustomEvent(SPIN_START_EVENT_NAME, {
      detail,
    }),
  );

  if (isHit) {
    dispatchHitEvent(detail);

    if (spinResultNumbers[0] === PREMIUM_HIT_NUMBER) {
      areReelsStopEnabled = true;
    }
  } else {
    areReelsStopEnabled = true;
    dispatchMissEvent(detail);
  }

  spinSlotNumbers();
  spinIntervalId = setInterval(spinSlotNumbers, SPIN_INTERVAL_MS);
};

// 左右リールが停止かつ同じ数字で、リーチ状態かを判定します。
const isReachState = () => {
  const isLeftStopped = slotStopped[LEFT_SLOT_INDEX];
  const isRightStopped = slotStopped[RIGHT_SLOT_INDEX];

  if (!isLeftStopped || !isRightStopped) {
    return false;
  }

  const leftNumber = currentDisplayedNumbers[LEFT_SLOT_INDEX];
  const rightNumber = currentDisplayedNumbers[RIGHT_SLOT_INDEX];

  return leftNumber !== undefined && leftNumber === rightNumber;
};

// 指定リールの停止を確定し、必要ならリーチ表示や全停止判定を行います。
const completeSlotStop = (buttonOrder) => {
  slotStopping[buttonOrder] = false;
  slotStopped[buttonOrder] = true;

  const canShowReachPopup =
    !hasShownReachPopup &&
    buttonOrder !== CENTER_SLOT_INDEX &&
    !slotStopped[CENTER_SLOT_INDEX] &&
    isReachState();

  if (canShowReachPopup) {
    showReachPopupWithDelay();
  }

  const isAllSlotsStopped = slotStopped.every(Boolean);

  if (isAllSlotsStopped) {
    stopSpin();
  }
};

// 指定ミリ秒待機する Promise を返します。
const wait = (ms) => new Promise((resolve) => {
  window.setTimeout(resolve, ms);
});

// 指定リールを演出付きで目標数字まで回し、停止確定します。
const stopSlotWithCycle = async (buttonOrder, targetNumber) => {
  if (
    typeof targetNumber !== 'number' ||
    targetNumber < SLOT_NUMBER_MIN ||
    targetNumber > SLOT_NUMBER_MAX
  ) {
    completeSlotStop(buttonOrder);
    return;
  }

  let cycleCount = 0;
  let isSlowMode = false;
  const preTargetNumber = getPreviousSlotNumber(targetNumber);
  const slowModeStartNumber = getPreviousSlotNumber(preTargetNumber);

  while (slotStopping[buttonOrder]) {
    await enqueueReelStep(buttonOrder);
    cycleCount += 1;

    const currentNumber = currentDisplayedNumbers[buttonOrder];
    const shouldStartSlowMode =
      !isSlowMode &&
      cycleCount >= STOP_MIN_CYCLES &&
      currentNumber === slowModeStartNumber;

    if (shouldStartSlowMode) {
      isSlowMode = true;
    }

    const canStop = isSlowMode && currentNumber === targetNumber;

    if (canStop) {
      completeSlotStop(buttonOrder);
      return;
    }

    await wait(isSlowMode ? STOP_SLOW_CYCLE_INTERVAL_MS : STOP_CYCLE_INTERVAL_MS);
  }
};

// ボタン順に応じてリール停止処理を開始します。
const stopSlotByButtonOrder = (buttonOrder) => {
  if (!spinIntervalId) {
    return;
  }

  if (!areReelsStopEnabled) {
    return;
  }

  if (slotStopping.some(Boolean)) {
    return;
  }

  if (buttonOrder === CENTER_SLOT_INDEX && centerStopLocked) {
    return;
  }

  if (
    buttonOrder >= slotStopped.length ||
    slotStopped[buttonOrder] ||
    slotStopping[buttonOrder]
  ) {
    return;
  }

  if (spinResultNumbers[buttonOrder] !== undefined) {
    slotStopping[buttonOrder] = true;
    stopSlotWithCycle(buttonOrder, spinResultNumbers[buttonOrder]);
    return;
  }

  slotStopped[buttonOrder] = true;
};

// ゲームパッドのスタート入力が押下状態かを返します。
const isStartPressed = (gamepad) =>
  Boolean(
    gamepad?.buttons?.[START_BUTTON_INDEX]?.pressed ||
      (gamepad?.axes?.[1] ?? 0) > 0.5,
  );

// 指定ボタンが押下状態かを返します。
const isButtonPressed = (gamepad, buttonIndex) => Boolean(gamepad?.buttons?.[buttonIndex]?.pressed);

// ゲームパッド入力を監視し、開始・停止操作を処理し続けます。

window.addEventListener(REACH_HIT_EFFECT_FINISHED_EVENT_NAME, () => {
  centerStopLocked = false;
});

window.addEventListener(LEVER_ON_EFFECT_FINISHED_EVENT_NAME, () => {
  areReelsStopEnabled = true;
});
const watchControllerInput = () => {
  const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
  const activeGamepad = Array.from(gamepads).find(Boolean);

  if (activeGamepad) {
    const startPressed = isStartPressed(activeGamepad);

    if (startPressed && !previousButtonPressed.start && !spinIntervalId) {
      startSpin();
    }

    previousButtonPressed.start = startPressed;

    STOP_BUTTON_INDEXES.forEach((buttonIndex, slotIndex) => {
      const pressed = isButtonPressed(activeGamepad, buttonIndex);

      if (pressed && !previousButtonPressed.stop[slotIndex]) {
        stopSlotByButtonOrder(slotIndex);
      }

      previousButtonPressed.stop[slotIndex] = pressed;
    });
  } else {
    previousButtonPressed = {
      start: false,
      stop: STOP_BUTTON_INDEXES.map(() => false),
    };
  }

  requestAnimationFrame(watchControllerInput);
};

slotReels.forEach((_, index) => {
  renderReel(index);
});

watchControllerInput();
