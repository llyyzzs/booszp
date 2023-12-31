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
    details:'选择',
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
          details: res.address+res.name,
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
  },
  getCompany(){
    wx.request({
      url: baseurl + '/bcyy-company/company/get/detail',
      method: 'GET',
      data: {id:app.globalData.user.companyId},
      header: {
        token: wx.getStorageSync('token'),
      },
      success: res => {
        console.log(res.data.data)
        this.setData({
          company:res.data.data,
          avatar:res.data.data.avatar,
          birthDate:res.data.data.information.time,
          details:res.data.data.address.details
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
        this.uploadImage(res.tempFilePaths[0])
      },
    });
  },
  // 上传图片
  uploadImage(imagePath){ 
    wx.uploadFile({
      url: baseurl + '/bcyy-company/company/imageUpload',
      method: 'POST',
      header: {
        token: wx.getStorageSync('token'),
      },
      filePath: imagePath,
      name:"multipartFile",
      success:(res) => {
        let avatarlur=JSON.parse(res.data) 
        console.log(avatarlur,8)
        this.setData({
          avatar:avatarlur.data,
        })
        console.log(this.data.avatar)
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
      url: baseurl + '/bcyy-company/company/addcompany',
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
    formData.avatar=this.data.avatar;
    formData.address=this.data.company.address;
    formData.address.details=this.data.details;
    formData.address.position.longitude=this.data.longitude;
    formData.address.position.latitude=this.data.latitude;
    if(this.data.company){
      formData.companyId=this.data.company.id
    }
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
    this.getCompany();
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