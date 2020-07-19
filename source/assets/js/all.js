
// UUID
// const uuid = ''; // 請加入個人的 UUID

new Vue({
  el: '#app',
  data: {
    uuid: '',
    apiPath: 'https://course-ec-api.hexschool.io/api/',
    token: '',
    user: {
      email: '',
      password: '',
    },
    products: [
      // {
      //   id: 1586934917210,
      //   unit: '台',
      //   category: '掌上主機',
      //   title: 'Switch',
      //   origin_price: 20000,
      //   price: 9980,
      //   description: '想玩就玩',
      //   content: '動森太好玩惹',
      //   is_enabled: 1,
      //   imageUrl: 'https://images.unsplash.com/photo-1592107761705-30a1bbc641e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
      // },
      // {
      //   id: 1196934917910,
      //   unit: '台',
      //   category: '主機',
      //   title: 'PS5 Wifi',
      //   origin_price: 29999,
      //   description: '次世代超強規格',
      //   content: '我也想要換一台 PS5 Wifi',
      //   price: 9487,
      //   is_enabled: 0,
      //   imageUrl: 'https://images.unsplash.com/photo-1592107761705-30a1bbc641e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
      // },
    ],
    pagination: {},
    tempProduct: {},
  },
  methods: {
    signin() {
      const api = `${this.apiPath}auth/login`;
      axios.post(api, this.user)
        .then((response) => {
          const token = response.data.token;
          const expired = response.data.expired;
          document.cookie = `token=${token}; expires=${new Date(expired * 1000)}; path=/`;
          console.log('signin() -> .then() response', response);
          alert(JSON.parse(response.request.responseText).message);
        })
        .catch((error) => {
          // console.dir(error);
          let jsonParseResponseStr = JSON.parse(error.response.request.response)
          console.log(jsonParseResponseStr.message);
          alert(jsonParseResponseStr.message);
        }
      );
    },
    signout() {
      // 請加入 Token
      document.cookie = `token=; expires=; path=/`;
      const token = '';
      console.log('signout() -> 完成登出與清除 token 為空字串');
      alert('完成登出');
    },
    getData() {
      // 取得 token 的 cookies（注意取得的時間點）
      // 詳情請見：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      if (this.token == '') {
        console.log('取得資料 getData() 無法執行，token 為空字串');
      } else {
        // // API
        const api = `${this.apiPath}${this.uuid}/admin/ec/products`;
        // console.log('getData() -> api', api);
  
        // 將 Token 加入到 Headers 內
        axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
        // console.log('getData() ->  this.token', this.token);
  
        // // 請自行完成 Ajax
        axios.get(api).then((response) => {
          console.log('axios.get(api) response', response);
          this.products = response.data.data;
          console.log('this.products', this.products);
          this.pagination = response.data.meta.pagination;
        })
      }
    },
    updateProduct() {
      if (this.tempProduct.id) {
        const id = this.tempProduct.id;
        this.products.forEach((item, i) => {
          if (item.id === id) {
            this.products[i] = this.tempProduct;
          }
        });
      } else {
        // Unix Timestamp
        const id = new Date().getTime();
        this.tempProduct.id = id;
        this.products.push(this.tempProduct);
      }
      this.tempProduct = {};
      $('#productModal').modal('hide');
    },
    openModal(isNew, item) {
      switch (isNew) {
        case 'new':
          this.tempProduct = {};
          $('#productModal').modal('show');
          break;
        case 'edit':
          this.tempProduct = Object.assign({}, item);
          $('#productModal').modal('show');
          break;
        case 'delete':
          $('#delProductModal').modal('show');
          this.tempProduct = Object.assign({}, item);
          break;
        default:
          break;
      }
    },
    delProduct() {
      if (this.tempProduct.id) {
        const id = this.tempProduct.id;
        this.products.forEach((item, i) => {
          if (item.id === id) {
            this.products.splice(i, 1);
            this.tempProduct = {};
          }
        });
      }
      $('#delProductModal').modal('hide');
    },
  },
  created() {
    // 透過全域設定 uuid
    this.uuid = uuid;

    /*=============================================
    =            預設執行直接向 cookie 取得 token            =
    =============================================*/
    this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    // 將 Token 加入到 Headers 內 - 二種寫法二選一
    // axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
    /*=====  End of 預設執行直接向 cookie 取得 token  ======*/

    this.getData();
  }
});
