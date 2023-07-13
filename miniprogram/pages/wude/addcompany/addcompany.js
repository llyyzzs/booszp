// pages/jl/jl.ts
const app = getApp()
const baseurl = app.globalData.baseurl
const token = wx.getStorageSync('token')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '选择地点',
    currentDate: new Date().toISOString().slice(0, 10), // 当前日期
    birthDate: new Date().toISOString().slice(0, 10), // 出生日期
  },
  // 选择地址
  chooseLocation: function () {
    var that = this;
    wx.chooseLocation({
      success: res=> {
        console.log(res)
        that.setData({
          name: res.name,
          address: res.address,
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
  },
  /**
   * 选择图片事件
   */
  chooseImage: function () {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        this.setData({avatar:res.tempFilePaths[0]})
        console.log(this.data.avatar)
        this.uploadImage(res.tempFilePaths[0])
      },
    });
  },
  uploadImage(imagePath){
    const token = wx.getStorageSync('token')       
    wx.uploadFile({
      url: baseurl + '/file/upload',
      method: 'POST',
      header: {
        'Authorization': 'Bearer ' + wx.getStorageSync('token'),
      },
      filePath: imagePath,
      name:"file",
      success:(res) => {
        const json=JSON.parse(res.data)
        this.setData({
          avatarurl:json.data
        })
      }
    })
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
  addcompany(formData) {
    wx.request({
      url: baseurl + '/company/update',
      method: 'POST',
      data: formData,
      header: {
        'Authorization': 'Bearer ' + wx.getStorageSync('token'),
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
    this.uploadImage(this.data.avatar)
    formData.address = {};
    formData.address.name = this.data.address;
    formData.address.latitude = this.data.latitude;
    formData.address.longitude=this.data.longitude;
    formData.avatar=this.data.avatarurl
    console.log(formData)
    this.addcompany(formData)
  },
  onDateChange: function (e) {
    this.setData({
      birthDate: e.detail.value,
    });
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
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