// pages/jl/jl.ts
const app = getApp()
const baseurl = app.globalData.baseurl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: "无",
    showDropdown: false,
    currentDate: new Date().toISOString().slice(0, 10), // 当前日期
    birthDate: new Date().toISOString().slice(0, 10), // 出生日期
  },
  toggleDropdown: function() {
    this.setData({
      showDropdown: !this.data.showDropdown
    });
  },
  getuser(){
    wx.request({
      url: baseurl + '/bcyy-user/user/getuser',
      method: 'GET',
      header: {
        token: wx.getStorageSync('token'),
      },
      success: res => {
        this.setData({
          user: res.data.data,
        })
        // 解析返回数据
        if (res.data.data.degree != "") {
          this.setData({
            selectedValue: res.data.data.degree
          })
        }
        else{
          this.setData({selectedValue:"无"})
        }
        if(res.data.data.birthday!=""){
          this.setData({birthDate:res.data.data.birthday})
        }
      },
    })
  },
  regionChange(e) {
    this.setData(
      {
        address: e.detail.value[0] + e.detail.value[1],
        province: e.detail.value[0],
        city: e.detail.value[1]
      }
    )
  },
  updata(formData) {
    wx.request({
      url: baseurl + '/bcyy-user/user/resume',
      method: 'POST',
      data: formData,
      header: {
        token: wx.getStorageSync('token'),
        'content-type': 'application/json'
      },
      success: res => {
        wx.showToast({
          title: res.data.msg,
          icon:res.statusCode==200?'success':'error'
        })
        console.log(res.data)
      }
    })
  },
  onSubmit: function (e) {
    var formData = e.detail.value;
    if (this.data.resume.id != null) {
      formData.resumeId = this.data.resume.id
    }
    console.log(formData)
    this.updata(formData)
  },
  onDateChange: function (e) {
    this.setData({
      birthDate: e.detail.value,
    });
  },
   // 获取简历信息
   getjl(){
    wx.request({
      url: baseurl+'/bcyy-user/user/getResume',
      method:'GET',
      data:{id:this.data.resume.id},
      header:{
        'token':wx.getStorageSync('token'),
      },
      success:res=>{    
        this.setData({
          resume:res.data.data
        }) 
       console.log(res.data)
      }
    }) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const resumeStr = options.resume
    const resume = JSON.parse(resumeStr)
    this.setData({
      resume: resume,
      user:app.globalData.user
    })
    this.getjl()
    this.getuser()
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