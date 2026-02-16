import { dispatchHitEvent } from './hit-event.js';
import { dispatchMissEvent } from './miss-event.js';

const slotNumbers = document.querySelectorAll('.js-slot-number');
const reachPopup = document.querySelector('.js-reach-popup');
const SPIN_INTERVAL_MS = 50;
const STOP_CYCLE_INTERVAL_MS = 120;
const STOP_MIN_CYCLES = 6;
const REACH_POPUP_DELAY_MS = 300;
const REACH_POPUP_VISIBLE_MS = 1000;
const START_BUTTON_INDEX = 13;
const STOP_BUTTON_INDEXES = [6, 0, 1]; // 左, 真ん中, 右
const LEFT_SLOT_INDEX = 0;
const CENTER_SLOT_INDEX = 1;
const RIGHT_SLOT_INDEX = 2;
const SPIN_START_EVENT_NAME = 'slot:spin-start';
const SLOT_COUNT = slotNumbers.length;
const SLOT_NUMBER_MIN = 1;
const SLOT_NUMBER_MAX = 9;

const getRandomSlotNumber = () => Math.floor(Math.random() * 9) + 1;

const judgeSpinResult = () => Math.random() < 0.1;

const isAllSameNumber = (numbers) => numbers.every((number) => number === numbers[0]);

const createHitNumbers = () => {
  const hitNumber = getRandomSlotNumber();
  return Array.from({ length: SLOT_COUNT }, () => hitNumber);
};

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
let slotStopped = Array.from({ length: slotNumbers.length }, () => false);
let slotStopping = Array.from({ length: slotNumbers.length }, () => false);
let spinResultNumbers = [];
let hasShownReachPopup = false;
let centerStopLocked = false;
let reachPopupTimeoutId = null;
let reachPopupHideTimeoutId = null;
let previousButtonPressed = {
  start: false,
  stop: STOP_BUTTON_INDEXES.map(() => false),
};

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

const hideReachPopup = () => {
  if (reachPopup) {
    reachPopup.hidden = true;
  }
};

const showReachPopupWithDelay = () => {
  if (!reachPopup) {
    centerStopLocked = false;
    hasShownReachPopup = true;
    return;
  }

  centerStopLocked = true;

  reachPopupTimeoutId = window.setTimeout(() => {
    reachPopup.hidden = false;
    reachPopupTimeoutId = null;

    reachPopupHideTimeoutId = window.setTimeout(() => {
      hideReachPopup();
      centerStopLocked = false;
      reachPopupHideTimeoutId = null;
    }, REACH_POPUP_VISIBLE_MS);
  }, REACH_POPUP_DELAY_MS);

  hasShownReachPopup = true;
};

const spinSlotNumbers = () => {
  slotNumbers.forEach((slotNumber, index) => {
    if (slotStopped[index] || slotStopping[index]) {
      return;
    }

    slotNumber.textContent = String(getRandomSlotNumber());
  });
};

const stopSpin = () => {
  if (!spinIntervalId) {
    return;
  }

  clearInterval(spinIntervalId);
  spinIntervalId = null;
};

const startSpin = () => {
  if (spinIntervalId || slotNumbers.length === 0) {
    return;
  }

  slotStopped = slotStopped.map(() => false);
  slotStopping = slotStopping.map(() => false);
  hasShownReachPopup = false;
  centerStopLocked = false;
  clearReachPopupTimer();
  hideReachPopup();
  const isHit = judgeSpinResult();
  spinResultNumbers = isHit ? createHitNumbers() : createMissNumbers();

  const detail = {
    isHit,
    numbers: spinResultNumbers,
  };

  window.dispatchEvent(
    new CustomEvent(SPIN_START_EVENT_NAME, {
      detail,
    }),
  );

  if (isHit) {
    dispatchHitEvent(detail);
  } else {
    dispatchMissEvent(detail);
  }

  spinSlotNumbers();
  spinIntervalId = setInterval(spinSlotNumbers, SPIN_INTERVAL_MS);
};

const isReachState = () => {
  const isLeftStopped = slotStopped[LEFT_SLOT_INDEX];
  const isRightStopped = slotStopped[RIGHT_SLOT_INDEX];

  if (!isLeftStopped || !isRightStopped) {
    return false;
  }

  const leftNumber = slotNumbers[LEFT_SLOT_INDEX]?.textContent;
  const rightNumber = slotNumbers[RIGHT_SLOT_INDEX]?.textContent;

  return leftNumber !== undefined && leftNumber === rightNumber;
};

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

const stopSlotWithCycle = (buttonOrder, slotNumber, targetNumber) => {
  if (
    typeof targetNumber !== 'number' ||
    targetNumber < SLOT_NUMBER_MIN ||
    targetNumber > SLOT_NUMBER_MAX
  ) {
    slotNumber.textContent = String(targetNumber);
    completeSlotStop(buttonOrder);
    return;
  }

  const displayedNumber = Number(slotNumber.textContent);
  let currentNumber = Number.isNaN(displayedNumber)
    ? getRandomSlotNumber()
    : displayedNumber;
  let cycleCount = 0;

  const stopIntervalId = window.setInterval(() => {
    if (!slotStopping[buttonOrder]) {
      window.clearInterval(stopIntervalId);
      return;
    }

    currentNumber = getNextSlotNumber(currentNumber);
    cycleCount += 1;
    slotNumber.textContent = String(currentNumber);

    const canStop = cycleCount >= STOP_MIN_CYCLES && currentNumber === targetNumber;

    if (canStop) {
      window.clearInterval(stopIntervalId);
      completeSlotStop(buttonOrder);
    }
  }, STOP_CYCLE_INTERVAL_MS);
};

const stopSlotByButtonOrder = (buttonOrder) => {
  if (!spinIntervalId) {
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

  const slotNumber = slotNumbers[buttonOrder];

  if (slotNumber && spinResultNumbers[buttonOrder] !== undefined) {
    slotStopping[buttonOrder] = true;
    stopSlotWithCycle(buttonOrder, slotNumber, spinResultNumbers[buttonOrder]);
    return;
  }

  slotStopped[buttonOrder] = true;
};

const isStartPressed = (gamepad) =>
  Boolean(
    gamepad?.buttons?.[START_BUTTON_INDEX]?.pressed ||
      (gamepad?.axes?.[1] ?? 0) > 0.5,
  );

const isButtonPressed = (gamepad, buttonIndex) => Boolean(gamepad?.buttons?.[buttonIndex]?.pressed);

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

watchControllerInput();
