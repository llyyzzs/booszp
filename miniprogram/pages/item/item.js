// pages/item/item.ts
const app = getApp()
const baseurl = app.globalData.baseurl
const token = wx.getStorageSync('token')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    item: [],
    name: "职位详情",
    baseurl:baseurl,
    job: [
      "与设计师、后端工程师和产品经理合作，理解产品需求和UI设计",
      "使用HTML/CSS/JavaScript等前端技术，完成Web页面及交互功能的开发",
      "根据产品和用户反馈进行调整和优化网站性能",
      "研究并掌握前端新技术和框架，保持技术更新",
      "与后端工程师配合完成数据交互和业务逻辑",
      "编写模块化、可重用代码，确保代码质量和易于维护",
      "负责确保网站在不同浏览器和设备上的兼容性",
      "与QA人员协同工作，确保项目的质量和稳定性",
      "参与团队的知识分享和技术交流，促进团队技术水平的提高"
    ],
    markers: [{
      id: 1,
      latitude: 23.1314,
      longitude: 113.2693,
      width: 32, // 标记的宽度
      height: 32, // 标记的高度
      label: {
        content: '腾讯'
      }
    }],
    biaoqian: ["多线程", "Springboot", "vue3", "MySQL"],
    nr: ["任职要求:", "1、具有扎实的计算机基础理论知识、多线程编程、网络编程、熟练应用成熟的分布式缓存、分布式存储技术方案；", "2、拥有两年以上Java相关开发经验；", "3、熟练使用Spring，Hibernate，Mybatis等开源框架进行开发；", "4、熟悉基于MySQL、Orcale 等关系型数据库的设计和开发；", "5、熟悉Linux命令，有Linux环境下开发经验与技能优先；", "6、有Redis，MongoDB等开源NoSQL数据库的相关知识或技能优先；", "7、有财经、金融互联网网站开发经验者优先。"],
    item:{
      name:"",
      price:"",
      position:{},
      company:{
      },
      id:"",
      degree:"",
      description:"",
      work:"",
    }
  },
  getRandomSF: function () {
    var sf = ["HR", "人事经理", "部长"];
    var randomIndex = Math.floor(Math.random() * sf.length);
    this.setData({
      sf: sf[randomIndex]
    })
  },
  // 切换招聘展示内容
  qh: function (e) {
    const name = e.currentTarget.dataset.name
    this.setData({
      name: name
    })
    console.log(name)
  },
  // 选择地址
  chooseLocation: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          name: res.name,
          address: res.address,
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
  },
  // 跳转到其它的招聘信息
  tiaozhuan: function (e) {
    // var id = contentList[e.currentTarget.dataset.id].id
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/item/item?id=${id}`,
    })
  },
  // 跳转到公司详情信息
  company: function (e) {
    const id = this.data.ITEM.company.id
    wx.navigateTo({
      url: `/pages/company/company?id=${id}`,
    })
  },
  // 获取公司其他招聘信息
  getcompanyjob() {
    wx.request({
      url: baseurl + '/job/getCompany',
      method: 'GET',
      header: {
        'Authorization': 'Bearer ' + token,
      },
      data: { id: this.data.ITEM.company.id },
      success: res => {
        console.log(res.data)
        this.setData({
          filteredItems: res.data.data
        })
      }
    })
  },
  // 获取招聘信息详情
  getjob(id) {
    wx.request({
      url: baseurl + '/job/get',
      method: 'GET',
      data: { id: id },
      header: {
        'Authorization': 'Bearer ' + token,
      },
      success: res => {
        console.log(res.data.data)
        this.getcollection()
        this.setData({
          ITEM: res.data.data,
          latitude: res.data.data.company.address.latitude,
          longitude: res.data.data.company.address.longitude
        });
        this.getcompanyjob()
        this.getRandomSF()
      }
    })
  },
  // 获取收藏状态
  sc: function () {
    if (this.data.isCollected) {
      this.deletecollection(this.data.ITEM.id)
      this.setData({
        sc: "../../image/收藏.png",
        isCollected: !this.data.isCollected
      })
    }
    else {
      this.addcollection(this.data.ITEM.id)
      this.setData({
        sc: "../../image/收藏2.png",
        isCollected: !this.data.isCollected
      })
    }
  },
  bm: function () {
    if (this.data.state === '已报名') {
      this.setData({
        bm: "../../image/未报名.png",
        isCollected1: !this.data.isCollected1,
        state: '未报名'
      })
    }
    else {
      this.setData({
        bm: "../../image/已报名.png",
        isCollected1: !this.data.isCollected1,
        state: '已报名'
      })
    }
    wx.request({
      url: '/text/state',
      data: {
        id: this.data.ITEM.id,
        state: this.data.state
      },
      success: res => {
        // 解析返回数据
        console.log(res.data)
      }
    })

    // console.log(this.data.sc)
  },
  gt: function () {
    wx.setStorageSync('id', this.data.ITEM.id)
    wx.setStorageSync('name', this.data.ITEM.mz)
    wx.setStorageSync('image', this.data.ITEM.image)
    wx.switchTab({
      url: '/pages/newslist/newslist',
    })
  },
  // 获取用户收藏
  getcollection() {
    wx.request({
      url: baseurl + '/job/collection/getAll',
      method: 'GET',
      header: {
        'Authorization': 'Bearer ' + token,
      },
      success: res => {
        console.log(res.data.data)
        const isCollected=res.data.data.filter(item=>item.job.id===this.data.ITEM.id)
        console.log(isCollected)
        if (isCollected.length>0) {
          this.setData({
            sc: "../../image/收藏2.png",
            isCollected: true
          })
        }
        else {
          this.setData({
            sc: "../../image/收藏.png",
            isCollected: false
          })
        }
      }
    })
  },
  // 新增用户收藏
  addcollection(job_id) {
    wx.request({
      url: baseurl + '/job/collection/add',
      method: 'POST',
      header: {
        'Authorization': 'Bearer ' + token,
        'content-type': 'application/json'
      },
      data: {job_id},
      success: (res) => {
        console.log(this.data.user)
      }
    })
  },
  // 删除用户收藏
  deletecollection(id) {
    wx.request({
      url: baseurl + '/job/collection/delete',
      method: 'POST',
      data: id,
      header: {
        'Authorization': 'Bearer ' + token,
      },
      success: res => {
        console.log(res.data.data)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    this.getjob(id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // this.qiehuan()

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