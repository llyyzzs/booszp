// pages/web-view/web-view.js
const app = getApp()
const baseurl = app.globalData.baseurl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseurl: baseurl,
    keywords: '',
    contentList: [], // 初始内容列表为空数组
    page: 1, // 当前页码
    pageSize: 10, // 每页数据量
    loading: false, // 是否正在加载数据标志位
    tags: "热门"
  },
  //获取导航栏
  gethandleNav(){
    wx.request({
      url: baseurl + '/bcyy-search-item/search/item/aggs',
      method: 'GET',
      data: {
        name:"tags",
        type:1
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
  //导航栏点击事件
  handleNavItemTap: function (e) {
    const tags = e.currentTarget.dataset.name
    console.log(tags)
    this.setData({
      tags:tags,
      contentList:{}
    })
    if(tags==="热门"){
      this.getjob(1)
    }
    else{
      this.getjob(1,tags)
    }
  },
  //搜索点击事件
  onInputChange: function (event) {
    this.setData({
      keywords: event.detail.value
    })
  },
  getjob(page,tags) {
    wx.request({
      url: baseurl + '/bcyy-search-item/search/item/list',
      method: 'POST',
      data: {
        page: page,
        tags:tags,
        type:1,
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
  onSearch: function (e) {
    console.log(this.data.keyword)
    wx.request({
      url: baseurl + '/bcyy-search-item/search/item/list',
      method: 'POST',
      data: {
        page: 1,
        key: this.data.keywords
      },
      header: {
        token: wx.getStorageSync('token'),
      },
      success: res => {
        this.setData({
          contentList: res.data.data,
        });
      }
    })
  },
  tiaozhuan: function (e) {
    // var id = contentList[e.currentTarget.dataset.id].id
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/item/item?id=${id}`,
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
      this.getjob(this.data.page,this.data.name)
    }, 100);
  },
  onLoad: function (options) {
    
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
    this.getjob(this.data.page);
    this.gethandleNav()
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
  onPullDownRefresh: function () {},

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
  onShareAppMessage: function () {},

})