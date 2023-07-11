// pages/daohang/qz/qz.ts
const app = getApp()
const baseurl = app.globalData.baseurl
const token = wx.getStorageSync('token')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    contentList: [],
    daohuang: [
      { id: 1, name: "热门" },
      { id: 2, name: "在家" },
      { id: 3, name: "日结" },
      { id: 4, name: "聊天员" },
      { id: 5, name: "直播" },
      { id: 6, name: "线上" },
      { id: 7, name: "副业" },
      { id: 8, name: "派单" }
    ],
    name:"热门",
    swiperList: [
      {
        imgUrl: '../../../image/兼职1.png'
      },
      {
        imgUrl: '../../../image/兼职3.png'
      },
      {
        imgUrl: '../../../image/兼职2.png'
      },
      {
        imgUrl: '../../../image/兼职4.png'
      },
      {
        imgUrl: '../../../image/兼职5.png'
      },
      {
        imgUrl: '../../../image/兼职6.png'
      }
    ],
    ITEM: [{
      dd: "东莞",
      gs: "华为",
      id: 1116,
      image: "https://img0.baidu.com/it/u=178849715,820264547&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
      latitude: 31.3296,
      longitude: 121.531,
      lx: "全职",
      mz: "任正非",
      nr: (5)["任职要求：", "1、财务、金融等相关专业,三年及以上证券分析师相关工作经验；", "2、熟悉宏观经济和行业发展趋势,掌握财务和投资分析方法技巧；", "3、具备较好的信息收集和分析能力,能够进行投资组合优化和风险评估；", "4、熟练掌握Bloomberg、Wind等股票和债券交易软件,能够进行投资操作和风险控制。"],
      rs: "3-8人",
      sf: "人事部经理",
      state: "未报名",
      xz: "20/h",
      yq: ["财务分析", "股票研究", "投资建议", "精算模型", "硕士以上"],
      zt: false,
      zw: "客服",
      id: 1116,
      bq: "热门 在家"
    },
    ]
  },
  //搜索点击事件
  onInputChange: function (event) {
    this.setData({ keyword: event.detail.value })
  },
  onSearch: function (e) {
    console.log(this.data.keyword)
    wx.request({
      url: baseurl + '/job/getAll',
      method: 'GET',
      data: { 
      page: 1 ,
      keywords:this.data.keyword},
      header: {
        'Authorization': 'Bearer ' + token,
      },
      success: res => {
        this.setData({
          filteredItems: res.data.data,
        });
      }
    })
  },
  tiaozhuan: function (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/item/item?id=${id}`,
    })
  },
  handleNavItemTap: function (e) {
    const name = e.currentTarget.dataset.name
    this.biaoqian(name)
  },
  biaoqian:function(name){
    const filteredItems = this.data.contentList.filter((item) => item.type.includes(name));
    this.setData({
      name: name,
      filteredItems: filteredItems
    })
  },
  // 获取招聘信息
  getjob(page) {
    wx.request({
      url: baseurl + '/job/getAll',
      method: 'GET',
      data: { page: page },
      header: {
        'Authorization': 'Bearer ' + token,
      },
      success: res => {
        const itemlist = res.data.data.filter(item=>{return item.job_type==="全职"})
        const updatedList = this.data.contentList.concat(itemlist);
        console.log(updatedList)
        this.setData({
          contentList: updatedList,
          page: page + 1,
          loading: false
        });
        this.biaoqian(this.data.name)
      }
    })
  },
  loadMoreData() {
    if (this.data.loading) return; // 防止重复加载
    this.setData({
      loading: true
    });
    // 模拟异步加载更多数据
    setTimeout(() => {
      // 从服务器请求数据
      this.getjob(this.data.page)
    }, 100);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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
    this.getjob(this.data.page);
    const filteredItems = this.data.contentList.filter((item) => item.type.includes("热门"));
    console.log(filteredItems)
    this.setData({
      filteredItems: filteredItems
    })
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
    // 页面滚动到底部时的操作
    console.log("触底加载")
    this.loadMoreData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})