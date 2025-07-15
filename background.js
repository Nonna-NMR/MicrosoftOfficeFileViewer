// background.js
// このスクリプトは、コンテンツスクリプトからのメッセージを受け取り、新しいタブを開く処理を行うよ。
// manifest_version 3 では、Service Workerとして動作するんだ。

// コンテンツスクリプトからのメッセージをリッスンするよ。
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // メッセージが "openOfficeViewer" タイプで、URLが含まれていれば処理するよ。
  if (message.type === "openOfficeViewer" && message.url) {
    const viewerUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(message.url)}`;
    // 新しいタブでOffice Online ViewerのURLを開くよ。
    chrome.tabs.create({ url: viewerUrl, active: true });
    console.log(`新しいタブでOffice Online Viewerを開いたよ: ${viewerUrl}`);
    sendResponse({ status: "success" }); // 応答を返すよ
    return true; // 非同期応答のためにtrueを返すよ
  }
});

console.log("Office File Viewer (background.js) が起動したよ。");

// アイコンファイルは別途用意してね。
// icon16.png, icon48.png, icon128.png
// 適当なアイコン画像を用意して、拡張機能のフォルダに配置してね。