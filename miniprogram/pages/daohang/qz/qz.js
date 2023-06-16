// pages/daohang/qz/qz.ts
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    daohuang:[
      {id:1,name:"热门"},
      {id:2,name:"在家"},
      {id:3,name:"日结"},
      {id:4,name:"聊天员"},
      {id:5,name:"直播"},
      {id:6,name:"线上"},
      {id:7,name:"副业"},
      {id:8,name:"派单"}
    ],
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
    ITEM:[{
    dd: "东莞",
    gs: "华为",
    id: 1116,
    image: "https://img0.baidu.com/it/u=178849715,820264547&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
    latitude: 31.3296,
    longitude: 121.531,
    lx: "全职",
    mz: "任正非",
    nr: (5) ["任职要求：", "1、财务、金融等相关专业,三年及以上证券分析师相关工作经验；", "2、熟悉宏观经济和行业发展趋势,掌握财务和投资分析方法技巧；", "3、具备较好的信息收集和分析能力,能够进行投资组合优化和风险评估；", "4、熟练掌握Bloomberg、Wind等股票和债券交易软件,能够进行投资操作和风险控制。"],
    rs: "3-8人",
    sf: "人事部经理",
    state: "未报名",
    xz: "20/h",
    yq: ["财务分析", "股票研究", "投资建议", "精算模型", "硕士以上"],
    zt: false,
    zw: "客服",
    id:1116,
    bq:"热门 在家"},
  ]
  },
   //搜索点击事件
   onInputChange: function (event) {
    this.setData({ keyword: event.detail.value })
  },
  onSearch:function(e){
    const that=this
    wx.request({
      url: 'http://localhost:8800/text',
      data: {
        keyword: this.data.keyword, 
      },   
    success: res=> {
      // 解析返回数据
      console.log(res.data)
      let item = res.data.data.filter((item) => item.lx==="兼职");;
      // 将新闻列表存储在小程序的数据模型中
      this.setData({
        filteredItems:item
      });
      const item1 = this.data.ITEM.filter(item => {
        return item.dd===that.data.region
      })
      this.setData({
        item: item1,
      }) 
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
    handleNavItemTap:function(e){
      const name=e.currentTarget.dataset.name
      const filteredItems = this.data.ITEM.filter((item) => item.bq.includes(name));
      console.log(filteredItems)
      this.setData({ 
        name: name,
        filteredItems: filteredItems })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const item=app.globalData.ITEM.filter((item) => item.lx==="兼职");
    this.setData({
      ITEM:item,
      filteredItems:item
    })
    console.log(item)
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