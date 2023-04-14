// pages/web-view/web-view.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:'',
  daohuang:[
    {id:1,name:"热门"},
    {id:2,name:"普工"},
    {id:3,name:"餐饮"},
    {id:4,name:"销售"},
    {id:5,name:"计算机"},
    {id:6,name:"金融"},
    {id:7,name:"机械"},
    {id:8,name:"医疗"}
  ],
  ITEM:[
    {id:1,zw:"交易员",xz:"5-6K",gs:"菩提投资",rs:"0-20人",yq:["1-2年","大专","软件开发","包吃包住"],image:"",mz:"廖启明" ,dd:"深圳"
  },
  {id:2,zw:"软件开发工程师",xz:"15-16K",gs:"腾讯",rs:"0-20人",yq:["1-2年","大专","软件开发","包吃包住"],image:"",mz:"张三 总经理" ,dd:"深圳"
  },
  {id:3,zw:"前端开发",xz:"10-16K",gs:"百度",rs:"0-20人",yq:["1-2年","大专","软件开发","包吃包住"],image:"",mz:"王伟 董事长" ,dd:"深圳"
  },
  {id:4,zw:"Java工程师",xz:"20-25K",gs:"联梦集团",rs:"0-20人",yq:["1-2年","大专","软件开发","包吃包住"],image:"",mz:"李四 HR" ,dd:"北京"
  },
  {id:5,zw:"销售",xz:"10-20K",gs:"菩提投资",rs:"0-20人",yq:["1-2年","大专","软件开发","包吃包住"],image:"",mz:"老六 人才" ,dd:"东莞"
  }
],
  activeIndex: 0
  },
  //导航栏点击事件
  handleNavItemTap: function(e) {
    this.setData({
      activeIndex: e.currentTarget.dataset.index
    })
  },
  //搜索点击事件
  onInputChange: function (event) {
    this.setData({ keyword: event.detail.value })
  },
  
  onSearch:function(e){
    wx.request({
      url: 'http://localhost:8080/text',
      data: {
        keyword: this.data.keyword, 
      },
      
    success: res => {
      // 解析返回数据
      console.log(res.data)
      let item = res.data.data;
      // 将新闻列表存储在小程序的数据模型中
      this.setData({
        ITEM: item
      });
    }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})