// pages/wude/gj/gj.ts
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        icon: '../../../image/直播.png',
        text: '直播招聘',
        text2:'用互动的方式找工作',
        text3:'观看直播'
      },
      {
        icon: '../../../image/指南.png',
        text: '求职指南',
        text2:'各大专业就业方向及技能分析',
        text3:'立刻查看'
      },
      {
        icon: '../../../image/视频.png',
        text: '热门视频',
        text2:'哪些你不能错过的职场技巧',
        text3:'马上观看'
      },
      {
        icon: '../../../image/礼包.png',
        text: '求职礼包',
        text2:'各种求职干货、免费领取',
        text3:'立刻领取'
      },
      {
        icon: '../../../image/职言.png',
        text: '职言职语',
        text2:'职场问题互助问答',
        text3:'点击进入'
      },
      {
        icon: '../../../image/查询.png',
        text: '薪资查询',
        text2:'一键洞悉求职竞争力',
        text3:'免费查询'
      },
      {
        icon: '../../../image/百科.png',
        text: '职业百科',
        text2:'职场技能一查便知',
        text3:'免费查询'
      },
      {
        icon: '../../../image/攻略.png',
        text: '求职攻略',
        text2:'你还不知道的求职技巧',
        text3:'免费查询'
      },
    ]
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