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
    hidden: true
  },
  onCardTap(e) {
    const noteId = e.currentTarget.dataset.id
    const note = this.data.noteList[noteId]
    app.globalData.noteid = noteId
    app.globalData.note = note
    wx.navigateTo({
      url: `../../wude/tjbj/tjbj?note=${JSON.stringify(note)}`,
    })
  },
  tianjia(e) {
    const note = { title: "", content: "" }
    wx.navigateTo({
      url: `../../wude/tjbj/tjbj?note=${JSON.stringify(note)}`,
    })
  },
  // 手指触摸事件处理函数
  handleTouchStart(e) {
    const { noteList } = this.data;
    const { currentTarget, touches } = e;
    // 获取当前触摸的列表项的索引
    const currentDeleteIndex = Number(currentTarget.dataset.id);
    // 记录列表项的初始滑动位置和标记删除状态
    noteList[currentDeleteIndex].startX = touches[0].clientX;
    noteList[currentDeleteIndex].startY = touches[0].clientY;
    noteList[currentDeleteIndex].isDeleting = false;
    this.setData({
      activeIndex: e.currentTarget.dataset.id,
      movableAreaLeft: 0,
      hidden: true,
      z: -1
    });
    console.log(this.data.noteList)
  },

  // 手指滑动事件处理函数
  handleTouchMove(e) {
    const { noteList } = this.data;
    const { currentTarget, touches } = e;
    // 获取当前触摸的列表项的索引
    const currentDeleteIndex = Number(currentTarget.dataset.id);
    // 滑动距离和方向计算
    const deltaX = touches[0].clientX - noteList[currentDeleteIndex].startX;
    const deltaY = touches[0].clientY - noteList[currentDeleteIndex].startY;
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
    console.log(this.data.noteList[index].id)
    wx.request({
      url: baseurl + '/bcyy-user/user/deleteNote',
      method: 'GET',
      data: { id: this.data.noteList[this.data.activeIndex].id },
      header: {
        token: wx.getStorageSync('token'),
      },
      success: res => {
        console.log(res.data)
        // 移除列表项，并更新滑块容器的 left 值和删除状态
        const newList = this.data.noteList.filter((item, index) => index !== this.data.activeIndex);
        this.setData({
          noteList: newList,
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
  // 获取笔记
  getbj() {
    wx.request({
      url: baseurl + '/bcyy-user/user/getNoteList',
      method: 'GET',
      header: {
        token: wx.getStorageSync('token'),
      },
      success: res => {
        console.log(res.data)
        if (res.data.data != null) {
          const convertedNoteList = res.data.data.map(note => ({
            ...note,
            date: this.convertTimestampToTime(note.date)
          }
          ));
          this.setData({
            noteList: convertedNoteList
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getbj()
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
    this.getbj()
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