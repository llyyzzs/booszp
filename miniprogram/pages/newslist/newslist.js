const app=getApp()
// 记录当前滑动的列表项的索引
let currentDeleteIndex = -1;
// 记录滑块容器的可滑动范围和滑块的宽度
const movableAreaWidth = 120;
const deletableWidth = 60;
Page({
  data: {
    timer: null, // 定时器对象
    contactList: [
      { id: 111, name: '小明', avatar: '../../image/11.png' },
      { id: 211, name: '小红', avatar: '../../image/12.png' },
      { id: 311, name: '小刚', avatar: '../../image/13.png' },
    ],
    // 记录scroll-view的生命周期id，用于控制滚动到底部
    toView: 'dibu',
    // 记录每个联系人的聊天信息
    contactMessageList: {111:[{id: "o2Sxk5XReIKQFz2kJ4gAFdDrrzKM", type: "text", content: "你好"},{id: 0, type: "text", content: "请问该岗位现在还需要人吗"}],211:[{id: 1, type: "text", content: "你好小红"},{id: "o2Sxk5XReIKQFz2kJ4gAFdDrrzKM", type: "text", content: "请问该岗位招聘还有效吗"}],311:[{id: "o2Sxk5XReIKQFz2kJ4gAFdDrrzKM", type: "text", content: "刚总"},{id: "o2Sxk5XReIKQFz2kJ4gAFdDrrzKM", type: "text", content: "我想了解该岗位的更多信息"}]},
    movableAreaLeft: 0, // 滑块容器的 left 值
    deletableWidth: deletableWidth, // 滑块的宽度
    // 当前活跃的滑块索引
    activeIndex: -1, 
  },
  startTimer: function () {
    const that = this;
    const interval = 5000; // 定时器间隔，单位为毫秒

    // 设置定时器
    const timer = setInterval(function() {
      that.sendRequest(); // 发送网络请求的函数
    }, interval);

    this.setData({ timer: timer });
  },

  clearTimer: function () {
    const timer = this.data.timer;
    if (timer) {
      clearInterval(timer);
    }
  },

  sendRequest: function () {
    const token=wx.getStorageSync('token') 
    wx.request({
      url: 'http://localhost:8800/chat/getConversations', // 替换成你的请求地址
      method: 'GET', // 请求方法，这里示例使用 GET
      header:{
        'Authorization':'Bearer ' + token,
      },
      success: function (res) {
        console.log('请求成功', res.data);
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
    let contactId = event.currentTarget.dataset.id;
    const index= event.currentTarget.dataset.index;
    this.setData({
      messageList: this.getContactMessageList(contactId), 
    });
    app.globalData.contactId=contactId
    app.globalData.messageList=this.data.messageList
    // 进入聊天界面的逻辑 
    var a = encodeURIComponent(this.data.contactList[index].avatar)
    console.info(a)
    var b = decodeURIComponent(a)
    app.globalData.avatar=b
    console.info(b)
    wx.navigateTo({
      url: '../news/news?messageList='+JSON.stringify(this.data.messageList),
    })
  },

  // 手指触摸事件处理函数
  handleTouchStart(e) {
    const { contactList } = this.data;
    const { currentTarget, touches } = e;
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
    const { contactList } = this.data;
    const { currentTarget, touches } = e;
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
    const contactList1 = this.data.contactList.filter((item, index) => index !== this.data.activeIndex);
    this.setData({
        contactList: contactList1,
        movableAreaLeft: 0,
        deletableWidth: deletableWidth,
      });
  },

  /**
   * 获取某个联系人的聊天信息
   */
  getContactMessageList: function (contactId) {
    if (this.data.contactMessageList[contactId]) {
      // 如果该联系人的聊天信息已经保存在contactMessageList中，则从其中读取并返回
      return this.data.contactMessageList[contactId];
    } else {
      // 如果该联系人的聊天信息还未保存在contactMessageList中，则从服务器获取并保存到contactMessageList中，并返回
      wx.request({
        url: 'url',
        data: { contactId },
        success: (res) => {
          let messageList = res.data.messageList || [];
          this.setContactMessageList(contactId, messageList);
          this.setData({
            messageList: messageList,
          });
        },
      });
      return [];
    }
  },
   /**
   * 将某个联系人的聊天信息保存到contactMessageList中
   */
  setContactMessageList: function (contactId, messageList) {
    this.data.contactMessageList[contactId] = messageList;

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     // 开始定时器，每隔一段时间执行网络请求
    this.startTimer();
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
    const id = wx.getStorageSync('id')
    const name = wx.getStorageSync('name')
    const avatar = wx.getStorageSync('image')
    // 添加到 contactList 中
    if(id!=''){
      // 查找是否已存在相同 id 的联系人
      let exists = false
      for (let i = 0; i < this.data.contactList.length; i++) {
        if (this.data.contactList[i].id === id) {
          exists = true
          break
        }
      }
      // 如果不存在，则添加新的联系人
      if (!exists) {
        const newContact = {id, name, avatar}
        const contacts = this.data.contactList.concat(newContact)
        this.setData({
          contactList: contacts
        })
      }
      this.setData({
      currentContactId:id
    })
    }
    this.setContactMessageList(app.globalData.contactId,app.globalData.messageList)
    // 假设已经有一个 contactList 数组和 contactMessageList 对象
    const updatedContactList = this.data.contactList.map(contact => {
    const lastMessage = this.data.contactMessageList[contact.id]?.slice(-1)[0] // 获取该联系人的最后一条消息
    return {
      ...contact,
      lastMessage: lastMessage ? lastMessage.content : '', // 如果最后一条消息存在，则将其内容赋给 lastMessage，否则置为空字符串
    }
    })
    this.setData({
      contactList:updatedContactList
    })
    console.log(updatedContactList,id)
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
