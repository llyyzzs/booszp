// pages/company/company.ts
const app = getApp()
const baseurl = app.globalData.baseurl
const token = wx.getStorageSync('token')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: 113.941779,
    latitude: 22.540822,
    baseurl:baseurl,
    swiperList: [
      {
        imgUrl: 'https://img1.baidu.com/it/u=784327516,2527449485&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=653'
      },
      {
        imgUrl: 'https://img0.baidu.com/it/u=2177264689,1742004542&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500'
      },
      {
        imgUrl: 'https://img1.baidu.com/it/u=2288227515,3617152515&fm=253&fmt=auto&app=120&f=JPEG?w=667&h=500'
      },
      {
        imgUrl: 'https://img0.baidu.com/it/u=1480372863,3006933501&fm=253&fmt=auto&app=138&f=JPEG?w=660&h=396'
      },
      {
        imgUrl: 'https://img1.baidu.com/it/u=2046890312,3903612527&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500'
      },
      {
        imgUrl: 'https://img2.baidu.com/it/u=123601112,3361570788&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=314'
      }
    ],
    fuli: [
      { src: "../../image/时间.png", name: "9:00-18:00" },
      { src: "../../image/双休.png", name: "双休" },
      { src: "../../image/保险.png", name: "五险一金" },
      { src: "../../image/医疗.png", name: "医疗保险" },
      { src: "../../image/年终奖.png", name: "年终奖" },
      { src: "../../image/餐补.png", name: "餐补" },
      { src: "../../image/车.png", name: "免费班车" },
    ],
  },
  // 获取公司详情
  getcompany(id) {
    wx.request({
      url: baseurl + '/bcyy-company/company/get/detail',
      method: 'GET',
      data: { id: id },
      header: {
        token: wx.getStorageSync('token'),
      },
      success: res => {
        var currentDate = new Date();
        var yearDiff = currentDate.getFullYear() - new Date(res.data.data.information.time).getFullYear();
        console.log(res.data.data,yearDiff)
        this.setData({
          company:res.data.data,
          yearDiff:yearDiff
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id
    this.getcompany(id)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})