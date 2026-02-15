const slotNumbers = document.querySelectorAll('.js-slot-number');
const SPIN_INTERVAL_MS = 50;
const START_BUTTON_INDEX = 13;
const STOP_BUTTON_INDEXES = [6, 0, 1]; // 左, 真ん中, 右

const getRandomSlotNumber = () => Math.floor(Math.random() * 9) + 1;

let spinIntervalId = null;
let slotStopped = Array.from({ length: slotNumbers.length }, () => false);
let previousButtonPressed = {
  start: false,
  stop: STOP_BUTTON_INDEXES.map(() => false),
};

const spinSlotNumbers = () => {
  slotNumbers.forEach((slotNumber, index) => {
    if (slotStopped[index]) {
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
  spinSlotNumbers();
  spinIntervalId = setInterval(spinSlotNumbers, SPIN_INTERVAL_MS);
};

const stopSlotByButtonOrder = (buttonOrder) => {
  if (!spinIntervalId) {
    return;
  }

  if (buttonOrder >= slotStopped.length || slotStopped[buttonOrder]) {
    return;
  }

  slotStopped[buttonOrder] = true;

  const isAllSlotsStopped = slotStopped.every(Boolean);

  if (isAllSlotsStopped) {
    stopSpin();
  }
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
