// pages/news/news.js
const app = getApp()
const baseurl = app.globalData.baseurl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseurl: app.globalData.baseurl,
    myAvatar:app.globalData.user1.avatar,
    // 消息列表
    messageList: [],
    // 输入框内容
    inputVal: '',
    // 记录scroll-view的生命周期id，用于控制滚动到底部
    toView: 'dibu',
    userID: "",
    id: "",
    otherAvatar:"",
  },
  /**
   * 输入框输入事件
   */
  inputText: function (event) {
    this.setData({
      inputVal: event.detail.value
    });
  },
  messageRead:function(){
    wx.request({
      url: baseurl+'/chat/messagesRead',
      data:{
        conversation_id: this.data.id
      },
      header: {
        'Authorization':'Bearer ' + wx.getStorageSync('token'),
      },
      success:(res)=>{
        this.getMessage(this.data.id)
      }
    })
  },
  getMessage: function (id) {
    wx.request({
      url: baseurl+'/chat/getMessages',
      data: {
        conversation_id: id
      },
      header: {
        'Authorization':'Bearer ' + wx.getStorageSync('token'),
      },
      success: (res) => {
        this.setData({
          messageList: res.data.data,
          inputVal: ""
        })
      }
    })
  },
  sendMessage: function (content,type) {
    let message = {
      conversation_id: this.data.id,
      type: type,
      content: content,
    };
    wx.request({
      url: baseurl+'/chat/sendMessage',
      method:'POST',
      header: {
        'Authorization': 'Bearer ' + wx.getStorageSync('token'),
      },
      data: message,
      success: res => {
        this.getMessage(this.data.id)
      }
    })
  },
  /**
   * 发送消息事件
   */
  sendTextMessage: function () {
    if (this.data.inputVal === "") {
      return;
    }
    this.sendMessage(this.data.inputVal,'text')
  },

  /**
   * 选择图片事件
   */
  chooseImage: function () {
    wx.chooseMedia({
      count: 1,
      success: (res) => {
        wx.uploadFile({
          filePath: res.tempFiles[0].tempFilePath,
          name: 'file',
          url: baseurl+'/file/upload',
          header:{
            'Authorization': 'Bearer ' + wx.getStorageSync('token'),
          },
          success:(data)=>{
            res=JSON.parse(data.data)
            console.log(res.data)
            this.sendMessage(res.data,'image')
          }
        })
      },
    });
    app.globalData.messageList = this.data.messageList
  },
  previewImage:function(event){
    let currentUrl = [event.currentTarget.dataset.src]
    wx.previewImage({
      urls:currentUrl
    })
  },
  startTimer: function () {
    const that = this;
    const interval = 20000; // 定时器间隔，单位为毫秒

    // 设置定时器
    const timer = setInterval(function () {
      that.messageRead(that.data.id); // 发送网络请求的函数
    }, interval);

    this.setData({
      timer: timer
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      id,avatar
    } = options;
    this.setData({
      id: id,
      otherAvatar: avatar,
      myAvatar:app.globalData.user1.avatar,
    })
    this.getMessage(id)
    this.startTimer()
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
    this.setData({
      userID: app.globalData.user1.id
    })
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
    clearTimeout(this.data.timer)
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