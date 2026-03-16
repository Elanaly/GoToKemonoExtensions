// 拡張機能インストール時にコンテキストメニューを登録する
chrome.runtime.onInstalled.addListener(() => {
    // fantia.jp用メニュー
    chrome.contextMenus.create({
        id: "goToKemonoFantia",
        title: "kemonoに移動",
        contexts: ["all"],
        documentUrlPatterns: ["https://fantia.jp/fanclubs/*"]
    });

    // fanbox.cc用メニュー
    chrome.contextMenus.create({
        id: "goToKemonoFanbox",
        title: "kemonoに移動",
        contexts: ["all"],
        documentUrlPatterns: ["https://*.fanbox.cc/*"]
    });
});

// コンテキストメニュークリック時の処理
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "goToKemonoFantia") {
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

    if (info.menuItemId === "goToKemonoFanbox") {
        // content scriptにメッセージを送り、ページ内のpixivリンクからIDを取得する
        chrome.tabs.sendMessage(tab.id, { type: "getPixivId" }, (response) => {
            if (response && response.pixivId) {
                chrome.tabs.create({ url: `https://kemono.cr/fanbox/user/${response.pixivId}` });
            } else {
                // pixivリンクが見つからなければトップページへ
                chrome.tabs.create({ url: "https://kemono.cr/" });
            }
        });
    }
});
