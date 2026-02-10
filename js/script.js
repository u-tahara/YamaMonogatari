const messageElement = document.querySelector('.js-message');
const toggleButton = document.querySelector('.js-toggle-button');

if (messageElement && toggleButton) {
  toggleButton.addEventListener('click', () => {
    messageElement.textContent =
      messageElement.textContent === '準備中です。'
        ? 'ベースファイルの作成が完了しました。'
        : '準備中です。';
  });
}
