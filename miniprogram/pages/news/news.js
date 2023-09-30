// pages/news/news.js
const app = getApp()
const baseurl = app.globalData.baseurl
const baseWsUrl = app.globalData.baseWsUrl
let socketTask = undefined
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseurl: app.globalData.baseurl,
    myAvatar: app.globalData.user.avatar,
    userId:app.globalData.user.openid,
    // 消息列表
    messageList: [],
    // 输入框内容
    inputVal: '',
    // 记录scroll-view的生命周期id，用于控制滚动到底部
    toView: 'dibu',
    userID: "",
    id: "",
    otherAvatar: "",
  },
  /**
   * 输入框输入事件
   */
  inputText: function (event) {
    this.setData({
      inputVal: event.detail.value
    });
  },
  getScollBottom: function () {
    this.setData({
      toView: 'dibu'
    })
  },
  // messageRead: function () {
  //   wx.request({
  //     url: baseurl + '/bcyy-chat/chat/getMessage',
  //     data: {
  //       roomId: this.data.id
  //     },
  //     header: {
  //       token: wx.getStorageSync('token'),
  //     },
  //     success: (res) => {
  //       this.getMessage(this.data.id)
  //     }
  //   })
  // },
  getMessage: function (id) {
    wx.request({
      url: baseurl + '/bcyy-chat/chat/getMessage',
      data: {
        roomId: id
      },
      header: {
        token: wx.getStorageSync('token'),
      },
      success: (res) => {
        if (res.data.data == null) {
          return
        }
        if (res.data.data.length > 0) {
          this.setData({
            messageList: res.data.data,
          }, () => {
            this.getScollBottom()
          })
        }
        let message=this.data.messageList[0]
        if(message){
        if(message.receiverId!=app.globalData.user.openid){
          this.setData({
            receiverId:message.receiverId
          })
        }else{
          this.setData({
            receiverId:app.globalData.user.openid
          })
        }
      }
        this.setData({
          messageList: res.data.data,
          inputVal: ""
        })
        console.log(this.data.messageList)
      }
    })
  },
  //发送消息
  sendMessage: function (content, type) {
    let message = {
      chatRoomId: this.data.id,
      type: type,
      content: content,
      receiverId: this.data.receiverId,
      senderId: app.globalData.user.openid,
    };
    wx.request({
      url: baseurl + '/bcyy-chat/chat/send',
      method: 'POST',
      header: {
        token: wx.getStorageSync('token'),
      },
      data: message,
      success: res => {
        this.getMessage(this.data.id)
        this.getScollBottom()
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
    this.sendMessage(this.data.inputVal, 0)
    this.setData({
      inputVal: ""
    })
  },

  /**
   * 选择图片事件
   */
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
        this.setData({
          avatar:avatarlur.data,
        })
        console.log(this.data.avatar)
        this.sendMessage(this.data.avatar,1)
      }
    })
    app.globalData.messageList = this.data.messageList
  },
  // chooseImage: function () {
  //   wx.chooseMedia({
  //     count: 1,
  //     success: (res) => {
  //       wx.uploadFile({
  //         url: baseurl + '/bcyy-company/company/imageUpload',
  //         method: 'POST',
  //         header: {
  //           token: wx.getStorageSync('token'),
  //         },
  //         filePath: imagePath,
  //         name:"multipartFile",
  //         success:(res) => {
  //           let avatarlur=JSON.parse(res.data) 
  //           console.log(avatarlur,8)
  //           this.setData({
  //             avatar:avatarlur.data,
  //           })
  //           console.log(this.data.avatar)
  //         }
  //       })
  //     },
  //   });
  //   app.globalData.messageList = this.data.messageList
  // },
  previewImage: function (event) {
    let currentUrl = [event.currentTarget.dataset.src]
    wx.previewImage({
      urls: currentUrl
    })
  },
  startTimer: function () {
    const interval = 20000; // 定时器间隔，单位为毫秒
    // 设置定时器
    const timer = setInterval(function () {
      socketTask.send({
        data: "heartbeat",
        success: (res) => {
          console.log(res)
        }
      }); // 发送心跳请求
    }, interval);
    this.setData({
      timer: timer
    });
  },
  clearTimer: function () {
    const timer = this.data.timer;
    if (timer) {
      clearInterval(timer);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      id,
      avatar,
      receiverId
    } = options;
    this.setData({
      id: id,
      otherAvatar: avatar,
      myAvatar: app.globalData.user.avatar,
      receiverId:receiverId
    })
    this.getMessage(id)
    socketTask = wx.connectSocket({
      url: baseWsUrl+'/bcyy-webSocket/webSocket/'+app.globalData.user.openid,
      header: {
        token: wx.getStorageSync('token'),
      },
      success: (res) => {
        console.log(res);
      },
      fail: (res) => console.log(res)
    })
    socketTask.onMessage((res) => {
      console.log(res)
      this.getMessage(id);
    })
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
      userID: app.globalData.user.id
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
  onUnload() {    // 页面卸载时清除定时器
    this.clearTimer();
    socketTask.close({
      data: 'close'
    })
    console.log("关闭连接")
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