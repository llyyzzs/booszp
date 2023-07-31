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
    baseurl:app.globalData.baseurl
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
  // 手指触摸事件处理函数
  handleTouchStart(e) {
    const { joblist } = this.data;
    const { currentTarget, touches } = e;
    // 获取当前触摸的列表项的索引
    const currentDeleteIndex = Number(currentTarget.dataset.index);
    // 记录列表项的初始滑动位置和标记删除状态
    joblist[currentDeleteIndex].startX = touches[0].clientX;
    joblist[currentDeleteIndex].startY = touches[0].clientY;
    joblist[currentDeleteIndex].isDeleting = false;
    this.setData({
      activeIndex: e.currentTarget.dataset.id,
      movableAreaLeft: 0,
      hidden: true,
      z: -1
    });
    console.log(this.data.joblist)
  },

  // 手指滑动事件处理函数
  handleTouchMove(e) {
    const { joblist } = this.data;
    const { currentTarget, touches } = e;
    // 获取当前触摸的列表项的索引
    const currentDeleteIndex = Number(currentTarget.dataset.index);
    // 滑动距离和方向计算
    const deltaX = touches[0].clientX - joblist[currentDeleteIndex].startX;
    const deltaY = touches[0].clientY - joblist[currentDeleteIndex].startY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);
    const isHorizontal = absDeltaX > absDeltaY;
    // 判断是否为水平滑动
    if (isHorizontal) {
      // 计算滑块容器的 left 值
      var movableAreaLeft = -movableAreaWidth;
      // 更新滑块容器的 left 值和列表数据
      if (deltaX < 0) {
        this.setData({
          movableAreaLeft: movableAreaLeft,
          hidden: false,
          z: 1
        });
      }
      else {
        this.setData({
          movableAreaLeft: 0,
          hidden: false
        });
      }
    }
  },
  deleteNote(e) {
    const index = this.data.activeIndex
    console.log(this.data.joblist[index].id)
    wx.request({
      url: baseurl + '/note/delete',
      method: 'POST',
      data: JSON.stringify({ id: this.data.joblist[this.data.activeIndex].id }),
      header: {
        'Authorization': 'Bearer ' + wx.getStorageSync('token'),
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
  convertTimestampToTime(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },
  //获取自己公司信息
  getmycompany(){
    wx.request({
      url: baseurl + '/company/my',
      method: 'GET',
      header: {
        'Authorization': 'Bearer ' + wx.getStorageSync('token'),
      },
      success: res => {
        console.log(res.data)
        this.setData({
          companyid:res.data.data.id
        })
        this.getjob();
    }
  })
  },
  // 获取招聘信息
  getjob() {
    wx.request({
      url: baseurl + '/job/getCompany',
      method: 'GET',
      data:{id:this.data.companyid},
      header: {
        'Authorization': 'Bearer ' + wx.getStorageSync('token'),
      },
      success: res => {
        console.log(res.data)
        this.setData({
          joblist:res.data.data
        })
      }    
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getmycompany()
    console.log(app.globalData.user)
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
    this.getmycompany()
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