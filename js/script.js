const slotNumbers = document.querySelectorAll('.js-slot-number');
const SPIN_INTERVAL_MS = 50;

const getRandomSlotNumber = () => Math.floor(Math.random() * 9) + 1;

const spinSlotNumbers = () => {
  slotNumbers.forEach((slotNumber) => {
    slotNumber.textContent = String(getRandomSlotNumber());
  });
};

let spinIntervalId = null;

const startSpin = () => {
  if (spinIntervalId || slotNumbers.length === 0) {
    return;
  }

  spinSlotNumbers();
  spinIntervalId = setInterval(spinSlotNumbers, SPIN_INTERVAL_MS);
};

const isControllerDownPressed = (gamepad) =>
  Boolean(gamepad?.buttons?.[13]?.pressed || (gamepad?.axes?.[1] ?? 0) > 0.5);

const watchControllerInput = () => {
  const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
  const activeGamepad = Array.from(gamepads).find(Boolean);

  if (activeGamepad && isControllerDownPressed(activeGamepad)) {
    startSpin();
  }

  requestAnimationFrame(watchControllerInput);
};

watchControllerInput();
