// pages/daohang/gx/gx.ts
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  tiaozhuan: function (e) {
    wx.navigateTo({
      url: '/pages/item/item?item',
    })
    var id = e.currentTarget.dataset.id
    var finditem = this.data.ITEM.find(item => item.id === id)
    app.globalData.item = finditem
    console.log(finditem)
  },
  qiehuan: function () {
    // 获取ITEM数组长度
    const len = app.globalData.ITEM.length;
    // 定义一个空数组来存储随机选择出来的值
    const arr = [];
    // 循环10次，每次随机选择一个ITEM的值并添加到数组中
    for (let i = 0; i < 10; i++) {
      const index = Math.floor(Math.random() * len);
      arr.push(app.globalData.ITEM[index]);
    }
    this.setData({
      ITEM: arr,
    })
    console.log(this.data.ITEM)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.qiehuan()
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