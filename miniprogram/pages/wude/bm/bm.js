// pages/wude/gj/gj.ts
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    tabList: ['全部', '已报名','待沟通','待面试', '已面试','已通过'], // 标签筛选项
    activeTabIndex: 0, // 当前激活的标签索引
  },
  onTabTap(e) {
    const index = e.currentTarget.dataset.index
    const state = this.data.tabList[index]
    const filteredOrders = this.data.orders.filter(order => {
      if (state === '全部') {
        return true
      } else {
        return order.state === state
      }
    })
    this.setData({
      activeTabIndex: index,
      filteredOrders: filteredOrders,
    })
  },
  onTabScroll(e) {
    // 左右滑动时设置相关样式
    console.log('onTabScroll', e);
  },
  onOrderTap(e) {
    const orderId = e.currentTarget.dataset.orderid
    wx.navigateTo({
      url: `/pages/order-detail/order-detail?id=${orderId}`
    })
  },
  tiaozhuan:function(e){
    wx.navigateTo({
      url: '/pages/item/item?item',
    })
    var id=e.currentTarget.dataset.id
    var finditem=this.data.orders.find(item=>item.id===id)
    app.globalData.item=finditem
    console.log(finditem) 
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const ITEM=app.globalData.ITEM.filter((item) => item.state!="未报名");
    this.setData({
      orders:ITEM,
      filteredOrders:ITEM,
    })
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