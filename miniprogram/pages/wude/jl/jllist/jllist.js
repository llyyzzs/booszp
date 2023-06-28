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
    resumeList:[{
      "projetc_exp_list": [
          {
              "name": "头都根习音",
              "start_date": "2017-07-25",
              "content": "adipisicing incididunt",
              "role": "aliquip ex Duis",
              "performance": "elit sint",
              "end_date": "1990-04-30"
          }
      ],
      "advantage": "dolor id nulla",
      "work_exp_list": [
          {
              "name": "正信数长达关",
              "role": "consequat",
              "start_date": "1991-06-16",
              "performance": "ea pariatur dolore irure incididunt",
              "industry": "irure mollit",
              "end_date": "2019-02-04",
              "department": "labore cupidatat deserunt consectetur",
              "content": "deserunt"
          },
          {
              "name": "准内式民矿低代",
              "role": "incididunt do officia Excepteur",
              "start_date": "1978-08-25",
              "department": "quis dolore",
              "end_date": "1993-11-16",
              "content": "dolore dolor",
              "industry": "culpa exercitation esse pariatur aliquip",
              "performance": "dolor ad proident mollit"
          },
          {
              "name": "电断间少义",
              "role": "aliquip",
              "start_date": "1991-01-08",
              "industry": "quis culpa tempor dolore in",
              "end_date": "1976-02-21",
              "performance": "do ut sint pariatur",
              "content": "dolor mollit incididunt ipsum",
              "department": "fugiat"
          },
          {
              "name": "即力什",
              "role": "magna in adipisicing velit irure",
              "start_date": "2012-06-18",
              "industry": "in Excepteur aliquip sed",
              "performance": "nisi do qui laboris",
              "content": "aliquip fugiat et",
              "department": "velit",
              "end_date": "1976-05-21"
          },
          {
              "name": "信素小支示价加",
              "role": "mollit fugiat sed labore",
              "start_date": "2016-06-27",
              "performance": "exercitation irure dolor",
              "end_date": "2017-11-28",
              "department": "magna",
              "content": "ullamco Duis pariatur amet",
              "industry": "magna labore Lorem ad"
          }
      ],
      "name": "走精写声",
      "address": {
          "province": "广东省",
          "city": "迪庆藏族自治州"
      },
      "certification_list": [
          {
              "name": "列至林少片据证",
              "date": "1996-06-26"
          }
      ],
      "id": "64",
      "education_exp_list": [
          {
              "major": "commodo quis",
              "type": 0,
              "degree": "id mollit",
              "start_date": "2015-05-02",
              "end_date": "1975-09-12",
              "name": "五同府效基任",
              "content": "ea laboris commodo eiusmod nostrud",
              "thesis_content": "et esse Duis",
              "thesis_title": "中把近团意律"
          },
          {
              "major": "culpa",
              "type": 0,
              "degree": "proident eiusmod",
              "start_date": "1993-08-12",
              "end_date": "1980-11-20",
              "name": "以白水构断书",
              "thesis_title": "教上议革反",
              "content": "aliquip do occaecat sint ut",
              "thesis_content": "non ea"
          },
          {
              "major": "eiusmod officia",
              "type": 0,
              "degree": "sit eu",
              "start_date": "1981-12-04",
              "end_date": "2013-06-10",
              "name": "治般毛用铁过",
              "thesis_content": "elit eiusmod cupidatat",
              "thesis_title": "实共史此标听",
              "content": "minim labore dolore"
          }
      ],
      "user": {
          "name": "级素就金省式",
          "gender": "女",
          "birthday": "1973-07-26",
          "degree": "ad magna sunt consequat proident",
          "phone": 18142496947,
          "openid": "6",
          "email": "k.piocx@qq.com",
          "avatar": "(KuhaLR",
          "id": "31"
      }
  },
    ]
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
  // 获取所有简历信息
  getjl(){
    const token=wx.getStorageSync('token')
    wx.request({
      url: baseurl+'/resume/getAll',
      method:'GET',
      header:{
        'Authorization':'Bearer ' + token,
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
  //  this.getjl()
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