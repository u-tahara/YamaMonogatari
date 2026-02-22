// 7図柄当たり時の暗転→変化動画演出を管理するコントローラーを生成します。
export const createPremiumHitMovieController = ({
  blackoutMovie,
  changeMovie,
  onCompleted,
}) => {
  let isRunning = false;

  const normalizeMovie = (movieElement) => {
    if (!movieElement) {
      return;
    }

    movieElement.pause();
    movieElement.currentTime = 0;
    movieElement.hidden = true;
  };

  const safePlayMovie = (movieElement) => {
    if (!movieElement) {
      return;
    }

    movieElement.play().catch(() => {
      // ユーザー操作制限時は次の操作で再試行されます。
    });
  };

  const reset = () => {
    isRunning = false;
    normalizeMovie(blackoutMovie);
    normalizeMovie(changeMovie);
  };

  const run = async () => {
    if (!blackoutMovie || !changeMovie || isRunning) {
      return false;
    }

    isRunning = true;

    blackoutMovie.currentTime = 0;
    blackoutMovie.hidden = false;
    safePlayMovie(blackoutMovie);

    await new Promise((resolve) => {
      const handleEnded = () => {
        blackoutMovie.removeEventListener('ended', handleEnded);
        resolve();
      };

      blackoutMovie.addEventListener('ended', handleEnded);
    });

    if (!isRunning) {
      return false;
    }

    blackoutMovie.pause();
    blackoutMovie.currentTime = 0;
    blackoutMovie.hidden = true;

    changeMovie.currentTime = 0;
    changeMovie.hidden = false;
    safePlayMovie(changeMovie);

    await new Promise((resolve) => {
      const handleEnded = () => {
        changeMovie.removeEventListener('ended', handleEnded);
        resolve();
      };

      changeMovie.addEventListener('ended', handleEnded);
    });

    if (!isRunning) {
      return false;
    }

    changeMovie.pause();
    changeMovie.currentTime = 0;
    changeMovie.hidden = true;
    isRunning = false;

    if (typeof onCompleted === 'function') {
      onCompleted();
    }

    return true;
  };

  return {
    isRunning: () => isRunning,
    reset,
    run,
  };
};
