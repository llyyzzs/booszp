// pages/daohang/hy/hy.ts
const app = getApp()
const baseurl = app.globalData.baseurl
const token = wx.getStorageSync('token')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    daohuang: [
      { id: 1, name: "热门" },
      { id: 0, name: "互联网" },
      { id: 2, name: "国有企业" },
      { id: 3, name: "行业巨头" },
      { id: 4, name: "中小企业" },
      { id: 5, name: "众创空间" },
      { id: 6, name: "高新技术企业" },
      { id: 7, name: "上市" },
    ],
    name: "热门",
    keywords: "",
    page: 1,
    baseurl: baseurl,
    company: [],

  },
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
  handleNavItemTap: function (e) {
    const name = e.currentTarget.dataset.name
    this.qiehuan(name)
  },
  qiehuan(name) {
    const filteredItems = this.data.company.filter((item) => item.industry.includes(name));
    this.setData({
      name: name,
      filteredItems: filteredItems
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
  getcompany(page) {
    wx.request({
      url: baseurl + '/company/search',
      method: 'GET',
      data: {
        keywords: this.data.keywords,
        page: page
      },
      header: {
        'Authorization': 'Bearer ' + wx.getStorageSync('token'),
      },
      success: res => {
        const company=this.data.company.concat(res.data.data)
        this.setData({
          company: company,
        })
        this.qiehuan(this.data.name)
      }
    })
  },
  onSearch: function (e) {
    console.log(this.data.keywords)
    this.getcompany(1)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.onSearch()
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