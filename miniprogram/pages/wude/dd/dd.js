// pages/wude/gj/gj.ts
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [
      {id:1,status:"待确认",zw:"产品经理",xz:"20/h",gs:"菩提投资",rs:"0-20人",yq:["1-2年","大专","软件开发","包吃包住"],image:"https://ts1.cn.mm.bing.net/th/id/R-C.b8dde23cc5004d52b72a80fd0ada08a7?rik=mqhuk5X74RCawQ&riu=http%3a%2f%2fwww.qzqn8.com%2fwp-content%2fuploads%2f2020%2f02%2f2-9.jpg&ehk=uQhQFxBRle1Na4eVX1sNfaScN9RQDLZ0ekwjRg0vxuA%3d&risl=&pid=ImgRaw&r=0",mz:"廖启明" ,dd:"深圳"
    },
    {id:2,status:"待交付",zw:"软件开发工程师",xz:"200/天",gs:"腾讯",rs:"0-20人",yq:["1-2年","大专","软件开发","包吃包住"],image:"https://ts1.cn.mm.bing.net/th/id/R-C.b8dde23cc5004d52b72a80fd0ada08a7?rik=mqhuk5X74RCawQ&riu=http%3a%2f%2fwww.qzqn8.com%2fwp-content%2fuploads%2f2020%2f02%2f2-9.jpg&ehk=uQhQFxBRle1Na4eVX1sNfaScN9RQDLZ0ekwjRg0vxuA%3d&risl=&pid=ImgRaw&r=0",mz:"张三 总经理" ,dd:"深圳"
    },
    {id:3,status:"已交付",zw:"前端开发",xz:"18/h",gs:"百度",rs:"0-20人",yq:["1-2年","大专","软件开发","包吃包住"],image:"https://img2.baidu.com/it/u=1574304958,174721775&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1681578000&t=2fad9116ca782cdccd2658f5a1177bb9",mz:"王伟 董事长" ,dd:"深圳"
    },
    {id:4,status:"交易成功",zw:"Java工程师",xz:"190/天",gs:"联梦集团",rs:"0-20人",yq:["1-2年","大专","软件开发","包吃包住"],image:"https://img2.baidu.com/it/u=1574304958,174721775&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1681578000&t=2fad9116ca782cdccd2658f5a1177bb9",mz:"李四 HR" ,dd:"北京"
    },
    {id:5,status:"已交付",zw:"销售",xz:"1500",gs:"菩提投资",rs:"0-20人",yq:["1-2年","大专","软件开发","包吃包住"],image:"https://img2.baidu.com/it/u=1574304958,174721775&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1681578000&t=2fad9116ca782cdccd2658f5a1177bb9",mz:"老六 人才" ,dd:"东莞"
    }
    ],
    tabList: ['全部','待确认', '待交付', '已交付', '交易成功'], // 标签筛选项
    activeTabIndex: 0, // 当前激活的标签索引
  },
  onTabTap(e) {
    const index = e.currentTarget.dataset.index
    const status = this.data.tabList[index]
    const filteredOrders = this.data.orders.filter(order => {
      if (status === '全部') {
        return true
      } else {
        return order.status === status
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      filteredOrders:this.data.orders
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