// pages/web-view/web-view.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:'',
  daohuang:[
    {id:1,name:"热门"},
    {id:2,name:"IT"},
    {id:3,name:"餐饮"},
    {id:4,name:"销售"},
    {id:5,name:"娱乐"},
    {id:6,name:"技术"},
    {id:7,name:"运动"},
    {id:8,name:"教育"}
  ],
  ITEM:[
    
],
  name: "热门"
  },
  //导航栏点击事件
  handleNavItemTap: function(e) {
    const name=e.currentTarget.dataset.name
      const filteredItems = this.data.ITEM.filter((item) => item.bq.includes(name));
      this.setData({ 
        name: name,
        filteredItems: filteredItems })
  },
  //搜索点击事件
  onInputChange: function (event) {
    this.setData({ keyword: event.detail.value })
  },
  
  onSearch:function(e){
    wx.request({
      url: '/text',
      data: {
        keyword: this.data.keyword, 
      },   
    success: res=> {
      // 解析返回数据
      const item1=res.data.data.filter((item) => item.bq.includes(this.data.name));
      console.log(item1)
      let item = res.data.data;
      // 将新闻列表存储在小程序的数据模型中
      this.setData({
        ITEM: item,
        filteredItems:item
      });
      if(this.data.keyword===''){
        app.globalData.ITEM=res.data.data,
        this.setData({
          filteredItems:item1
        })
      }
    }
    })
  },
  tiaozhuan:function(e){
  wx.navigateTo({
    url: '/pages/item/item?item',
  })
  var id=e.currentTarget.dataset.id
  var finditem=this.data.ITEM.find(item=>item.id===id)
  app.globalData.item=finditem
  console.log(finditem) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.onSearch()
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
  },
  
})