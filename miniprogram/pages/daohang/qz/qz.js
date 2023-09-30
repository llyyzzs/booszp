// pages/daohang/qz/qz.ts
const app = getApp()
const baseurl = app.globalData.baseurl
const token = wx.getStorageSync('token')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    contentList: [],
    baseurl:baseurl,
    daohuang: [
      { id: 1, name: "热门" },
      { id: 2, name: "在家" },
      { id: 3, name: "日结" },
      { id: 4, name: "聊天员" },
      { id: 5, name: "直播" },
      { id: 6, name: "线上" },
      { id: 7, name: "副业" },
      { id: 8, name: "派单" }
    ],
    name:"热门",
    swiperList: [
      {
        imgUrl: '../../../image/兼职2.png'
      },
      {
        imgUrl: '../../../image/兼职4.png'
      },
      {
        imgUrl: '../../../image/兼职5.png'
      },
      {
        imgUrl: '../../../image/兼职6.png'
      }
    ],
  },
  
  //搜索点击事件
  onInputChange: function (event) {
    this.setData({ keyword: event.detail.value })
  },
  onSearch: function (e) {
    console.log(this.data.keyword)
    this.getjob(1,this.data.keyword)
  },
   //获取导航栏
   gethandleNav(){
    wx.request({
      url: baseurl + '/bcyy-search-item/search/item/aggs',
      method: 'GET',
      data: {
        name:"tags",
        type:0
      },
      header: {
        token: wx.getStorageSync('token'),
      },
      success: res => {
        let daohuang=["热门"].concat(res.data.data)
        this.setData({
          nav:daohuang
        });
        console.log(this.data.nav)
      }  
    })
  },
  tiaozhuan: function (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/item/item?id=${id}`,
    })
  },
  handleNavItemTap: function (e) {
    const name = e.currentTarget.dataset.name
    this.biaoqian(name)
  },
  biaoqian:function(name){
    this.setData({
      name: name,
    })
    if(name==="热门"){
      this.getjob(1)
    }else{
      this.getjob(1,name)
    }
  },
  // 获取招聘信息
  getjob(page,key,tags) {
    wx.request({
      url: baseurl + '/bcyy-search-item/search/item/list',
      method: 'POST',
      data: {
        page: page,
        tags:tags,
        type:0,
        key:key
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
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getjob(this.data.page);
    this.gethandleNav()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 页面滚动到底部时的操作
    console.log("触底加载")
    this.loadMoreData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})