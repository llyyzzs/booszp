// pages/item/item.ts
const app = getApp()
const baseurl = app.globalData.baseurl
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bm: "../../image/未报名.png",
    sc: "../../image/收藏.png",
    defaultIndex: 0,
    name: "工作内容",
    baseurl: baseurl,
    state: false,
    collectID: "",
    communicate:app.globalData.communicate,
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
    const id = this.data.company.id
    wx.navigateTo({
      url: `/pages/company/company?id=${id}`,
    })
  },
  // 获取公司其他招聘信息
  getcompanyjob(id) {
    wx.request({
      url: baseurl + '/bcyy-item/item/get/companyItem',
      method: 'POST',
      header: {
        token: wx.getStorageSync('token'),
      },
      data: {
        companyId: id
      },
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
      url: baseurl + '/bcyy-item/item/get/detail',
      method: 'GET',
      data: {
        id: id
      },
      header: {
        token: wx.getStorageSync('token'),
      },
      success: res => {
        console.log(res.data.data)
        this.getcollection(id)
        this.getcompany(res.data.data.itemCompanyDvo.id)
        this.getUser(res.data.data.hrId)
        this.getCommunicate()
        // this.getjobResume()
        this.getjl()
        this.setData({
          ITEM: res.data.data,
          // latitude: res.data.data.company.address.latitude,
          // longitude: res.data.data.company.address.longitude
        });
        // this.getcompanyjob()
        // this.getRandomSF()
      }
    })
  },
  // 获取公司详情
  getcompany(id) {
    wx.request({
      url: baseurl + '/bcyy-company/company/get/detail',
      method: 'GET',
      data: {
        id: id
      },
      header: {
        token: wx.getStorageSync('token'),
      },
      success: res => {
        console.log(res.data.data)
        this.setData({
          company: res.data.data
        })
        this.getcompanyjob(id)
      }
    })
  },
  //获取HR信息
  getUser(id){
    wx.request({
      url: baseurl+'/bcyy-user/user/get/user',
      method:'GET',
      header:{
        'token':wx.getStorageSync('token'),
      },
      data:{
        openId:id
      },
      success:res=>{
        this.setData({
          HR:res.data.data,
       })
       console.log(this.data.HR)
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
    } else {
      this.addcollection(this.data.ITEM.id)
      this.setData({
        sc: "../../image/收藏2.png",
        isCollected: !this.data.isCollected
      })
    }
  },
  //简历选择
  select: function (e) {
    const resumeid = this.data.resume[e.detail.value].id
    console.log(resumeid)
    this.postjobResume(resumeid)
  },
  //立刻沟通
  gt: function () {
    console.log(this.data.communicate)
    // 遍历communicate数组，查找roomId等于目标roomId的对象
    for (var i = 0; i < this.data.communicate.length; i++) {
      var item = this.data.communicate[i];
      if (item.itemId === this.data.ITEM.id) {
        // 找到匹配的对象
        wx.navigateTo({
          url: '../news/news?id=' + item.roomId + '&avatar=' + this.data.HR.avatar+'&receiverId='+this.data.HR.openid,
        })
        // 或者进行其他操作
        return; // 如果只需要找到第一个匹配对象，可以使用break语句提前结束循环
      }
    }
    wx.request({
      url: baseurl + '/bcyy-chat/chat/addRoom',
      header: {
        token: wx.getStorageSync('token'),
      },
      data: {
        itemId:this.data.ITEM.id,
      },
      success: res => {
        // 进入聊天界面的逻辑 
        wx.navigateTo({
          url: '../news/news?id=' + res.data.data + '&avatar=' + this.data.HR.avatar+'&receiverId='+this.data.HR.openid,
        })
      }
    });
  },
  // 获取用户收藏
  getcollection(id) {
    if (wx.getStorageSync('token')) {
      wx.request({
        url: baseurl + '/bcyy-user/user/getCollectOne',
        method: 'GET',
        header: {
          token: wx.getStorageSync('token'),
        },
        data:{
          itemId:id
        },
        success: res => {
          console.log(res.data.data)
          this.setData({
            isCollected:res.data.data
          })
          if (res.data.data) {
            this.setData({
              sc: "../../image/收藏2.png",
            })
          } else {
            this.setData({
              sc: "../../image/收藏.png",
            })
          }
        }
      })
    }
  },
  //获取沟通
  getCommunicate(){
    wx.request({
      url: baseurl + '/bcyy-user/user/getCommunicate',
      method: 'GET',
      header: {
        token: wx.getStorageSync('token'),
      },
      success: res => {      
        app.globalData.communicate=res.data
        console.log(app.globalData.communicate)
        this.setData({
          communicate:res.data
        })
      }
    })
  
  },
  // 新增用户收藏
  addcollection(id) {
    if (wx.getStorageSync('token')) {
      wx.request({
        url: baseurl + '/bcyy-user/user/addCollect',
        method: 'GET',
        header: {
          token: wx.getStorageSync('token'),
          'content-type': 'application/json'
        },
        data: {
          id
        },
        success: (res) => {
          console.log(res)
        }
      })
    }
  },
  // 删除用户收藏
  deletecollection(id) {
    if (wx.getStorageSync('token')) {
      wx.request({
        url: baseurl + '/bcyy-user/user/deleteCollect',
        method: 'GET',
        data: {
          'id': id
        },
        header: {
          token: wx.getStorageSync('token'),
        },
        success: res => {
          console.log(res.data.data)
        }
      })
    }
  },
  // 获取简历投递状态
  getjobResume() {
    if (wx.getStorageSync('token')) {
      console.log("获取简历投递状态")
      wx.request({
        url: baseurl + '/jobResume/userGet',
        method: 'GET',
        header: {
          token: wx.getStorageSync('token'),
        },
        success: res => {
          console.log(res.data.data)
          const isCollected = res.data.data.filter(item => item.job.id === this.data.ITEM.id)
          console.log(isCollected)
          if (isCollected.length > 0) {
            this.setData({
              state: true,
              bm: "../../image/已报名.png",
            })
          } else {
            this.setData({
              state: false,
              bm: "../../image/未报名.png",
            })
          }
        }
      })
    }
  },
  // 获取所有用户简历信息
  getjl() {
    if (wx.getStorageSync('token')) {
      wx.request({
        url: baseurl + '/bcyy-user/user/getResumeList',
        method: 'GET',
        header: {
          token: wx.getStorageSync('token'),
        },
        success: res => {
          const resumeList = res.data.data.map(item => item.name);
          this.setData({
            resumeList: resumeList,
            resume: res.data.data
          })
        }
      })
    }
  },
  // 投递简历
  postjobResume(resume_id) {
    if (wx.getStorageSync('token')) {
      console.log("投递简历")
      wx.request({
        url: baseurl + '/jobResume/post',
        method: 'POST',
        header: {
          token: wx.getStorageSync('token'),
        },
        data: {
          job_id: this.data.ITEM.id,
          resume_id: resume_id
        },
        success: res => {
          console.log("投递成功")
          this.setData({
            state: true,
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