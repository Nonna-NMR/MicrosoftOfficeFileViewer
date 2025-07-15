// content.js
// このスクリプトは、ウェブページに注入され、リンクのクリックイベントを監視するよ。

// Officeファイルの拡張子リストだよ。
const officeExtensions = [
  ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx"
];

/**
 * URLがOfficeファイルの拡張子を持っているかチェックする関数だよ。
 * @param {string} url - チェックするURL
 * @returns {boolean} - Officeファイルであればtrue、そうでなければfalse
 */
function isOfficeFile(url) {
  // URLを小文字に変換して、拡張子をチェックするよ。
  const lowerCaseUrl = url.toLowerCase();
  return officeExtensions.some(ext => lowerCaseUrl.endsWith(ext));
}

// ドキュメント全体でのクリックイベントをリッスンするよ。
document.addEventListener('click', (event) => {
  // クリックされた要素がリンク（<a>タグ）かどうかを確認するよ。
  const target = event.target.closest('a'); // クリックされた要素から最も近い<a>タグを探すよ

  if (target && target.href) {
    const originalUrl = target.href;

    // リンクのURLがOfficeファイルであれば処理を行うよ。
    if (isOfficeFile(originalUrl)) {
      // デフォルトのリンク動作をキャンセルするよ。
      // これでブラウザが元のリンクを開くのを防ぐんだ。
      event.preventDefault();
      event.stopPropagation(); // イベントの伝播も停止するよ

      console.log(`Officeファイルリンクをクリックしたよ: ${originalUrl}`);

      // background.jsにメッセージを送って、新しいタブでOffice Online Viewerを開いてもらうよ。
      chrome.runtime.sendMessage({ type: "openOfficeViewer", url: originalUrl }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("メッセージ送信エラー:", chrome.runtime.lastError.message);
        } else if (response && response.status === "success") {
          console.log("Office Online Viewerを開くリクエストが成功したよ。");
        }
      });
    }
  }
}, true); // 第3引数をtrueにすることで、キャプチャフェーズでイベントをリッスンするよ。
          // これにより、他のスクリプトがイベントを停止する前に処理できる可能性が高まるんだ。

console.log("Office File Viewer (content.js) が注入されたよ。");
