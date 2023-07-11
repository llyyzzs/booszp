// pages/wude/wd/wd.ts
const app = getApp()
const baseurl = app.globalData.baseurl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: undefined,
    currentDate: new Date().toISOString().slice(0, 10), // 当前日期
    birthDate: new Date().toISOString().slice(0, 10), // 出生日期
    selectorItems: ['初中', '中专及中技', '高中', '大专', '本科', '硕士', '博士', '博士后'], // 选择框中的选项列表
    selectedValue: '无' // 当前选择的值
  },
  /**
   * 选择图片事件
   */
  chooseImage: function () {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        this.uploadImage(res.tempFilePaths[0]);
      },
    });
  },
  uploadInfo:function(data){
    const token = wx.getStorageSync('token')
    wx.request({
      url: baseurl + '/user/update',
      method: 'POST',
      header: {
        'Authorization': 'Bearer ' + token,
        'content-type': 'application/json'
      },
      data: data,
      success: (res) => {
        console.log(this.data.user)
      }
    })
  },
  uploadImage(imagePath){
    const {user}=this.data
    console.log(user)
    const token = wx.getStorageSync('token')       
    wx.uploadFile({
      url: baseurl + '/file/upload',
      method: 'POST',
      header: {
        'Authorization': 'Bearer ' + token,
      },
      filePath: imagePath,
      name:"file",
      success:(res) => {
        const json=JSON.parse(res.data)
        this.setData({
          avatar:json.data
        })
        user.avatar=this.data.avatar
        this.uploadInfo(user)
        this.getAvatar()
      }
    })
  },
  handleSelect(e) {
    const index = e.detail.value; // 获取选中的索引值
    const selectedValue = this.data.selectorItems[index]; // 根据索引获取选中的值
    this.setData({ selectedValue });
  },
  onSubmit: function (e) {
    const formData = e.detail.value;
    formData.degree = this.data.selectedValue;
    formData.phone = parseInt(formData.phone)
    formData.id = this.data.user.id;
    formData.avatar = this.data.user.avatar
    this.uploadInfo(JSON.stringify(formData))
  },
  onDateChange: function (e) {
    this.setData({
      birthDate: e.detail.value,
    });
  },
  getAvatar() {
    this.setData({
      avatarUrl: baseurl + '/file/download/' + this.data.user.avatar
    })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
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
    app.globalData.user= this.data.user
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