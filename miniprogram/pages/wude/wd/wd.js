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
    //更新用户
    uploadInfo:function(data){
      console.log(data)
    wx.request({
      url: baseurl + '/bcyy-user/user/update',
      method: 'POST',
      header: {
        'token':wx.getStorageSync('token'),
        'content-type': 'application/json'
      },
      data: data,
      success: (res) => {
        console.log(this.data.user)
        wx.showToast({
          title: '更新成功',
          icon: 'success',
          duration: 2000
        });
      }
    })
  },
  // 上传图片
  uploadImage(imagePath){
    const {user}=this.data
    console.log(user)   
    wx.uploadFile({
      url: baseurl + '/bcyy-user/user/image',
      method: 'POST',
      header: {
        token: wx.getStorageSync('token'),
      },
      filePath: imagePath,
      name:"multipartFile",
      success:(res) => {
        const json=JSON.parse(res.data)
        this.setData({
          avatar:json.data
        })
        user.avatar=this.data.avatar
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
    this.uploadInfo(JSON.stringify(formData))
  },
  onDateChange: function (e) {
    this.setData({
      birthDate: e.detail.value,
    });
  },
  getuser(){
    wx.request({
      url: baseurl + '/bcyy-user/user/my',
      method: 'GET',
      header: {
        token: wx.getStorageSync('token'),
      },
      success: res => {
        this.setData({
          user: res.data.data,
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