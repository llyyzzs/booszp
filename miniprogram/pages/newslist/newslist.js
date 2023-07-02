const app = getApp()
const baseurl = app.globalData.baseurl
const baseWsUrl = app.globalData.baseWsUrl
// 记录当前滑动的列表项的索引
let currentDeleteIndex = -1;
// 记录滑块容器的可滑动范围和滑块的宽度
const movableAreaWidth = 120;
const deletableWidth = 60;
let socketTask = undefined
Page({
  data: {
    baseurl: app.globalData.baseurl,
    timer: null, // 定时器对象
    contactList: [],
    // 记录scroll-view的生命周期id，用于控制滚动到底部
    toView: 'dibu',
    movableAreaLeft: 0, // 滑块容器的 left 值
    deletableWidth: deletableWidth, // 滑块的宽度
    // 当前活跃的滑块索引
    activeIndex: -1,
  },
  startTimer: function () {
    const interval = 30000; // 定时器间隔，60秒一次

    // 设置定时器
    const timer = setInterval(function () {
      socketTask.send({
        data: "heartbeat",
        success: (res) => {
          console.log(res)
        }
      }); // 发送心跳请求
    }, interval);

    this.setData({
      timer: timer
    });
  },

  clearTimer: function () {
    const timer = this.data.timer;
    if (timer) {
      clearInterval(timer);
    }
  },

  sendRequest: function () {
    const token = wx.getStorageSync('token')
    wx.request({
      url: baseurl + '/chat/getConversations', // 替换成你的请求地址
      method: 'GET', // 请求方法，这里示例使用 GET
      header: {
        'Authorization': 'Bearer ' + token,
      },
      success: (res) => {
        this.setData({
          contactList: res.data.data,
        })
      },
      fail: function (error) {
        console.error('请求失败', error);
      }
    });
  },
  goToChat: function (event) {
    /**
     * 切换聊天对象
     */
    const index = event.currentTarget.dataset.index;
    const id = this.data.contactList[index].conversation_id;
    const avatar = this.data.contactList[index].avatar;
    // 进入聊天界面的逻辑 
    wx.navigateTo({
      url: '../news/news?id=' + id + '&avatar=' + avatar,
    })
  },

  // 手指触摸事件处理函数
  handleTouchStart(e) {
    const {
      contactList
    } = this.data;
    const {
      currentTarget,
      touches
    } = e;
    // 获取当前触摸的列表项的索引
    const currentDeleteIndex = Number(currentTarget.dataset.index);
    // 记录列表项的初始滑动位置和标记删除状态
    contactList[currentDeleteIndex].startX = touches[0].clientX;
    contactList[currentDeleteIndex].startY = touches[0].clientY;
    contactList[currentDeleteIndex].isDeleting = false;
    this.setData({
      activeIndex: e.currentTarget.dataset.index,
      movableAreaLeft: 0,
    });
  },

  // 手指滑动事件处理函数
  handleTouchMove(e) {
    const {
      contactList
    } = this.data;
    const {
      currentTarget,
      touches
    } = e;
    // 获取当前触摸的列表项的索引
    const currentDeleteIndex = Number(currentTarget.dataset.index);
    // 滑动距离和方向计算
    const deltaX = touches[0].clientX - contactList[currentDeleteIndex].startX;
    const deltaY = touches[0].clientY - contactList[currentDeleteIndex].startY;
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
      } else {
        this.setData({
          movableAreaLeft: 0,
          hidden: false
        });
      }
    }
  },
  deleteNote(e) {
    const contactList1 = this.data.contactList.filter((item, index) => index !== this.data.activeIndex);
    this.setData({
      contactList: contactList1,
      movableAreaLeft: 0,
      deletableWidth: deletableWidth,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const token = wx.getStorageSync('token')
    socketTask = wx.connectSocket({
      url: baseWsUrl+'/chat/messageNotify',
      header: {
        'Authorization': 'Bearer ' + token,
      },
      success: (res) => {
        console.log(res);
      },
      fail: (res) => console.log(res)
    })
    socketTask.onMessage((res) => {
      console.log(res)
      this.sendRequest()
    })
    this.startTimer();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.sendRequest()
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
    // 页面卸载时清除定时器
    this.clearTimer();
    socketTask.close({
      data: 'close'
    })
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