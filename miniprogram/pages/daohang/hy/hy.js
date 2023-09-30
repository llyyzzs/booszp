// pages/daohang/hy/hy.ts
const app = getApp()
const baseurl = app.globalData.baseurl
const token = wx.getStorageSync('token')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "热门",
    keywords: "",
    page: 1,
    baseurl: baseurl,
    companyList: [],
  },
  // 触底加载
  loadMoreData() {
    if (this.data.loading) return; // 防止重复加载
    this.setData({
      loading: true,
      page: this.data.page + 1
    });
    // 模拟异步加载更多数据
    setTimeout(() => {
      // 从服务器请求数据
      this.getcompany(this.data.page)
    }, 100);
  },
  //点击导航栏
  handleNavItemTap: function (e) {
    const name = e.currentTarget.dataset.name
    this.qiehuan(name)
  },
  qiehuan(name) {
    if(name==="热门"){
      this.getcompany(1)
    }else{
      this.getcompany(1,this.data.keywords,name)
    }
    this.setData({
      name: name,
    })
  },
  //获取导航栏
  gethandleNav(){
    wx.request({
      url: baseurl + '/bcyy-search-item/search/company/aggs',
      method: 'GET',
      data: {
        name:"tags"
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
  //跳转到公司详情
  tiaozhuan: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../../company/company?id=${id}`,
    })
  },
  //搜索点击事件
  onInputChange: function (event) {
    this.setData({ keywords: event.detail.value })
  },
  getcompany(page,key,tags) {
    wx.request({
      url: baseurl + '/bcyy-search-item/search/company/list',
      method: 'POST',
      data: {
        key: key,
        page: page,
        tags:tags
      },
      header: {
        token: wx.getStorageSync('token'),
        'content-type': 'application/json'
      },
      success: res => {
        let companyList=[]
        if(page===1){
          companyList=res.data.data
        }else{
          companyList=this.data.companyList.concat(res.data.data)
        }
        this.setData({
          companyList: companyList,
        })
      }
    })
  },
  onSearch: function (e) {
    console.log(this.data.keywords)
    this.getcompany(1,this.data.keywords)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.onSearch()
    this.gethandleNav()
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