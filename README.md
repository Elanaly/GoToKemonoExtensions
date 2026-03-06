# GoToKemonoExtensions

`fantia.jp` のファンクラブページで右クリックすると「kemonoに移動」メニューが表示され、対応する `kemono.cr` のページへ直接移動できるブラウザ拡張機能です。

## 機能

- `https://fantia.jp/fanclubs/*` を開いているときに右クリックメニューを表示
- fanclub ID を URL から自動抽出し、`https://kemono.cr/fantia/user/{ID}` へ遷移

## ディレクトリ構成

```
GoToKemonoExtensions/
├── chrome/       # Chrome 用拡張機能 (Manifest V3)
│   ├── manifest.json
│   └── background.js
└── firefox/      # Firefox 用拡張機能 (Manifest V2)
    ├── manifest.json
    └── background.js
```

## インストール方法

### Chrome

1. `chrome://extensions/` を開く
2. 右上の「デベロッパーモード」をON
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. `chrome/` フォルダを選択

### Firefox

1. `about:debugging#/runtime/this-firefox` を開く
2. 「一時的なアドオンを読み込む」をクリック
3. `firefox/manifest.json` を選択