const TIME_VALUES = {
  reelStepDurationMs: 60, // リール数字更新の1ステップ間隔
  spinIntervalMs: 80, // リール回転中の数字更新インターバル
  stopSlowCycleIntervalMs: 160, // 停止減速中の更新インターバル
  reachPopupDelayMs: 300, // リーチポップアップ表示までの待機時間
  reachPopupVisibleMs: 1500, // リーチポップアップ表示時間
  hitPopupVisibleMs: 1000, // HITポップアップ表示時間
  nonPremiumHitZSpinDelayMs: 1000, // 通常当たり時のZ回転開始前待機
  nonPremiumHitZSpinDurationMs: 900, // 通常当たり時のZ回転演出時間
  premiumFadeOutCompletedWaitMs: 1000, // プレミア演出フェード完了後の待機
  premiumBounceToRedirectMs: 5000, // プレミア演出後に遷移するまでの時間
  premiumHitMovieStartDelayMs: 700, // プレミア当たり時にボタン押下後から動画再生開始までの待機
  mainTitleShakeDurationMs: 1200, // メインタイトルのシェイク演出時間
  onemoreEffectDisplayDelayMs: 1000, // ONE MORE演出表示開始までの待機
  onemoreEffectDurationMs: 2400, // ONE MORE演出の表示時間
  signboardVisibleMs: 1000, // 看板演出の表示時間
  signboardSlideDurationMs: 400, // 看板スライド演出時間
  leverOnCutinVisibleMs: 3000, // レバーオンカットイン表示時間
  leverOnCutinBirdCenterReachedMs: 850, // レバーオンカットイン鳥の中央到達時間
  leverOnCutinBirdResetFadeInMs: 300, // レバーオンカットイン鳥のリセットフェード時間
  bgmFadeInDefaultDurationMs: 1200, // BGMフェードインのデフォルト時間
  reachPushSoundDelayMs: 800, // リーチ開始後のpush音再生遅延
  pushWavDelayMs: 500, // push.wav再生までの待機
  changedAudioDelayMs: 5000, // changed音の再生遅延
  reachChangeMoviePauseMs: 3400, // change/unchange動画を一時停止する時間
  suzuBackgroundVisibleMs: 3000, // スズ背景演出の表示時間
  premiumFadeOutDurationMs: 320, // プレミア演出フェードアウト時間
  finishedRedirectDelayMs: 3000, // 残り回転回数0回到達後に終了画面へ遷移するまでの待機
  bgmFadeInFrameMs: 50, // BGMフェードイン制御のフレーム間隔
};

export const getTimeValue = (key) => TIME_VALUES[key];
