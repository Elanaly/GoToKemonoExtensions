// 拡張機能インストール時にコンテキストメニューを登録する
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "goToKemono",
        title: "kemonoに移動",
        contexts: ["all"],
        documentUrlPatterns: ["https://fantia.jp/fanclubs/*"]
    });
});

// コンテキストメニュークリック時の処理
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "goToKemono") {
        // 現在のタブURLからfanclub IDを抽出する
        // 例: https://fantia.jp/fanclubs/83679?locale=jp → 83679
        const url = tab.url;
        const match = url.match(/\/fanclubs\/(\d+)/);
        if (match) {
            const fanclubId = match[1];
            chrome.tabs.create({ url: `https://kemono.cr/fantia/user/${fanclubId}` });
        } else {
            // IDが取れなければトップページへ
            chrome.tabs.create({ url: "https://kemono.cr/" });
        }
    }
});
