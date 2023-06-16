// pages/sc/sc.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  tiaozhuan:function(e){
    wx.navigateTo({
      url: '/pages/item/item?item',
    })
    var app=getApp()
    var id=e.currentTarget.dataset.id
    var finditem=this.data.ITEM.find(item=>item.id===id)
    app.globalData.item=finditem
    console.log(finditem) 
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:function() {
    wx.request({
      url: 'http://localhost:8800/text/findsc',
      success: res=> {
        this.setData({
          ITEM: res.data.data,
        });
        console.log(this.data.sc)
      }
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