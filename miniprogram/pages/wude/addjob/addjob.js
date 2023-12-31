// pages/jl/jl.ts
const app = getApp()
const baseurl = app.globalData.baseurl
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: "无",
    currentDate: new Date().toISOString().slice(0, 10), // 当前日期
    birthDate: new Date().toISOString().slice(0, 10), // 出生日期
  },
  regionChange(e) {
    this.setData(
      {
        address: e.detail.value[0] + e.detail.value[1]+e.detail.value[2],
        province: e.detail.value[0],
        city: e.detail.value[1],
        region: e.detail.value[2]
      }
    )
  },
  addjob(formData) {
    wx.request({
      url: baseurl + '/bcyy-item/item/additem',
      method: 'POST',
      data: formData,
      header: {
        token: wx.getStorageSync('token'),
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res.data)
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000
        });
      }
    })
  },
  onSubmit: function (e) {
    var formData = e.detail.value;
    if(this.data.id!=null){
      formData.itemId=this.data.id
    }
    formData.label=formData.label.split(",")
    console.log(formData)
    this.addjob(formData)
  },
  onDateChange: function (e) {
    this.setData({
      birthDate: e.detail.value,
    });
  },
  //获取招聘信息详情
  getjob(id) {
    wx.request({
      url: baseurl + '/bcyy-item/item/get/detail',
      method: 'GET',
      data: {
        id: id
      },
      header: {
        token: wx.getStorageSync('token'),
      },
      success: res => {    
        this.setData({
          job: res.data.data,
        });
      }
    })
    console.log(this.data.job) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {id}=options
    console.log(id)
    this.setData({
      id:id
    })
    if(id!=null){
       this.getjob(id)
    }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})