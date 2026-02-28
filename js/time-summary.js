// 時間（ミリ秒）を管理している関数と値の一覧を返します。
// すべて ms 単位で統一し、演出の待機・表示・遷移時間を把握しやすくしています。
export const getTimeSummary = () => [
  {
    // リールの数字更新周期
    functionName: 'startSpin',
    durationMs: 80,
    description: 'リール数字を更新するインターバル（SPIN_INTERVAL_MS）。',
  },
  {
    // リーチポップアップの表示遅延
    functionName: 'showReachPopupWithDelay',
    durationMs: 300,
    description: 'リーチポップアップを出すまでの待機時間。',
  },
  {
    // リーチポップアップの表示時間
    functionName: 'showReachPopupWithDelay',
    durationMs: 1300,
    description: 'リーチポップアップを表示する時間。',
  },
  {
    // HIT ポップアップ表示時間
    functionName: 'showHitPopup',
    durationMs: 1000,
    description: 'HIT ポップアップを表示する時間。',
  },
  {
    // 非プレミア当たりの Z 回転開始前待機
    functionName: 'completeSlotStop',
    durationMs: 1000,
    description: 'Z 回転演出開始前の待機時間。',
  },
  {
    // 非プレミア当たりの Z 回転時間
    functionName: 'completeSlotStop',
    durationMs: 900,
    description: 'Z 回転演出の継続時間。',
  },
  {
    // プレミア後の遷移待機
    functionName: 'startPremiumPostFadeOutSequence',
    durationMs: 5000,
    description: 'プレミア演出後、YamaExtra へ遷移するまでの時間。',
  },
  {
    // メインタイトル揺れ時間
    functionName: 'lockSpinStartUntilMainTitleShakeFinished',
    durationMs: 1200,
    description: 'タイトルのシェイク演出時間。',
  },
  {
    // ワンモア演出の表示遅延
    functionName: 'showOnemoreEffect',
    durationMs: 1000,
    description: 'ワンモア演出を表示開始するまでの待機時間。',
  },
  {
    // ワンモア演出の表示時間
    functionName: 'showOnemoreEffect',
    durationMs: 2400,
    description: 'ワンモア演出を表示する時間。',
  },
  {
    // 看板演出表示時間
    functionName: 'playSignboardBranchEffect',
    durationMs: 1000,
    description: '看板演出を表示する時間。',
  },
  {
    // レバーオンカットイン表示時間
    functionName: 'playLeverOnCutinEffect',
    durationMs: 3000,
    description: 'レバーオンカットイン演出の表示時間。',
  },
  {
    // BGM フェードイン時間
    functionName: 'resumeBgmWithFadeIn',
    durationMs: 1200,
    description: 'BGM を徐々に上げるデフォルト時間。',
  },
  {
    // PUSH 系 SE の再生遅延
    functionName: 'audio-controller (REACH_PUSH_SOUND_DELAY_MS)',
    durationMs: 800,
    description: 'リーチ開始後に push 音を鳴らすまでの待機時間。',
  },
  {
    // 変化音の再生遅延
    functionName: 'audio-controller (CHANGED_AUDIO_DELAY_MS)',
    durationMs: 10000,
    description: 'changed 音を再生するまでの待機時間。',
  },
];
