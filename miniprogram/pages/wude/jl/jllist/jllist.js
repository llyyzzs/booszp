const app=getApp()
const baseurl=app.globalData.baseurl

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
    hidden:true ,
 },
  onCardTap(e) {
    const noteId = e.currentTarget.dataset.id
    const resume = this.data.resumeList[noteId]
    wx.navigateTo({
      url: `../jldetails/jldetails?resume=${JSON.stringify(resume)}`,
    })
  },
  tianjia(e){
    wx.navigateTo({
      url: '../addjl/addjl',
    })
  },
  // 手指触摸事件处理函数
  handleTouchStart(e) {
    const { resumeList } = this.data;
    const { currentTarget, touches } = e;
    // 获取当前触摸的列表项的索引
    const currentDeleteIndex = Number(currentTarget.dataset.id);
    // 记录列表项的初始滑动位置和标记删除状态
    resumeList[currentDeleteIndex].startX = touches[0].clientX;
    resumeList[currentDeleteIndex].startY = touches[0].clientY;
    resumeList[currentDeleteIndex].isDeleting = false;
    this.setData({ 
      activeIndex: e.currentTarget.dataset.id,
      movableAreaLeft: 0, 
      hidden:true,
      z:-1
    });
      console.log(this.data.resumeList)
  },

  // 手指滑动事件处理函数
  handleTouchMove(e) {
    const { resumeList } = this.data;
    const { currentTarget, touches } = e;
    // 获取当前触摸的列表项的索引
    const currentDeleteIndex = Number(currentTarget.dataset.id);
    // 滑动距离和方向计算
    const deltaX = touches[0].clientX - resumeList[currentDeleteIndex].startX;
    const deltaY = touches[0].clientY - resumeList[currentDeleteIndex].startY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);
    const isHorizontal = absDeltaX > absDeltaY;
    // 判断是否为水平滑动
    if (isHorizontal) {
      // 计算滑块容器的 left 值
      var movableAreaLeft = -movableAreaWidth;
      // 更新滑块容器的 left 值和列表数据
      if(deltaX<0){
        this.setData({
          movableAreaLeft: movableAreaLeft,
          hidden:false,
          z:1
        });
      }
      else{
        this.setData({
          movableAreaLeft: 0,
          hidden:false
        });
      }
    }
  },
  deleteNote(e){
    // 移除列表项，并更新滑块容器的 left 值和删除状态
      const resumeList = this.data.noteList.filter((item, index) => index !== this.data.activeIndex);
      this.setData({
        resumeList: resumeList,
        movableAreaLeft: 0,
        deletableWidth: deletableWidth,
      });
  },
  deleteNote(e) {
    const index = this.data.activeIndex
    console.log(this.data.resumeList[index].id)
    wx.request({
      url: baseurl + '/resume/delete',
      method: 'POST',
      data: JSON.stringify({ id: this.data.resumeList[this.data.activeIndex].id }),
      header: {
        'Authorization': 'Bearer ' + wx.getStorageSync('token'),
      },
      success: res => {
        console.log(res.data)
        // 移除列表项，并更新滑块容器的 left 值和删除状态
        const resumeList = this.data.resumeList.filter((item, index) => index !== this.data.activeIndex);
        this.setData({
          resumeList: resumeList,
          movableAreaLeft: 0,
          deletableWidth: deletableWidth,
        });

      }
    })

  },
  // 获取所有简历信息
  getjl(){
    const token=wx.getStorageSync('token')
    wx.request({
      url: baseurl+'/resume/getAll',
      method:'GET',
      header:{
        'Authorization':'Bearer ' + wx.getStorageSync('token'),
      },
      success:res=>{    
        this.setData({
          resumeList:res.data.data
        }) 
       console.log(res.data)
      }
      
    }) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
   this.getjl()
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
    this.getjl()
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