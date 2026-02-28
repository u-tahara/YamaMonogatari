const VOLUME_VALUES = {
  effectAudio: 0.3, // 効果音共通のデフォルト音量
  bgmDefault: 0.07, // BGMのデフォルト音量
  reachCutinMovie: 1, // リーチカットイン動画の音量
  leverOnCutinMovie: 0.3, // レバーオンカットイン動画の音量
  reachCharacterGroup: 1, // 群演出動画の音量
  reachChangeMovie: 0.6, // change/unchange動画の音量
  pushButtonMovie: 0.2, // PUSHボタン動画の音量
  premiumBlackoutMovie: 0.4, // プレミアブラックアウト動画の音量
  premiumChangeMovie: 0.5, // プレミア変化動画の音量
  helpAudio: 1, // help.wavの音量
  signboardAudio: 0.3, // 看板演出音（up/down）の音量
  cheersAudio: 0.6, // cheers.mp3の音量
  pushAudio: 0.5, // push.mp3の音量
  pushWavAudio: 1, // push.wavの音量
  shineAudio: 0.5, // shine.mp3の音量
  excitingAudio: 0.6, // exciting.mp3の音量
  changedAudio: 1, // changed.mp3の音量
  reachAudio: 0.5, // reach.mp3の音量
  onemoreAudio: 0.6, // onemore.wavの音量
};

export const getVolumeValue = (key) => VOLUME_VALUES[key];
