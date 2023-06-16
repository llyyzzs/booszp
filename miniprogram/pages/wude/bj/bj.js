// pages/wude/bj/bj.ts
const app=getApp()
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
    noteList: [
      {title:"前端开发资源", content:["详细信息页面用来展示便签的详细内容，并且可以让用户编辑便签的内容。我们可以在这个页面上添加一个标题栏，一个文本输入框和保存按钮。其中，标题栏用来显示当前便签的标题，文本输入框用来输入便签内容，保存按钮用来保存便签的修改。当用户单击一个便签卡片时，我们可以将该便签的 ID 作为参数传递给详细信息页面，并根据 ID 查询该便签的详细内容。在页面加载完成后，我们可以将便签的标题和内容填充到文本输入框中。"],date:'2023-5-17'},
      {title:"后端开发技巧", content:["详细信息页面用来展示便签的详细内容，并且可以让用户编辑便签的内容。我们可以在这个页面上添加一个标题栏，一个文本输入框和保存按钮。其中，标题栏用来显示当前便签的标题，文本输入框用来输入便签内容，保存按钮用来保存便签的修改。当用户单击一个便签卡片时，我们可以将该便签的 ID 作为参数传递给详细信息页面，并根据 ID 查询该便签的详细内容。在页面加载完成后，我们可以将便签的标题和内容填充到文本输入框中。"],date:'2023-5-18'}
    ], // 便签列表
    keyword: '', // 搜索关键字
    movableAreaLeft: 0, // 滑块容器的 left 值
    deletableWidth: deletableWidth, // 滑块的宽度
    // 当前活跃的滑块索引
    activeIndex: -1, 
    hidden:true 
  },
  onCardTap(e) {
    const noteId = e.currentTarget.dataset.id
    const note = this.data.noteList[noteId]
    app.globalData.noteid=noteId
    app.globalData.note=note
    wx.navigateTo({
      url: `../../wude/tjbj/tjbj?note=${JSON.stringify(note)}`,
    })
  },
  tianjia(e){
    const note = {title:"标题",content:"内容"}
    const noteId = this.data.noteList.length
    app.globalData.noteid=noteId
    app.globalData.note=note
    console.log(noteId)
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
      hidden:true,
      z:-1
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
    const { noteList } = this.data;
    // 移除列表项，并更新滑块容器的 left 值和删除状态
      const newList = noteList.filter((item, index) => index !== this.data.activeIndex);
      this.setData({
        noteList: newList,
        movableAreaLeft: 0,
        deletableWidth: deletableWidth,
      });
      app.globalData.user1.bj=this.data.noteList
      console.log(app.globalData.user1.bj)
      this.show()
      wx.setStorageSync('token', app.globalData.user1)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      noteList:app.globalData.user1.bj
    })
  },
  show(){
    wx.request({
      url: 'http://localhost:8800/user/savebj', // 请求后端的 URL
      method: 'POST',
      data:  {noteList:JSON.stringify(this.data.noteList) ,id:app.globalData.user1.id},
      header: {
        'content-type': 'application/json'  // 将请求的数据格式设置为 JSON
      },
      success:(res)=> {
        // 处理请求成功的响应结果
        this.setData({
          noteList:res.data.data.bj
        })
        console.log(res.data.data.bj)
        wx.setStorageSync('token', app.globalData.user1)
      },
      fail(err) {
        // 处理请求失败的响应结果
        
      }
      
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
    var NoteList=this.data.noteList
    if(app.globalData.noteid===this.data.noteList.length){
      NoteList.push(app.globalData.note)
      this.setData({
        noteList:NoteList
      })
    }
    else{
    NoteList[app.globalData.noteid]=app.globalData.note
    this.setData({
      noteList:NoteList
    })
  }
    console.log(this.data.noteList)
    app.globalData.user1.bj=this.data.noteList
    // TODO：将表单数据保存到数据库中，跳转到便签列表页面等等操作
    this.show()
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