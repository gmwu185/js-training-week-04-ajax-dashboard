Vue.component('modal-content', {
  template: `<div class="modal-dialog modal-xl" role="document"> 
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="exampleModalLabel" class="modal-title">
            <span>新增產品</span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label for="imageUrl">輸入圖片網址</label>
                <input id="imageUrl" v-model="tempProduct.imageUrl[0]" type="text" class="form-control"
                  placeholder="請輸入圖片連結">
              </div>
              <img class="img-fluid" :src="tempProduct.imageUrl" alt>
            </div>
            <div class="col-sm-8">
              <div class="form-group">
                <label for="title">標題</label>
                <input id="title" v-model="tempProduct.title" type="text" class="form-control" placeholder="請輸入標題">
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="category">分類</label>
                  <input id="category" v-model="tempProduct.category" type="text" class="form-control"
                    placeholder="請輸入分類" >
                </div>
                <div class="form-group col-md-6">
                  <label for="price">單位</label>
                  <input id="unit" v-model="tempProduct.unit" type="unit" class="form-control"
                    placeholder="請輸入單位">
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                  <input id="origin_price" v-model="tempProduct.origin_price" type="number" class="form-control"
                    placeholder="請輸入原價">
                </div>
                <div class="form-group col-md-6">
                  <label for="price">售價</label>
                  <input id="price" v-model="tempProduct.price" type="number" class="form-control"
                    placeholder="請輸入售價">
                </div>
              </div>
              <hr>

              <div class="form-group">
                <label for="description">產品描述</label>
                <textarea id="description" v-model="tempProduct.description" type="text" class="form-control"
                  placeholder="請輸入產品描述" >
                </textarea>
              </div>
              <div class="form-group">
                <label for="content">說明內容</label>
                <textarea id="description" v-model="tempProduct.content" type="text" class="form-control"
                  placeholder="請輸入說明內容" >
                </textarea>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input id="is_enabled"class="form-check-input" type="checkbox"
                  v-model="tempProduct.enabled" 
                  :true-value="true" 
                  :false-value="false">
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" 
          :disabled="componentLoadingBtn === tempProduct.id"
          @click="updateProduct">
            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" 
            v-if="componentLoadingBtn === tempProduct.id"></span>
            確認
          </button>
        </div>
      </div>
    </div>`
  ,
  data() {
    return {
      // tempProduct: {
      //   // id: 1586934917210,
      //   // unit: '台',
      //   // category: '掌上主機',
      //   // title: 'Switch',
      //   // origin_price: 20000,
      //   // price: 9980,
      //   // description: '想玩就玩',
      //   // content: '動森太好玩惹',
      //   // enabled: 1,
      //   // imageUrl: 'https://images.unsplash.com/photo-1592107761705-30a1bbc641e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
      // },
      componentLoadingBtn: '',  // 由內元件操作按鈕 loading 動效
    };
  },
  props: [
    'isNew',
    'api-path', 
    'uuid',
    'tempProduct',
  ],
  methods: {
    updateProduct() {
      console.log('modal-content inner component updateProduct() -> this.tempProduct.id', this.tempProduct.id);

      console.log('modal-content inner component updateProduct()  -> this.isNew', this.isNew);
      
      // 透過 this.isNew 布林值決定處理的 API 
      if ( this.isNew === false) {
        this.componentLoadingBtn = this.tempProduct.id; // 取得內元件資料 id 指給 loadingBtn
        let apiUrl = `${this.apiPath}${this.uuid}/admin/ec/product/${this.tempProduct.id}`;
        axios.patch(apiUrl, this.tempProduct)
          .then(res => {
            console.log('updateProduct() -> res', res);
            this.$emit('updata');
            this.componentLoadingBtn = ''; // 內元件操作按鈕 loading 動效在 ajax 後清除
          })
      } else {
        this.componentLoadingBtn = this.tempProduct.id; // 取得內元件資料 id 指給 loadingBtn  
        let apiUrl = `${this.apiPath}${this.uuid}/admin/ec/product`;
        axios.post(apiUrl, this.tempProduct)
          .then((res) => {
            console.log('postData() api res', res);
            this.$emit('updata');
            this.componentLoadingBtn = ''; // 內元件操作按鈕 loading 
          })
      }
    },
  },
});