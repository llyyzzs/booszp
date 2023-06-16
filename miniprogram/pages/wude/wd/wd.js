// pages/wude/wd/wd.ts
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentDate: new Date().toISOString().slice(0, 10), // 当前日期
    birthDate: new Date().toISOString().slice(0, 10), // 出生日期
  },
  onSubmit: function (e) {
    const formData = e.detail.value;
    // TODO: 将表单数据提交到后台进行处理
    wx.request({
      url: 'http://localhost:8800/user/updata',
      data:{
        id:app.globalData.user1.id,
        nickname:formData.nickname,
        address:formData.address,
        date:formData.date,
        email:formData.email,
        gender:formData.gender,
        phone:formData.phone,
        position:formData.position,
        school:formData.school
      },
      success:(res)=>{
        this.setData({
          user:res.data.data,   
        })
        console.log(this.data.user)
      }
    })
  },
  onDateChange: function (e) {
    this.setData({
      birthDate: e.detail.value,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function() {
    const app=getApp()
    wx.request({
      url: 'http://localhost:8800/user/userxx',
      data: {
        openid: app.globalData.user1.openid, 
      },
    success: res=> {
      // 解析返回数据
        if (res.data.data.gender === null) {
          console.log("gender为空");
          var  gender="男"
        }
        else{
          var gender=res.data.data.gender
        }
      if(gender=="男"){
          this.setData({
        user:res.data.data,
        birthDate:res.data.data.date,
        checked:true       
      })
      }
      else{
        this.setData({
          user:res.data.data,
          birthDate:res.data.data.date,
          checked:false
      })
    }
     },
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
    const app=getApp()
    app.globalData.user1=this.data.user
    console.log(app.globalData.user1)
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