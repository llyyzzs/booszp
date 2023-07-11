// pages/jl/jl.ts
const app = getApp()
const baseurl = app.globalData.baseurl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: "无",
    showDropdown: false,
    currentDate: new Date().toISOString().slice(0, 10), // 当前日期
    birthDate: new Date().toISOString().slice(0, 10), // 出生日期
  },
  toggleDropdown: function() {
    this.setData({
      showDropdown: !this.data.showDropdown
    });
  },
  getuser(){
    const token = wx.getStorageSync('token')
    wx.request({
      url: baseurl + '/user/get',
      method: 'GET',
      header: {
        'Authorization': 'Bearer ' + token,
      },
      success: res => {
        this.setData({
          user: res.data.data,
          avatar:res.data.data.avatar,
        })
        // 解析返回数据
        if (res.data.data.degree != "") {
          this.setData({
            selectedValue: res.data.data.degree
          })
        }
        else{
          this.setData({selectedValue:"无"})
        }
        if(res.data.data.birthday!=""){
          this.setData({birthDate:res.data.data.birthday})
        }
        if (res.data.data.gender === "") {
          console.log("gender为空");
          var gender = "男"
        }
        else {
          var gender = res.data.data.gender
        }
        if (gender == "男") {
          this.setData({
            user: res.data.data,
            birthDate: res.data.data.date,
            checked: true
          })
        }
        else {
          this.setData({
            user: res.data.data,
            birthDate: res.data.data.date,
            checked: false
          })
        }
        this.getAvatar()
      },
    })
  },
  regionChange(e) {
    this.setData(
      {
        address: e.detail.value[0] + e.detail.value[1],
        province: e.detail.value[0],
        city: e.detail.value[1]
      }
    )
  },
  updata(formData) {
    const token = wx.getStorageSync('token')
    wx.request({
      url: baseurl + '/resume/update',
      method: 'POST',
      data: formData,
      header: {
        'Authorization': 'Bearer ' + token,
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res.data)
      }
    })
  },
  onSubmit: function (e) {
    var formData = e.detail.value;
    if (this.data.resume.id != null) {
      formData.id = this.data.resume.id
    }
    formData.address = {};
    formData.address.city = this.data.city;
    formData.address.province = this.data.province;
    console.log(formData)
    this.updata(formData)
  },
  onDateChange: function (e) {
    this.setData({
      birthDate: e.detail.value,
    });
  },
   // 获取简历信息
   getjl(){
    const token=wx.getStorageSync('token')
    wx.request({
      url: baseurl+'/resume/get',
      method:'GET',
      data:{id:this.data.resume.id},
      header:{
        'Authorization':'Bearer ' + token,
      },
      success:res=>{    
        this.setData({
          resume:res.data.data
        }) 
      if(res.data.data.address!=""){
        this.setData({
          address:res.data.data.address.province+res.data.data.address.city
        }) 
      }
       console.log(res.data)
      }
    }) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const resumeStr = options.resume
    const resume = JSON.parse(resumeStr)
    this.setData({
      resume: resume
    })
    this.getjl()
    this.getuser()
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