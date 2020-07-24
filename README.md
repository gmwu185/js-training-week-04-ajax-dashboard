# 成品頁面
- [登入頁面](https://gmwu185.github.io/js-training-week-04-ajax-dashboard/login.html)
- [產品頁面](https://gmwu185.github.io/js-training-week-04-ajax-dashboard/product.html)
- [前台頁面 (另外的 Repos 裡的 GitHub Pages link)](https://gmwu185.github.io/js-training-week-02-jsajax/)




# 做了什麼

## 登入頁面功能：
- 登入頁面 API 驗證功能 token 存於 cookie 中

## 產品列表頁面
- 分頁列表 vue 元件製作
  - 元件內層觸發與實體外層資料傳入驅動分頁結構
  - AJAX 產品列表網網址參數操作，透過分頁點按操作特定分頁內容
  - 分頁目前頁面判斷樣式 (disabled 判斷目前頁面)
- 新增與編輯產品
  - 彈出視窗內容 modal 元件化處理，共用新增與編輯產品操作資料與 AJAX 行為。
  - 部份按鈕點按 AJAX 行為觸發時的讀取中效果。

## 共用功能
- API 驗證功能 token 存於 cookie 中
- 透過已存過 token 的 cookie ，再取用出 token 達到元件與頁面共用
- 登入成功後的轉址到產品列表頁注意事項

## 其他
JavaScript 透過 ES6 module (模組化) 對應 `export` (匯出) 與 `import` (匯入) 觀念，透過 Gulp 做對應拆分，模組化首要重點就是 JavaScript 的前後順序，JavaScript 全域 -> Vue component (拆分個部元件) -> Vue 實體，實作透過 gulp babel 轉出也沒有問題。



# Node npm & bower 前端工具，執行指令依序輸入
- `npm install -g bower`
- `npm install`
- `gulp`