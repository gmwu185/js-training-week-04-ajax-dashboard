

new Vue({
  el: '#app',
  data: {
    message: '漂亮阿姨，有看到我的訊息嗎？'
  }
});

min.fn();  // 輸出 -> '小明'

// const obj = {
//   data: [],
//   getData() {
//     const vm = this; // var vm = this; // simple call 執行函式使用
//     const APIPath = 'https://randomuser.me/api/';
//     axios.get(APIPath)
//       .then((res) => {
//         console.log('getData then(res.data.results)', res.data.results);
//         this.data = res.data.results;
//         console.log('this.data', this.data);  // 使用箭頭函式執行，取得的 this 是 obj 下的 this
//         this.render();
//       })
//       .catch((res) => {
//         console.log('catch() res', res);
//       })
//   },
//   render() {
//     console.log('render() this', this.data);
//     document.querySelector('#app').innerHTML = `
//       透過 axios .then AJAX 取得資料後的部份呈現於畫面：<br>
//       email: <a href="mailto:${this.data[0].email}" tarage='new'>${this.data[0].email}</a>
//     `;
//   }
// };
// obj.getData();