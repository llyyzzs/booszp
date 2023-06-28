const app=getApp()
const baseurl=app.globalData.baseurl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasLogin:true,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') ,// 如需尝试获取用户信息可改为false,
  },
  top:function(){
    wx.navigateTo({
      url: '../../pages/wude/wd/wd',
    })
  },
  bm:function(){
    wx.navigateTo({
      url: '../../pages/wude/bm/bm',
    })
  },
  tiaozhuan:function(){
    wx.navigateTo({
      url: '../../pages/wude/sc/sc',
    })
  },
  dd:function(){
    wx.navigateTo({
      url: '../../pages/wude/dd/dd',
    })
  },
  jl:function(){
    wx.navigateTo({
      url: '../../pages/wude/jl/jllist/jllist',
    })
  },
  gj:function(){
    wx.navigateTo({
      url: '../../pages/wude/gj/gj',
    })
  },
  bj:function(){
    wx.navigateTo({
      url: '../../pages/wude/bj/bj',
    })
  },
  sz:function(){
    wx.navigateTo({
      url: '../../pages/wude/sz/sz',
    })
  },
  login(){
    var that=this
    wx.getUserProfile({
      desc: '必须授权才能使用',
      success:res=>{
      wx.login({
        success:(res)=>{
          if(res.code){
            wx.request({
              url: baseurl+'/user/login',
              method:'GET',
              header:{
                'content-type':'application/x-www-form-urlencoded',
              },
              data: {
                code: res.code,
              },
              success(res){
              wx.setStorageSync('token', res.data.data)
              console.log(res.data.data)
              const token=wx.getStorageSync('token') 
              wx.request({
                url: baseurl+'/user/get',
                method:'GET',
                header:{
                  'Authorization':'Bearer ' + token,
                },
                success(res){
                  app.globalData.user1=res.data.data
                  that.setData({
                    user1:res.data.data,
                    hasLogin:true
                 })
                 console.log(that.data.user1)
                } 
              })    
              },
            })        
          }
        }
      })
      },
      fall:res=>{
        console.log('失败',res)
      }
    })
  },
  handleLogout: function() {
    // 清除缓存并跳转到登录页面
    wx.clearStorageSync()
    app.globalData.user1=null,
    this.setData({
      user1:null,
      hasLogin:false
    })
    console.log(this.data.user1)
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad:function() {
    // 检查用户是否已经登录
    if(wx.getStorageSync('token')!=null){
    this.setData({
      hasLogin: true,
    })

    }
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
    this.setData({
      user1:app.globalData.user1
    })
    wx.request({
      url: '/text',
      data: {
        keyword:'', 
      },   
    success: res=> {
      // 解析返回数据
      const item1 = res.data.data;
      app.globalData.ITEM=item1
      const itembm =item1.filter(order => {     
          return order.state ==='已报名'   
      })
      const itemgt =item1.filter(order => {     
        return order.state ==='待沟通'   
      })
      const itemsc =item1.filter(order => {     
        return order.zt ===true   
      })
      // 将新闻列表存储在小程序的数据模型中
      this.setData({
        bm:itembm.length,
        gt:itemgt.length,
        sc:itemsc.length,
      });
    }
    })
    console.log(this.data.user1)
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