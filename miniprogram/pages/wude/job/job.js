// pages/wude/bj/bj.ts
const app = getApp()
const baseurl = app.globalData.baseurl
// 记录当前滑动的列表项的索引
let currentDeleteIndex = -1;
// 记录滑块容器的可滑动范围和滑块的宽度
const movableAreaWidth = 120;
const deletableWidth = 60;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '', // 搜索关键字
    movableAreaLeft: 0, // 滑块容器的 left 值
    deletableWidth: deletableWidth, // 滑块的宽度
    // 当前活跃的滑块索引
    activeIndex: -1,
    hidden: true,
    baseurl: app.globalData.baseurl
  },
  onCardTap(e) {
    const jobId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../../wude/addjob/addjob?id=${jobId}`,
    })
  },
  tianjia(e) {
    wx.navigateTo({
      url: "../../wude/addjob/addjob"
    })
  },
  deleteNote(e) {
    const index = this.data.activeIndex
    console.log(this.data.joblist[index].id)
    wx.request({
      url: baseurl + '/note/delete',
      method: 'POST',
      data: JSON.stringify({ id: this.data.joblist[this.data.activeIndex].id }),
      header: {
        token: wx.getStorageSync('token'),
      },
      success: res => {
        console.log(res.data)
        // 移除列表项，并更新滑块容器的 left 值和删除状态
        const newList = this.data.joblist.filter((item, index) => index !== this.data.activeIndex);
        this.setData({
          joblist: newList,
          movableAreaLeft: 0,
          deletableWidth: deletableWidth,
        });

      }
    })

  },

  // 获取招聘信息
  getjob() {
    console.log(this.data.user.companyId)
    wx.request({
      url: baseurl + '/bcyy-item/item/get/companyItem',
      method: 'POST',
      data: {
        companyId: this.data.user.companyId,
        page: 0,
        size: 10,
      },
      header: {
        token: wx.getStorageSync('token'),
      },
      success: res => {
        console.log(res.data)
        this.setData({
          joblist: res.data.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      user: app.globalData.user
    })
    console.log(app.globalData.user)
    this.getjob()
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
    this.getjob()
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