// pages/wude/tjbj/tjbj.ts
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    note:{}
  },

  // 提交表单数据
  onSubmit: function(event) {
    const now = new Date(); // 创建一个 Date 实例，即当前时间
    const year = now.getFullYear(); // 获取当前年份
    const month = now.getMonth() + 1; // 获取当前月份（注意要加 1，因为月份下标从 0 开始）
    const date = now.getDate(); // 获取当天日期
    const fullDate = `${year}-${month}-${date}`; // 拼接为完整的日期字符串
    const formData = event.detail.value
    formData.date=fullDate
    app.globalData.note=formData
    // TODO：将表单数据保存到数据库中，跳转到便签列表页面等等操作
    // wx.request({
    //   url: 'http://localhost:8800/user/savebj', // 请求后端的 URL
    //   method: 'GET',
    //   data: formData,
    //   header: {
    //     'content-type': 'application/json' // 将请求的数据格式设置为 JSON
    //   },
    //   success(res) {
    //     // 处理请求成功的响应结果
    //     console.log(res.data)
    //   },
    //   fail(err) {
    //     // 处理请求失败的响应结果
    //     console.error(err)
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const noteStr = options.note
    const note = JSON.parse(noteStr)
    this.setData({ 
      note:note
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