const app = getApp()
const baseurl=app.globalData.baseurl
const token = wx.getStorageSync('token')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    baseurl: baseurl,
    isCollected1: false,
    isCollected2: false,
    isCollected3: false,
    defaultIndex: 0,
    page:1,
    city: '东莞',
    selector1: '不限',
    selector2: '不限',
    selectorItems1: [ '兼职', '全职','不限'],
    selectorItems2: ['不限', '3K', '5K', '8K', '10K', '12K', '14K', '15K', '18K', '20K'],
  },
  //搜索点击事件
  onInputChange: function (event) {
    this.setData({ keyword: event.detail.value })
  },
  //搜索
  onSearch: function (e) {
    console.log(this.data.keyword)
    this.getjob(1,this.data.keyword,this.data.type)
  },
  selectorChange1: function (e) {
    let i = e.detail.value;//获得选项的数组下标
    this.setData({
      type:i,
      selector1:this.data.selectorItems1[i]
    })
    if(i==="2"){
      this.getjob(1,this.data.keyword,this.data.city)
    }else{
      this.getjob(1,this.data.keyword,this.data.city,this.data.type)
    }
  },
  regionChange: function (e) {
    let str = e.detail.value[1].substring(0, 2);//获得选择的省市区
    this.setData({ city: str });
    console.log(this.data.city)
    this.getjob(1,this.data.keyword,this.data.city,this.data.type)
  },
  tiaozhuan: function (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/item/item?id=${id}`,
    })
  },
  // 获取招聘信息
  getjob(page,key,city,type) {
    wx.request({
      url: baseurl + '/bcyy-search-item/search/item/list',
      method: 'POST',
      data: {
        page: page,
        key:key,
        city:city,
        type:type
      },
      header: {
        token: wx.getStorageSync('token'),
        'content-type': 'application/json'
      },
      success: res => {
        let updatedList =[]
        if(page===1){
          updatedList=res.data.data;
        }else{
          updatedList = this.data.contentList.concat(res.data.data);
        }
        console.log(updatedList)
        app.globalData.ITEM=updatedList
        this.setData({
          contentList: updatedList,
          page: page + 1,
          loading: false,
        });
      }
    })
  },
  /**
* 生命周期函数--监听页面加载
*/
  loadMoreData() {
    if (this.data.loading) return; // 防止重复加载
    this.setData({
      loading: true
    });
    // 模拟异步加载更多数据
    setTimeout(() => {
      // 从服务器请求数据
      this.getjob(this.data.page)
    }, 100);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getjob(1,this.data.keyword,this.data.city,this.data.type);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 页面滚动到底部时的操作
    console.log("触底加载")
    this.loadMoreData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})