// pages/web-view/web-view.js
const app = getApp()
const baseurl = app.globalData.baseurl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseurl: baseurl,
    keyword: '',
    contentList: [], // 初始内容列表为空数组
    page: 1, // 当前页码
    pageSize: 10, // 每页数据量
    loading: false, // 是否正在加载数据标志位
    daohuang: [{
        id: 1,
        name: "热门"
      },
      {
        id: 2,
        name: "IT"
      },
      {
        id: 3,
        name: "餐饮"
      },
      {
        id: 4,
        name: "销售"
      },
      {
        id: 5,
        name: "娱乐"
      },
      {
        id: 6,
        name: "技术"
      },
      {
        id: 7,
        name: "运动"
      },
      {
        id: 8,
        name: "教育"
      }
    ],
    contentList: [{
      name: "产品经理",
      price: "",
      company: {},
      position: {},
      tags: [],
      type: "",
      jobtype: "",
    }],
    name: "热门"
  },
  //导航栏点击事件
  handleNavItemTap: function (e) {
    const name = e.currentTarget.dataset.name
    const filteredItems = this.data.contentList.filter((item) => item.type.includes(name));
    this.setData({
      name: name,
      filteredItems: filteredItems
    })
  },
  //搜索点击事件
  onInputChange: function (event) {
    this.setData({
      keyword: event.detail.value
    })
  },
  getjob(page) {
    const token = wx.getStorageSync('token')
    wx.request({
      url: baseurl + '/job/getAll',
      method: 'GET',
      data: {
        page: page
      },
      header: {
        'Authorization': 'Bearer ' + token,
      },
      success: res => {
        const updatedList = this.data.contentList.concat(res.data.data);
        const filteredItems = updatedList.filter((item) => item.type.includes("热门"));
        console.log(updatedList)
        app.globalData.ITEM=updatedList
        this.setData({
          contentList: updatedList,
          page: page + 1,
          loading: false,
          filteredItems: filteredItems
        });
      }
    })
  },
  onSearch: function (e) {
    console.log(this.data.keyword)
    const token = wx.getStorageSync('token')
    wx.request({
      url: baseurl + '/job/getAll',
      method: 'GET',
      data: {
        page: 1,
        keywords: this.data.keyword
      },
      header: {
        'Authorization': 'Bearer ' + token,
      },
      success: res => {
        this.setData({
          filteredItems: res.data.data,
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
      this.getjob(this.data.page)
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