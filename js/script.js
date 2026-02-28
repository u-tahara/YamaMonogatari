import { dispatchHitEvent } from './hit-event.js';
import { createMissNumbers, dispatchMissEvent } from './miss-event.js';
import './audio-controller.js';
import { createReachHitMovieSequenceController } from './hit-branch/reach-hit-movie-sequence.js';
import { createPremiumHitMovieController } from './hit-branch/route-premium-hit/index.js';
import { setReachCutinMovieVolume } from './reach-cutin-effect.js';
import { getProbabilityValue } from './probability-summary.js';
import { getTimeValue } from './time-summary.js';
import {
  ONEMORE_BONUS_TRIGGERED_EVENT_NAME,
  ONEMORE_EFFECT_FINISHED_EVENT_NAME,
  resetOnemoreEffect,
  showOnemoreEffect,
} from './hit-branch/route-non-premium-hit/onemore-effect.js';

const slotReels = document.querySelectorAll('.js-slot-reel');
const reachPopup = document.querySelector('.js-reach-popup');
const hitPopup = document.querySelector('.js-hit-popup');
const reachChangeMovie = document.querySelector('.js-reach-change-movie');
const pushButtonMovie = document.querySelector('.js-push-button-movie');
const premiumBlackoutMovie = document.querySelector('.js-premium-blackout-movie');
const premiumChangeMovie = document.querySelector('.js-premium-change-movie');
const mainTitle = document.querySelector('.js-main-title');
const REEL_STEP_DURATION_MS = getTimeValue('reelStepDurationMs');
const SPIN_INTERVAL_MS = getTimeValue('spinIntervalMs');
const STOP_CYCLE_INTERVAL_MS = Math.max(0, SPIN_INTERVAL_MS - REEL_STEP_DURATION_MS);
const STOP_SLOW_CYCLE_INTERVAL_MS = getTimeValue('stopSlowCycleIntervalMs');
const STOP_MIN_CYCLES = 4;
const REACH_POPUP_DELAY_MS = getTimeValue('reachPopupDelayMs');
const REACH_POPUP_VISIBLE_MS = getTimeValue('reachPopupVisibleMs');
const HIT_POPUP_VISIBLE_MS = getTimeValue('hitPopupVisibleMs');
const NON_PREMIUM_HIT_Z_SPIN_DURATION_MS = getTimeValue('nonPremiumHitZSpinDurationMs');
const NON_PREMIUM_HIT_Z_SPIN_DELAY_MS = getTimeValue('nonPremiumHitZSpinDelayMs');
const START_BUTTON_INDEX = 13;
const ADVANCE_EFFECT_BUTTON_INDEX = 7;
const STOP_BUTTON_INDEXES = [6, 0, 1]; // 左, 真ん中, 右
const STOP_ARROW_KEYS = ['ArrowLeft', 'ArrowDown', 'ArrowRight']; // 左, 真ん中, 右
const START_SPIN_KEYS = [' ', 'Spacebar'];
const LEFT_SLOT_INDEX = 0;
const CENTER_SLOT_INDEX = 1;
const RIGHT_SLOT_INDEX = 2;
const FIXED_STOP_SEQUENCE = [LEFT_SLOT_INDEX, RIGHT_SLOT_INDEX, CENTER_SLOT_INDEX]; // 左 → 右 → 真ん中
const SPIN_START_EVENT_NAME = 'slot:spin-start';
const REACH_POPUP_FINISHED_EVENT_NAME = 'slot:reach-popup-finished';
const REACH_POPUP_AUDIO_EVENT_NAME = 'slot:reach-popup-shown';
const REACH_HIT_EFFECT_FINISHED_EVENT_NAME = 'slot:reach-hit-effect-finished';
const REACH_MISS_EFFECT_FINISHED_EVENT_NAME = 'slot:reach-miss-effect-finished';
const LEVER_ON_EFFECT_FINISHED_EVENT_NAME = 'slot:lever-on-effect-finished';
const LEVER_ON_AUDIO_EVENT_NAME = 'slot:lever-on';
const STOP_BUTTON_AUDIO_EVENT_NAME = 'slot:stop-button-pressed';
const REEL_STOP_AUDIO_EVENT_NAME = 'slot:reel-stop-confirmed';
const SLOT_COUNT = slotReels.length;
const SLOT_NUMBER_MIN = 1;
const SLOT_NUMBER_MAX = 9;
const SLOT_NUMBER_IMAGE_NAMES = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
};
const PREMIUM_HIT_NUMBER = 7;
const PREMIUM_HIT_PROBABILITY = getProbabilityValue('createHitNumbersPremium');
const PREMIUM_FADE_OUT_COMPLETED_WAIT_MS = getTimeValue('premiumFadeOutCompletedWaitMs');
const PREMIUM_BOUNCE_TO_REDIRECT_MS = getTimeValue('premiumBounceToRedirectMs');
const PREMIUM_REDIRECT_PATH = './YamaExtra.html';
const MAIN_TITLE_SHAKE_CLASS_NAME = 'js-main-title-shaking';
const MAIN_TITLE_SHAKE_DURATION_MS = getTimeValue('mainTitleShakeDurationMs');
const REACH_MISS_CUTIN_BLUE_UNCHANGE_RATE = getProbabilityValue('reachMissUnchangeBlue');
const REACH_MISS_CUTIN_GREEN_UNCHANGE_RATE = getProbabilityValue('reachMissUnchangeGreen');
const REACH_MISS_CUTIN_RED_UNCHANGE_RATE = getProbabilityValue('reachMissUnchangeRed');
const REACH_MISS_CUTIN_GOLD_UNCHANGE_RATE = getProbabilityValue('reachMissUnchangeGold');
const REACH_MISS_CHARACTER_GROUP_MANY_UNCHANGE_RATE = getProbabilityValue('reachMissUnchangeCharacterGroupMany');
const REACH_MISS_CHARACTER_GROUP_FEW_UNCHANGE_RATE = getProbabilityValue('reachMissUnchangeCharacterGroupFew');
const REACH_MISS_CHARACTER_GROUP_COMMENT_UNCHANGE_RATE = getProbabilityValue('reachMissUnchangeCharacterGroupComment');

const SIGNBOARD_INITIAL_COUNT = 25;
const FINISHED_PAGE_PATH = './finished.html';
const signboardNumber = document.querySelector('.js-signboard-number');
let remainingSpinCount = SIGNBOARD_INITIAL_COUNT;

const updateSignboardNumber = () => {
  if (!signboardNumber) {
    return;
  }

  signboardNumber.textContent = String(remainingSpinCount);
};

const decrementSpinCountAfterFinish = () => {
  remainingSpinCount = Math.max(0, remainingSpinCount - 1);
  updateSignboardNumber();

  if (remainingSpinCount === 0) {
    window.location.href = FINISHED_PAGE_PATH;
  }
};
// 1〜9の範囲でランダムなスロット数字を返します。
const getRandomSlotNumber = () => Math.floor(Math.random() * 9) + 1;

// 当たり判定を行い、一定確率で true を返します。
const judgeSpinResult = () => Math.random() < getProbabilityValue('judgeSpinResult');

// 3リールすべて同じ数字になる当たり用の配列を生成します。

const isPremiumHitNumbers = (numbers) =>
  Array.isArray(numbers) &&
  numbers.length === SLOT_COUNT &&
  numbers.every((number) => number === PREMIUM_HIT_NUMBER);

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
let hitPopupHideTimeoutId = null;
let currentDisplayedNumbers = Array.from({ length: slotReels.length }, () => getRandomSlotNumber());
let reelStepQueues = Array.from({ length: slotReels.length }, () => Promise.resolve());
let reelStepToken = 0;
let previousButtonPressed = {
  start: false,
  advance: false,
  stop: STOP_BUTTON_INDEXES.map(() => false),
};
let previousArrowKeyPressed = STOP_ARROW_KEYS.map(() => false);
let previousStartKeyPressed = false;
let premiumRedirectTimeoutId = null;
let mainTitleShakeTimeoutId = null;
let shouldForcePremiumHitOnNextSpin = false;
let isSpinStartLocked = false;

const unlockSpinStart = () => {
  isSpinStartLocked = false;
};

const lockSpinStartUntilOnemoreEffectFinished = () => {
  isSpinStartLocked = true;
};

const lockSpinStartUntilMainTitleShakeFinished = () => {
  isSpinStartLocked = true;

  window.setTimeout(() => {
    unlockSpinStart();
  }, MAIN_TITLE_SHAKE_DURATION_MS);
};

const reachHitMovieSequenceController = createReachHitMovieSequenceController({
  reachChangeMovie,
  pushButtonMovie,
});

window.setReachCutinMovieVolume = setReachCutinMovieVolume;
setReachCutinMovieVolume(0.5);

const premiumHitMovieController = createPremiumHitMovieController({
  blackoutMovie: premiumBlackoutMovie,
  changeMovie: premiumChangeMovie,
  onChangeStarted: () => {
    if (typeof window.stopBgm === 'function') {
      window.stopBgm();
    }

    completePremiumHit();
  },
  onFadeOutCompleted: () => {
    startPremiumPostFadeOutSequence();
  },
});

const REACH_CHANGE_MOVIE_SRC = './movie/change.webm';
const REACH_MISS_UNCHANGE_MOVIE_SRC = './movie/unchange.webm';

const setReachChangeMovieSourceBySpinResult = (isHit) => {
  if (!reachChangeMovie) {
    return;
  }

  const nextMovieSource = isHit ? REACH_CHANGE_MOVIE_SRC : REACH_MISS_UNCHANGE_MOVIE_SRC;

  if (reachChangeMovie.getAttribute('src') === nextMovieSource) {
    return;
  }

  reachChangeMovie.setAttribute('src', nextMovieSource);
  reachChangeMovie.load();
};


const clearPremiumRedirectTimer = () => {
  if (premiumRedirectTimeoutId === null) {
    return;
  }

  window.clearTimeout(premiumRedirectTimeoutId);
  premiumRedirectTimeoutId = null;
};

const startMainTitleShake = () => {
  if (!mainTitle) {
    return;
  }

  if (mainTitleShakeTimeoutId !== null) {
    window.clearTimeout(mainTitleShakeTimeoutId);
    mainTitleShakeTimeoutId = null;
  }

  mainTitle.classList.remove(MAIN_TITLE_SHAKE_CLASS_NAME);
  void mainTitle.offsetWidth;
  mainTitle.classList.add(MAIN_TITLE_SHAKE_CLASS_NAME);

  mainTitleShakeTimeoutId = window.setTimeout(() => {
    mainTitle.classList.remove(MAIN_TITLE_SHAKE_CLASS_NAME);
    mainTitleShakeTimeoutId = null;
  }, MAIN_TITLE_SHAKE_DURATION_MS);
};

const triggerOnemoreBonus = () => {
  shouldForcePremiumHitOnNextSpin = true;
  startMainTitleShake();
  lockSpinStartUntilMainTitleShakeFinished();
};

const unlockSpinStartWhenOnemoreBonusCompleted = () => {
  if (shouldForcePremiumHitOnNextSpin) {
    return;
  }

  unlockSpinStart();
};

window.addEventListener(ONEMORE_BONUS_TRIGGERED_EVENT_NAME, triggerOnemoreBonus);
window.addEventListener(
  ONEMORE_EFFECT_FINISHED_EVENT_NAME,
  unlockSpinStartWhenOnemoreBonusCompleted,
);

const startSevenBounce = () => {
  const reels = document.querySelectorAll('.js-slot-reel');

  if (reels.length === 0) {
    return;
  }

  reels.forEach((reel) => {
    const currentCell = reel.querySelector('.js-slot-current-cell');

    if (!currentCell) {
      return;
    }

    reel.classList.remove('js-seven-bounce-target');
    currentCell.classList.remove('js-seven-bounce');

    void currentCell.offsetWidth;

    reel.classList.add('js-seven-bounce-target');
    currentCell.classList.add('js-seven-bounce');
  });
};

const startPremiumPostFadeOutSequence = () => {
  window.setTimeout(() => {
    if (typeof window.playCheersAudio === 'function') {
      window.playCheersAudio();
    }

    startSevenBounce();

    clearPremiumRedirectTimer();
    premiumRedirectTimeoutId = window.setTimeout(() => {
      window.location.href = PREMIUM_REDIRECT_PATH;
    }, PREMIUM_BOUNCE_TO_REDIRECT_MS);
  }, PREMIUM_FADE_OUT_COMPLETED_WAIT_MS);
};

const completePremiumHit = () => {
  stopSpin();
  reelStepToken += 1;
  reelStepQueues = Array.from({ length: slotReels.length }, () => Promise.resolve());
  areReelsStopEnabled = false;

  slotStopping = slotStopping.map(() => false);
  slotStopped = slotStopped.map(() => true);
  currentDisplayedNumbers = currentDisplayedNumbers.map(() => PREMIUM_HIT_NUMBER);

  slotReels.forEach((_, index) => {
    renderReel(index);
  });

  if (isPremiumHitNumbers(currentDisplayedNumbers)) {
    showHitPopup();
  }
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

  const renderCellNumberImage = (cell, number) => {
    const imageName = SLOT_NUMBER_IMAGE_NAMES[number];

    if (!cell || !imageName) {
      return;
    }

    cell.innerHTML = '';

    const numberImage = document.createElement('img');
    numberImage.className = 'l-main__slot-number-image';
    numberImage.src = `./img/number/${imageName}.png`;
    numberImage.alt = String(number);
    cell.append(numberImage);
  };

  renderCellNumberImage(cells[0], previousNumber);
  renderCellNumberImage(cells[1], currentNumber);
  renderCellNumberImage(cells[2], nextNumber);

  reel.style.transition = 'none';
};

// リールを1ステップだけ回転させ、表示数字を進めます。
const stepReelOnce = (slotIndex) =>
  new Promise((resolve) => {
    const reel = slotReels[slotIndex];
    const stepToken = reelStepToken;

    if (!reel) {
      resolve();
      return;
    }

    reel.style.transition = `transform ${REEL_STEP_DURATION_MS}ms linear`;

    window.setTimeout(() => {
      if (stepToken !== reelStepToken) {
        resolve();
        return;
      }

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


// 当たりポップアップ関連のタイマーを解除し、非表示にします。
const resetHitPopup = () => {
  if (hitPopupHideTimeoutId !== null) {
    window.clearTimeout(hitPopupHideTimeoutId);
    hitPopupHideTimeoutId = null;
  }

  if (hitPopup) {
    hitPopup.hidden = true;
  }
};

// 当たり時にポップアップを表示し、一定時間後に非表示にします。
const showHitPopup = () => {
  if (!hitPopup) {
    return;
  }

  if (hitPopupHideTimeoutId !== null) {
    window.clearTimeout(hitPopupHideTimeoutId);
  }

  hitPopup.hidden = false;

  hitPopupHideTimeoutId = window.setTimeout(() => {
    hitPopup.hidden = true;
    hitPopupHideTimeoutId = null;
  }, HIT_POPUP_VISIBLE_MS);
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
    reachPopup.classList.remove('js-reach-popup-playing');
    reachPopup.hidden = true;
  }
};

// リーチポップアップ演出の完了イベントを通知します。
const dispatchReachPopupFinishedEvent = () => {
  if (!currentSpinDetail) {
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
    reachPopup.classList.remove('js-reach-popup-playing');
    reachPopup.hidden = false;
    void reachPopup.offsetWidth;
    reachPopup.classList.add('js-reach-popup-playing');
    window.dispatchEvent(new Event(REACH_POPUP_AUDIO_EVENT_NAME));
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
  if (isSpinStartLocked || spinIntervalId || slotReels.length === 0) {
    return;
  }

  window.dispatchEvent(new Event(LEVER_ON_AUDIO_EVENT_NAME));

  slotStopped = slotStopped.map(() => false);
  slotStopping = slotStopping.map(() => false);
  hasShownReachPopup = false;
  centerStopLocked = false;
  areReelsStopEnabled = false;
  clearReachPopupTimer();
  hideReachPopup();
  resetHitPopup();
  resetOnemoreEffect();
  reachHitMovieSequenceController.reset();
  premiumHitMovieController.reset();
  clearPremiumRedirectTimer();
  const forcePremiumHit = shouldForcePremiumHitOnNextSpin;
  shouldForcePremiumHitOnNextSpin = false;

  const isHit = forcePremiumHit || judgeSpinResult();
  spinResultNumbers = forcePremiumHit
    ? Array.from({ length: SLOT_COUNT }, () => PREMIUM_HIT_NUMBER)
    : isHit
      ? createHitNumbers()
      : createMissNumbers(SLOT_COUNT);

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

    if (isPremiumHitNumbers(spinResultNumbers)) {
      premiumHitMovieController.run();
    }
  } else {
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

// 外れ時のリーチ演出種別ごとの変身演出発生率を返します。
const getReachMissUnchangeRate = (effectType) => {
  switch (effectType) {
    case 'reach-cutin-blue':
      return REACH_MISS_CUTIN_BLUE_UNCHANGE_RATE;
    case 'reach-cutin-green':
      return REACH_MISS_CUTIN_GREEN_UNCHANGE_RATE;
    case 'reach-cutin-red':
      return REACH_MISS_CUTIN_RED_UNCHANGE_RATE;
    case 'reach-cutin-gold':
      return REACH_MISS_CUTIN_GOLD_UNCHANGE_RATE;
    case 'reach-character-group-many':
      return REACH_MISS_CHARACTER_GROUP_MANY_UNCHANGE_RATE;
    case 'reach-character-group-few':
      return REACH_MISS_CHARACTER_GROUP_FEW_UNCHANGE_RATE;
    case 'reach-character-group-comment':
      return REACH_MISS_CHARACTER_GROUP_COMMENT_UNCHANGE_RATE;
    default:
      return 0;
  }
};

// 外れ時にリーチ後の変身演出を再生するかを判定します。
const shouldRunReachMissMovieSequence = () => {
  const numbers = currentSpinDetail?.numbers;

  if (!Array.isArray(numbers) || numbers.length < 3) {
    return false;
  }

  if (numbers[LEFT_SLOT_INDEX] !== numbers[RIGHT_SLOT_INDEX]) {
    return false;
  }

  const unchangeRate = getReachMissUnchangeRate(currentSpinDetail?.effectType);
  return Math.random() < unchangeRate;
};

// 固定停止順のうち、次に停止できるリール番号を返します。
const getNextRequiredStopSlotIndex = () =>
  FIXED_STOP_SEQUENCE.find((slotIndex) => !slotStopped[slotIndex] && !slotStopping[slotIndex]);

// 指定リールの停止を確定し、必要ならリーチ表示や全停止判定を行います。
const completeSlotStop = (buttonOrder) => {
  slotStopping[buttonOrder] = false;
  slotStopped[buttonOrder] = true;

  window.dispatchEvent(new Event(REEL_STOP_AUDIO_EVENT_NAME));

  const canShowReachPopup =
    !hasShownReachPopup &&
    buttonOrder !== CENTER_SLOT_INDEX &&
    !slotStopped[CENTER_SLOT_INDEX] &&
    isReachState();

  if (canShowReachPopup) {
    showReachPopupWithDelay();
  }

  if (buttonOrder === CENTER_SLOT_INDEX && currentSpinDetail?.isHit) {
    const isPremiumHit = isPremiumHitNumbers(spinResultNumbers);
    const isSevenAligned = currentDisplayedNumbers.every((number) => number === PREMIUM_HIT_NUMBER);

    if (isPremiumHit && isSevenAligned) {
      showHitPopup();
    }

    if (!isPremiumHit) {
      runNonPremiumHitCelebration();
    }
  }

  const isAllSlotsStopped = slotStopped.every(Boolean);

  if (isAllSlotsStopped) {
    stopSpin();

    if (!currentSpinDetail?.isHit) {
      decrementSpinCountAfterFinish();
    }
  }
};

// 指定ミリ秒待機する Promise を返します。
const wait = (ms) => new Promise((resolve) => {
  window.setTimeout(resolve, ms);
});

const runNonPremiumHitCelebration = async () => {
  lockSpinStartUntilOnemoreEffectFinished();

  const alignedNumber = currentDisplayedNumbers[CENTER_SLOT_INDEX];
  const alignedIndexes = currentDisplayedNumbers
    .map((number, index) => (number === alignedNumber ? index : -1))
    .filter((index) => index !== -1);

  await wait(NON_PREMIUM_HIT_Z_SPIN_DELAY_MS);

  if (typeof window.playExcitingAudio === 'function') {
    window.playExcitingAudio();
  }

  alignedIndexes.forEach((index) => {
    const reel = slotReels[index];

    if (!reel) {
      return;
    }

    reel.classList.remove('js-hit-z-spin-target');

    void reel.offsetWidth;

    reel.classList.add('js-hit-z-spin-target');
  });

  await wait(NON_PREMIUM_HIT_Z_SPIN_DURATION_MS);

  alignedIndexes.forEach((index) => {
    const reel = slotReels[index];

    if (!reel) {
      return;
    }

    reel.classList.remove('js-hit-z-spin-target');
  });
  showOnemoreEffect();
};

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

  if (reachHitMovieSequenceController.isRunning()) {
    return;
  }

  if (currentSpinDetail?.isHit && isPremiumHitNumbers(spinResultNumbers)) {
    return;
  }

  if (slotStopping.some(Boolean)) {
    return;
  }

  const nextRequiredStopSlotIndex = getNextRequiredStopSlotIndex();

  if (nextRequiredStopSlotIndex === undefined || buttonOrder !== nextRequiredStopSlotIndex) {
    return;
  }

  if (buttonOrder === CENTER_SLOT_INDEX && centerStopLocked) {
    return;
  }

  const shouldRunReachMovieSequence =
    buttonOrder === CENTER_SLOT_INDEX &&
    !isPremiumHitNumbers(spinResultNumbers) &&
    !reachHitMovieSequenceController.isRunning() &&
    (currentSpinDetail?.isHit || shouldRunReachMissMovieSequence());

  if (shouldRunReachMovieSequence) {
    setReachChangeMovieSourceBySpinResult(currentSpinDetail?.isHit);
    window.dispatchEvent(new Event(STOP_BUTTON_AUDIO_EVENT_NAME));
    reachHitMovieSequenceController.run().then((isCompleted) => {
      if (!isCompleted) {
        return;
      }

      if (
        spinIntervalId &&
        slotStopping[buttonOrder] === false &&
        slotStopped[buttonOrder] === false
      ) {
        slotStopping[buttonOrder] = true;
        stopSlotWithCycle(buttonOrder, spinResultNumbers[buttonOrder]);
      }
    });
    return;
  }

  if (
    buttonOrder >= slotStopped.length ||
    slotStopped[buttonOrder] ||
    slotStopping[buttonOrder]
  ) {
    return;
  }

  window.dispatchEvent(new Event(STOP_BUTTON_AUDIO_EVENT_NAME));

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

// 指定キーが押下状態かを返します。
const isArrowKeyPressed = (key) => {
  const arrowKeyIndex = STOP_ARROW_KEYS.indexOf(key);

  return arrowKeyIndex !== -1;
};

// 矢印キー入力でリール停止操作を行います。
const watchArrowKeyInput = (event) => {
  if (reachHitMovieSequenceController.handleEnterKeyDown(event)) {
    return;
  }

  if (!isArrowKeyPressed(event.key)) {
    return;
  }

  const buttonOrder = STOP_ARROW_KEYS.indexOf(event.key);

  if (buttonOrder === -1) {
    return;
  }

  if (event.repeat || previousArrowKeyPressed[buttonOrder]) {
    return;
  }

  previousArrowKeyPressed[buttonOrder] = true;
  stopSlotByButtonOrder(buttonOrder);
};

// スペースキー入力でリール回転開始操作を行います。
const watchStartKeyInput = (event) => {
  if (!START_SPIN_KEYS.includes(event.key)) {
    return;
  }

  if (event.repeat || previousStartKeyPressed) {
    return;
  }

  previousStartKeyPressed = true;

  if (!spinIntervalId) {
    startSpin();
  }
};

// スペースキー入力の押下状態を解除します。
const releaseStartKeyInput = (event) => {
  if (!START_SPIN_KEYS.includes(event.key)) {
    return;
  }

  previousStartKeyPressed = false;
};

// 矢印キー入力の押下状態を解除します。
const releaseArrowKeyInput = (event) => {
  if (!isArrowKeyPressed(event.key)) {
    return;
  }

  const buttonOrder = STOP_ARROW_KEYS.indexOf(event.key);

  if (buttonOrder === -1) {
    return;
  }

  previousArrowKeyPressed[buttonOrder] = false;
};

// ゲームパッド入力を監視し、開始・停止操作を処理し続けます。

window.addEventListener(REACH_HIT_EFFECT_FINISHED_EVENT_NAME, (event) => {
  if (currentSpinDetail) {
    currentSpinDetail = {
      ...currentSpinDetail,
      ...event.detail,
    };
  }

  centerStopLocked = false;
});

window.addEventListener(REACH_MISS_EFFECT_FINISHED_EVENT_NAME, (event) => {
  if (currentSpinDetail) {
    currentSpinDetail = {
      ...currentSpinDetail,
      ...event.detail,
    };
  }

  centerStopLocked = false;
});

window.addEventListener(REACH_POPUP_FINISHED_EVENT_NAME, (event) => {
  const hitNumber = event.detail?.numbers?.[0];

  if (event.detail?.isHit && hitNumber === PREMIUM_HIT_NUMBER) {
    centerStopLocked = false;
  }
});

window.addEventListener(LEVER_ON_EFFECT_FINISHED_EVENT_NAME, () => {
  areReelsStopEnabled = true;
});
const watchControllerInput = () => {
  const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
  const activeGamepad = Array.from(gamepads).find(Boolean);

  if (activeGamepad) {
    const advancePressed = isButtonPressed(activeGamepad, ADVANCE_EFFECT_BUTTON_INDEX);

    if (advancePressed && !previousButtonPressed.advance) {
      reachHitMovieSequenceController.handleAdvanceInput();
    }

    previousButtonPressed.advance = advancePressed;

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
      advance: false,
      stop: STOP_BUTTON_INDEXES.map(() => false),
    };
  }

  requestAnimationFrame(watchControllerInput);
};

slotReels.forEach((_, index) => {
  renderReel(index);
});

updateSignboardNumber();

watchControllerInput();

window.addEventListener('keydown', watchArrowKeyInput);
window.addEventListener('keydown', watchStartKeyInput);
window.addEventListener('keyup', releaseArrowKeyInput);
window.addEventListener('keyup', releaseStartKeyInput);
