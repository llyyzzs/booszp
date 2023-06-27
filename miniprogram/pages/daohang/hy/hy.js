// pages/daohang/hy/hy.ts
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    daohuang:[
        {id:1,name:"热门"},
        {id:2,name:"国有企业"},
        {id:3,name:"行业巨头"},
        {id:4,name:"中小企业"},
        {id:5,name:"众创空间"},
        {id:6,name:"高新技术企业"},
        {id:7,name:"上市"},
      ],
      name:"热门",
      keyword:""
  },
  handleNavItemTap:function(e){
    const name=e.currentTarget.dataset.name
    const filteredItems = this.data.company.filter((item) => item.bq.includes(name));
    this.setData({ 
      name: name,
      filteredItems: filteredItems })
  },
  //跳转到公司详情
  tiaozhuan:function(e){
    var id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../../company/company?id=${id}`,
    })
  },
  //搜索点击事件
  onInputChange: function (event) {
    this.setData({ keyword: event.detail.value })
  },
  
  onSearch:function(e){
    wx.request({
      url: '/company',
      data: {
        keyword: this.data.keyword, 
      },   
    success: res=> {
      // 解析返回数据
      let company = res.data.data;
      const filteredItems =company.filter((item) => item.bq.includes(this.data.name));
      // 将新闻列表存储在小程序的数据模型中
      this.setData({
        company: company,
        filteredItems:company
      });
      if(this.data.keyword==""){
        app.globalData.company=res.data.data,
        this.setData({ 
          filteredItems: filteredItems })
          }
      console.log(app.globalData.company,filteredItems)
    }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.onSearch()
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