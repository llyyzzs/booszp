const app=getApp()
const baseurl=app.globalData.baseurl
const token=wx.getStorageSync('token')
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
  addjob:function(){
    wx.navigateTo({
      url: '../../pages/wude/job/job',
    })
  },
  addcompany(){
    wx.navigateTo({
      url: '../../pages/wude/addcompany/addcompany',
    })
  },
  sz:function(){
    wx.navigateTo({
      url: '../../pages/wude/sz/sz',
    })
  },
  viewresume(){
    wx.navigateTo({
      url: '../../pages/wude/viewresume/viewresume',
    })
  },
  getuser(){ 
    wx.request({
      url: baseurl+'/bcyy-user/user/my',
      method:'GET',
      header:{
        'token':wx.getStorageSync('token'),
      },
      success:res=>{
        this.setData({
          user:res.data.data,
          hasLogin:true
       })
       app.globalData.user=res.data.data;
       console.log(this.data.user)
      } 
    }) 
  },
  login(){
    wx.getUserProfile({
      desc: '必须授权才能使用',
      success:res=>{
      wx.login({
        success:(res)=>{
          if(res.code){
            wx.request({
              // url: baseurl+'/user/login',
              url:baseurl+'/bcyy-user/user/login',
              method:'GET',
              header:{
                'content-type':'application/x-www-form-urlencoded',
              },
              data: {
                code: res.code,
              },
              success:res=>{
              wx.setStorageSync('token', res.data.data)
              console.log(res.data.data)
              this.getuser()              
              this.getcollection()
              this.getCommunicate()
              this.getjobResume()
              // this.boosgetjobResume()             
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
    app.globalData.user=null,
    this.setData({
      user:null,
      hasLogin:false
    })
    console.log(this.data.user)
  },
  // 获取用户收藏
  getcollection() {
    wx.request({
      url: baseurl + '/bcyy-user/user/getCollect',
      method: 'GET',
      header: {
        token: wx.getStorageSync('token'),
      },
      success: res => {
        if (res.statusCode!=200){
          this.setData({
            sc:0
          })
          return
        }
        this.setData({
          sc:res.data.data.length
        })
      }
    })
  
  },
  //获取沟通
  getCommunicate() {
    wx.request({
      url: baseurl + '/bcyy-user/user/getCommunicate',
      method: 'GET',
      header: {
        token: wx.getStorageSync('token'),
      },
      success: res => {
        if (res.statusCode!=200){
          this.setData({
            gt:0
          })
          return
        }
        app.globalData.communicate=res.data
        console.log(app.globalData.communicate)
        this.setData({
          gt:res.data.length
        })
      }
    })
  },
  // 获取简历投递状态
  getjobResume() {
    console.log("获取简历投递状态")
    wx.request({
      url: baseurl + '/bcyy-user/user/getDeliver',
      method: 'GET',
      header: {
        token: wx.getStorageSync('token'),
      },
      success: res => 
      {if (res.statusCode!=200){
        this.setData({
          bm:0
        })
        return
      }
        console.log(res.data.data)
        this.setData({
          bm:res.data.data.length
        })
      }
    })
    
  },
  // 获取简历投递状态
  boosgetjobResume() {
    console.log("获取简历投递状态")
    wx.request({
      url: baseurl + '/jobResume/bossGet',
      method: 'GET',
      header: {
        token: wx.getStorageSync('token'),
      },
      success: res => {
        if (res.statusCode!=200){
          this.setData({
            toudi:0
          })
          return
        }
        console.log(res.data.data)
        this.setData({
          toudi:res.data.data.length
        })
      }
    })
    
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
    this.getuser()
      this.getcollection()
      this.getCommunicate()
      this.getjobResume()
      // this.boosgetjobResume()
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