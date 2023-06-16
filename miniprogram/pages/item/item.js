// pages/item/item.ts
const app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    item:["dew"],
    markers:[{
      id:1,
      latitude:23.1314,
      longitude:113.2693,
      width: 32, // 标记的宽度
      height: 32, // 标记的高度
      label:{
        content:'腾讯'
      }
    }],
    ITEM:[
        {id:1,zw:"Java工程师",xz:"10-20K"}
    ],
    biaoqian:["多线程","Springboot","vue3","MySQL"],
    nr:["任职要求:","1、具有扎实的计算机基础理论知识、多线程编程、网络编程、熟练应用成熟的分布式缓存、分布式存储技术方案；","2、拥有两年以上Java相关开发经验；","3、熟练使用Spring，Hibernate，Mybatis等开源框架进行开发；","4、熟悉基于MySQL、Orcale 等关系型数据库的设计和开发；","5、熟悉Linux命令，有Linux环境下开发经验与技能优先；","6、有Redis，MongoDB等开源NoSQL数据库的相关知识或技能优先；","7、有财经、金融互联网网站开发经验者优先。"],
  },
  qh:function(e){
    const name=e.currentTarget.dataset.name
    this.setData({
      name:name
    })
    console.log(name)
  },
  chooseLocation: function () {
    var that = this;
    wx.chooseLocation({
      success: function(res) {
        that.setData({
          name: res.name,
          address: res.address,
          latitude: res.latitude,
          longitude: res.longitude
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
  qiehuan:function(){
    // 获取ITEM数组长度
    const len = app.globalData.ITEM.length;
    // 定义一个空数组来存储随机选择出来的值
    const arr = [];
    // 循环10次，每次随机选择一个ITEM的值并添加到数组中
    for (let i = 0; i < 5; i++) {
      const index = Math.floor(Math.random() * len);
      arr.push(app.globalData.ITEM[index]);
    }
    this.setData({
      filteredItems:arr,
    })
    console.log(this.data.ITEM)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {
    wx.request({
      url: 'http://localhost:8800/text/findid',
      data: {
        id: app.globalData.item.id, 
      },   
    success: res=> {
      // 解析返回数据
      this.setData({
        ITEM:res.data.data,
        isCollected:res.data.data.zt,
        state:res.data.data.state,
        longitude:res.data.data.longitude,
        latitude:res.data.data.latitude,
        name:'职位详情'
      })
      if(this.data.isCollected){
        this.setData({
          sc:'../../image/收藏2.png',
        })
      }
      else(
        this.setData({
          sc:'../../image/收藏.png'
        })
      )
      if(this.data.state==='未报名'){
        this.setData({
          bm:'../../image/未报名.png',
        })
      }
      else(
        this.setData({
          bm:'../../image/已报名.png'
        })
      )
    }
    })
  },
  sc:function(){
    if(this.data.isCollected){
      this.setData({
      sc:"../../image/收藏.png",
      isCollected:!this.data.isCollected
    })}
    else{
      this.setData({
        sc:"../../image/收藏2.png",
        isCollected:!this.data.isCollected
      })
    }
    wx.request({
      url: 'http://localhost:8800/text/gx',
      data: {
        id: this.data.ITEM.id, 
        zt:this.data.isCollected
      },   
    success: res=> {
      // 解析返回数据
      console.log(res.data)
    }
    })

  // console.log(this.data.sc)
  },
  bm:function(){
    if(this.data.state==='已报名'){
      this.setData({
      bm:"../../image/未报名.png",
      isCollected1:!this.data.isCollected1,
      state:'未报名'
    })}
    else{
      this.setData({
        bm:"../../image/已报名.png",
        isCollected1:!this.data.isCollected1,
        state:'已报名'
      })
    }
    wx.request({
      url: 'http://localhost:8800/text/state',
      data: {
        id: this.data.ITEM.id, 
        state:this.data.state
      },
    success: res=> {
      // 解析返回数据
      console.log(res.data)
    }
    })
  
  // console.log(this.data.sc)
  },
  gt:function(){
    wx.setStorageSync('id', this.data.ITEM.id)
    wx.setStorageSync('name', this.data.ITEM.mz)
    wx.setStorageSync('image', this.data.ITEM.image)
    wx.switchTab({
      url: '/pages/newslist/newslist',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady:function(e) {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.qiehuan()

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