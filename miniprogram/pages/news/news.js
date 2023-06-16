// pages/news/news.ts
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 消息列表
    messageList: [],
    // 输入框内容
    inputVal: '',
    // 记录scroll-view的生命周期id，用于控制滚动到底部
    toView: 'dibu',
    // 记录每个联系人的聊天信息
  },
  /**
   * 输入框输入事件
   */
  inputText: function (event) {
    this.setData({
      inputVal: event.detail.value
    });
  },

  /**
   * 发送消息事件
   */
  sendMessage: function () {
    let message = {
      id: app.globalData.user1.openid,
      type: 'text',
      content: this.data.inputVal,
    };
    if(this.data.inputVal===""){
      return;
    }
    this.data.messageList.push(message);  
    this.setData({
      messageList: this.data.messageList,
      inputVal: '',
      toView: 'msg-' + message.id, // 发送消息后滚动到底部
    });
    app.globalData.messageList=this.data.messageList
  },

  /**
   * 选择图片事件
   */
  chooseImage: function () {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        let message = {
          id: app.globalData.user1.openid,
          type: 'image',
          content: res.tempFilePaths[0],
        };
        this.data.messageList.push(message);       
        this.setData({
          messageList: this.data.messageList,
          toView: 'msg-' + message.id, // 发送图片后滚动到底部
        });
      },
    });
    app.globalData.messageList=this.data.messageList
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取 messageList 和 contact 参数
    const messageList = JSON.parse(options.messageList);
    this.setData({ 
      messageList:messageList,
      avatar:app.globalData.avatar,
    })
    console.log(this.data.messageList,this.data.avatar)
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
    this.setData({openid:app.globalData.user1.openid})
    
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