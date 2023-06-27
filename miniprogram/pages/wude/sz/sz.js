// pages/jl/jl.ts
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
    var formData = e.detail.value;
    formData.id=this.data.JL.id;
    formData.openid=(app.globalData.user1.openid)
    this.setData({JL:formData})
    // TODO: 将表单数据提交到后台进行处理
    wx.request({
      url: '/jl/savejl', // 请求后端的 URL
      method: 'POST',
      data:  JSON.stringify(this.data.JL),
      header: {
        'content-type': 'application/json'  // 将请求的数据格式设置为 JSON
      },
      success:(res)=> {
        // 处理请求成功的响应结果
        this.setData({
          JL:res.data.data
        })
        console.log(this.data.JL)
      },
      fail(err) {
        // 处理请求失败的响应结果
        
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
    wx.request({
      url: '/jl/findjl',
      data: {
        openid: app.globalData.user1.openid, 
      },
    success: res=> {
      // 解析返回数据
        if (res.data.data.gender === null) {
          var  gender="男"
        }
        else{
          var gender=res.data.data.gender
        }
      if(gender=="男"){
          this.setData({
            JL:res.data.data,
            birthDate:res.data.data.date,
            checked:true       
      })
      }
      else{
        this.setData({
            JL:res.data.data,
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