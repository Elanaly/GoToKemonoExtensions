// background.jsからのメッセージを受信し、ページ内のpixivリンクからIDを抽出して返す
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "getPixivId") {
        // パターン1: pixiv.net/member.php?id=ID 形式
        let link = document.querySelector('a[href*="pixiv.net/member.php?id="]');
        if (link) {
            const match = link.href.match(/[?&]id=(\d+)/);
            if (match) {
                sendResponse({ pixivId: match[1] });
                return;
            }
        }

        // パターン2: pixiv.net/users/ID 形式
        link = document.querySelector('a[href*="pixiv.net/users/"]');
        if (link) {
            const match = link.href.match(/\/users\/(\d+)/);
            if (match) {
                sendResponse({ pixivId: match[1] });
                return;
            }
        }

        sendResponse({ pixivId: null });
    }
});
