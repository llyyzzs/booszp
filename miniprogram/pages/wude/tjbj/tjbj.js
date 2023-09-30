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
  //更新笔记
  update(formData){
    wx.request({
      url: baseurl+'/bcyy-user/user/note',
      method:'POST',
      data:formData,
      header:{
        'token':wx.getStorageSync('token'),
        'content-type': 'application/json'
      },
      success:res=>{     
       console.log(res.data)
       wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 2000
      });
      }
    }) 
  },
  // 提交表单数据
  onSubmit: function (event) {
    const formData = event.detail.value
    if (this.data.note.id != null) {
      formData.noteId = this.data.note.id
    }
    console.log(formData)
    this.update(formData)
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