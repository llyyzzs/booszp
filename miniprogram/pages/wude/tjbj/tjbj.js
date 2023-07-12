// pages/wude/tjbj/tjbj.ts
const app = getApp()
const baseurl = app.globalData.baseurl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    note: {}
  },

  // 提交表单数据
  onSubmit: function (event) {
    const now = new Date(); // 创建一个 Date 实例，即当前时间
    const year = now.getFullYear(); // 获取当前年份
    const month = now.getMonth() + 1; // 获取当前月份（注意要加 1，因为月份下标从 0 开始）
    const date = now.getDate(); // 获取当天日期
    var timestamp = Date.parse(new Date());//时间戳
    console.log(timestamp)
    const fullDate = `${year}-${month}-${date}`; // 拼接为完整的日期字符串
    const formData = event.detail.value
    formData.date = timestamp
    if (this.data.note.id != null) {
      formData.id = this.data.note.id
    }
    console.log(formData)
    const token = wx.getStorageSync('token')
    wx.request({
      url: baseurl+'/note/update',
      method:'POST',
      data:formData,
      header:{
        'Authorization':'Bearer ' + wx.getStorageSync('token'),
        'content-type': 'application/json'
      },
      success:res=>{     
       console.log(res.data)
      }
    }) 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const noteStr = options.note
    const note = JSON.parse(noteStr)
    this.setData({
      note: note
    })
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