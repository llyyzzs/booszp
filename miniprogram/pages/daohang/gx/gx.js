// pages/daohang/gx/gx.ts
const app = getApp()
const baseurl = app.globalData.baseurl
const token = wx.getStorageSync('token')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,

  },
  tiaozhuan: function (e) {
    // var id = contentList[e.currentTarget.dataset.id].id
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/item/item?id=${id}`,
    })
  },
  // 获取招聘信息详情
  jobdetails(id) {
    wx.request({
      url: baseurl + '/job/get',
      method: 'GET',
      data: { id: id },
      header: {
        'Authorization': 'Bearer ' + wx.getStorageSync('token'),
      },
      success: res => {
        this.setData({
          description:res.data.data.description
        });
      }
    })
  },
  // 切换
  qiehuan(){
    this.getjob(this.data.page)
  },
  getjob(page) {
    wx.request({
      url: baseurl + '/job/getAll',
      method: 'GET',
      data: { page: page },
      header: {
        'Authorization': 'Bearer ' + wx.getStorageSync('token'),
      },
      success: res => {
        // this.jobdetails(res.data.data[0].id)
        this.setData({
          contentList: res.data.data,
          page: page + 1,
          loading: false
        });
      }
    })
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
    this.getjob(this.data.page)
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