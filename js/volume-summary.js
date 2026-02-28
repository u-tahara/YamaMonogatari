const VOLUME_VALUES = {
  effectAudio: 0.3,
  bgmDefault: 0.07,
  reachCutinMovie: 1,
  leverOnCutinMovie: 0.3,
  reachCharacterGroup: 1,
  reachChangeMovie: 0.6,
  pushButtonMovie: 0.2,
  premiumBlackoutMovie: 0.4,
  premiumChangeMovie: 0.5,
  helpAudio: 1,
  signboardAudio: 0.3,
  cheersAudio: 0.6,
  pushAudio: 0.5,
  pushWavAudio: 1,
  shineAudio: 0.5,
  excitingAudio: 0.6,
  changedAudio: 1,
  reachAudio: 0.5,
  onemoreAudio: 0.6,
};

export const getVolumeValue = (key) => VOLUME_VALUES[key];

// 音量を管理している関数とデフォルト値の一覧を返します。
// 0.0〜1.0 の範囲で扱う想定です。
export const getVolumeSummary = () => [
  {
    // リーチカットイン動画の音量（独立管理）
    functionName: 'setReachCutinMovieVolume',
    defaultVolume: 1,
    description: 'リーチカットイン動画（reach-*.webm）の再生音量。',
  },
  {
    // レバーオンカットイン動画
    functionName: 'setLeverOnCutinMovieVolume',
    defaultVolume: 0.3,
    description: 'レバーオンカットイン動画の再生音量。',
  },
  {
    // リーチ時の群動画
    functionName: 'setReachCharacterGroupVolume',
    defaultVolume: 1,
    description: '群演出動画の再生音量。',
  },
  {
    // リーチ変化動画
    functionName: 'setReachChangeMovieVolume',
    defaultVolume: 0.6,
    description: 'change / unchange 動画の再生音量。',
  },
  {
    // PUSH ボタン動画
    functionName: 'setPushButtonMovieVolume',
    defaultVolume: 0.2,
    description: 'PUSH ボタン動画の再生音量。',
  },
  {
    // プレミア演出のブラックアウト動画
    functionName: 'setPremiumBlackoutMovieVolume',
    defaultVolume: 0.4,
    description: 'プレミアブラックアウト動画の再生音量。',
  },
  {
    // プレミア演出の変化動画
    functionName: 'setPremiumChangeMovieVolume',
    defaultVolume: 0.5,
    description: 'プレミア変化動画の再生音量。',
  },
  {
    // HELP 効果音
    functionName: 'setHelpAudioVolume',
    defaultVolume: 1,
    description: 'help.wav の音量。',
  },
  {
    // 看板アップ/ダウン共通
    functionName: 'setSignboardAudioVolume',
    defaultVolume: 0.3,
    description: 'up.mp3 / down.mp3 の共通音量。',
  },
  {
    // 応援音
    functionName: 'setCheersAudioVolume',
    defaultVolume: 0.6,
    description: 'cheers.mp3 の音量。',
  },
  {
    // push 音
    functionName: 'setPushAudioVolume',
    defaultVolume: 0.5,
    description: 'push.mp3 の音量（push.wav にも反映）。',
  },
  {
    // push wav 音
    functionName: 'setPushWavAudioVolume',
    defaultVolume: 1,
    description: 'push.wav の音量。',
  },
  {
    // shine 音
    functionName: 'setShineAudioVolume',
    defaultVolume: 0.5,
    description: 'shine.mp3 の音量。',
  },
  {
    // exciting 音
    functionName: 'setExcitingAudioVolume',
    defaultVolume: 0.6,
    description: 'exciting.mp3 の音量。',
  },
  {
    // changed 音
    functionName: 'setChangedAudioVolume',
    defaultVolume: 1,
    description: 'changed.mp3 の音量。',
  },
  {
    // reach 音
    functionName: 'setReachAudioVolume',
    defaultVolume: 0.5,
    description: 'reach.mp3 の音量。',
  },
  {
    // ワンモア音
    functionName: 'setOnemoreAudioVolume',
    defaultVolume: 0.5,
    description: 'onemore.wav の音量。',
  },
];
