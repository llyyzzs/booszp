// pages/daohang/hy/hy.ts
const app = getApp()
const baseurl = app.globalData.baseurl
const token = wx.getStorageSync('token')
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
      keywords:"",
      list:[
        {
        id:"",
        name:"",
        avatar:"",
        city:"",
        type:"",
        date:"", 
        scale:"",
        heat:"",//公司热度
        start:"",//在招岗位
        salary:""//平均薪资
      }
    ]
  },
  handleNavItemTap:function(e){
    const name=e.currentTarget.dataset.name
    // const filteredItems = this.data.company.filter((item) => item.type.includes(name));
    this.setData({ 
      name: name,
      // filteredItems: filteredItems })
    })
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
    this.setData({ keywords: event.detail.value })
  },
  
  onSearch:function(e){
    console.log(this.data.keywords)
    wx.request({
      url: baseurl + '/company/search',
      method: 'GET',
      data: { keywords: this.data.keywords },
      header: {
        'Authorization': 'Bearer ' + token,
      },
      success: res => {
        console.log(res.data.data)
        this.setData({
          filteredItems:res.data.data
        })
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