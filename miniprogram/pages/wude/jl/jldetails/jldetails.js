// pages/jl/jl.ts
const app=getApp()
const baseurl=app.globalData.baseurl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentDate: new Date().toISOString().slice(0, 10), // 当前日期
    birthDate: new Date().toISOString().slice(0, 10), // 出生日期
  },
  onSubmit: function (e) {
    var formData = e.detail.value;
    formData.id=this.data.JL.id;
    formData.openid=(app.globalData.user1.openid)
    this.setData({JL:formData})
    // TODO: 将表单数据提交到后台进行处理
    // const token = wx.getStorageSync('token')
    // wx.request({
    //   url: baseurl+'/resume/update',
    //   method:'POST',
    //   data:formData,
    //   header:{
    //     'Authorization':'Bearer ' + token,
    //     'content-type': 'application/json'
    //   },
    //   success:res=>{     
    //    console.log(res.data)
    //   }
    // })
  },
  onDateChange: function (e) {
    this.setData({
      birthDate: e.detail.value,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {
    const resumeStr = options.resume
    const resume = JSON.parse(resumeStr)
    console.log(resume)
    this.setData({
      resume: resume
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady:function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide:function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload:function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh:function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom:function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage:function() {

  }
})