// pages/item/item.ts
const app = getApp()
const baseurl = app.globalData.baseurl
const token = wx.getStorageSync('token')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ITEM:{
      id:"1"
    },
    bm: "../../image/未报名.png",
    sc: "../../image/收藏.png",
    defaultIndex:0,
    name: "职位详情",
    baseurl:baseurl,
    state:false,
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
        this.getjobResume()
        this.getjl()
        this.setData({
          ITEM: res.data.data,
          // latitude: res.data.data.company.address.latitude,
          // longitude: res.data.data.company.address.longitude
        });
        this.getcompanyjob()
        this.getRandomSF()
        this.getcompany(res.data.data.company.id)
      }
    })
  },
  // 获取公司详情
  getcompany(id) {
    wx.request({
      url: baseurl + '/company/get',
      method: 'GET',
      data: { id: id },
      header: {
        'Authorization': 'Bearer ' + token,
      },
      success: res => {
        console.log(res.data.data)
        this.setData({
          company:res.data.data
        })
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
  select: function (e) {
    const resumeid=this.data.resume[e.detail.value].id
    console.log(resumeid)
    this.postjobResume(resumeid)
  },

  gt: function () {
    const id = this.data.company.user.id;
    const avatar = this.data.company.user.avatar;
    // 进入聊天界面的逻辑 
    wx.navigateTo({
      url: '../news/news?id=' + id + '&avatar=' + avatar,
    })
  },
  // 获取用户收藏
  getcollection() {
    if(token){
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
  }
  },
  // 新增用户收藏
  addcollection(job_id) {
    if(token){
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
  }
  },
  // 删除用户收藏
  deletecollection(id) {
    if(token){
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
  }
  },
  // 获取简历投递状态
  getjobResume() {
    if(token){
    console.log("获取简历投递状态")
    wx.request({
      url: baseurl + '/jobResume/userGet',
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
          state:true,
          bm: "../../image/已报名.png",
        })
      }
      else{
        this.setData({
          state:false,
          bm: "../../image/未报名.png",
        })
      }
      }
    })
  }
  },
  // 获取所有用户简历信息
  getjl(){
    if(token){
    wx.request({
      url: baseurl+'/resume/getAll',
      method:'GET',
      header:{
        'Authorization':'Bearer ' + token,
      },
      success:res=>{  
        const resumeList = res.data.data.map(item => item.name);
        this.setData({
          resumeList:resumeList,
          resume:res.data.data
        }) 
      }
    }) 
  }
  },
  // 投递简历
  postjobResume(resume_id) {
    if(token){
    console.log("投递简历")
    wx.request({
      url: baseurl + '/jobResume/post',
      method: 'POST',
      header: {
        'Authorization': 'Bearer ' + token,
      },
      data:{
        job_id:this.data.ITEM.id,
        resume_id:resume_id
      },
      success: res => {
        console.log("投递成功")
        this.setData({
          state:true,
          bm: "../../image/已报名.png",
        })
      }
    })
  }
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