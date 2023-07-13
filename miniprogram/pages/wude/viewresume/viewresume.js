const app = getApp()
const baseurl = app.globalData.baseurl
const token = wx.getStorageSync('token')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    tabList: ['全部', '已报名','待沟通','待面试', '已面试','已通过'], // 标签筛选项
    resumeList:['已报名','待沟通','待面试', '已面试','已通过'],
    activeTabIndex: 0, // 当前激活的标签索引
  },
  //修改简历状态
  select: function (e) {
    console.log(this.data.filteredOrders)
    const job_resume_id = e.currentTarget.dataset.id
    const status=parseInt(e.detail.value)
    console.log(status,job_resume_id)
    this.updatajobResume(job_resume_id,status)
  },
  updatajobResume(job_resume_id,status){
    wx.request({
      url: baseurl + '/jobResume/change',
      method: 'POST',
      data:{
        job_resume_id:job_resume_id,
        status:status
      },
      header: {
        'Authorization': 'Bearer ' + wx.getStorageSync('token'),
      },
      success: res => {
        console.log(res)
        this.getjobResume()
      }
    })
  },
  qiehuan(index){
    const state = this.data.tabList[index]
    const filteredOrders = this.data.itemlist.filter(order => {
      if (state === '全部') {
        return true
      } else {
        return order.status === index-1
      }
    })
    this.setData({
      activeTabIndex: index,
      filteredOrders: filteredOrders,
    })
  },
  onTabTap(e) {
    const index = e.currentTarget.dataset.index
    this.qiehuan(index)
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
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/item/item?id=${id}`,
    }) 
  },
  // 获取简历投递状态
  getjobResume() {
    if(wx.getStorageSync('token')){
    console.log("获取简历投递状态")
    wx.request({
      url: baseurl + '/jobResume/bossGet',
      method: 'GET',
      header: {
        'Authorization': 'Bearer ' + wx.getStorageSync('token'),
      },
      success: res => {
        if(res.statusCode!=200){
          wx.showToast({
            title: '不可访问',
            icon:'error',
          })
          return
        }
        console.log(res.data.data)
        this.setData({
          itemlist:res.data.data,
          filteredOrders:res.data.data
        })
        this.qiehuan(this.data.activeTabIndex)
      }
    })
    }
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
  onShow() {
    this.getjobResume()
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