// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    const baseurl = this.globalData.baseurl
    const token = wx.getStorageSync('token')
    wx.request({
      url: baseurl+'/user/get',
      method:'GET',
      header:{
        'Authorization':'Bearer ' + token,
      },
      success:(res)=>{
        this.globalData.user=res.data.data
      }
    })
  },
  globalData: {
    userInfo: null,
    item:'',
    user:'',
    note:null,
    noteid:null,
    contactId:null,
    messageList:null,
    avatar:null,
    ITEM:null,
    company:null,
    baseurl:'http://127.0.0.1:8800',
    baseWsUrl:'wss://294u2z7697.imdo.co'
  }
})
