const app = getApp()
const baseurl=app.globalData.baseurl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    contentList:[],
    isCollected1: false,
    isCollected2: false,
    isCollected3: false,
    defaultIndex: 0,
    page:1,
    region: '东莞',
    selector1: '不限',
    selector2: '不限',
    selectorItems1: ['不限', '兼职', '全职'],
    selectorItems2: ['不限', '3K', '5K', '8K', '10K', '12K', '14K', '15K', '18K', '20K'],
  },
  //搜索点击事件
  onInputChange: function (event) {
    this.setData({ keyword: event.detail.value })
  },
  onSearch: function (e) {
    const that = this
    wx.request({
      url: '/text',
      data: {
        keyword: this.data.keyword,
      },
      success: res => {
        // 解析返回数据
        console.log(res.data)
        let item = res.data.data;
        // 将新闻列表存储在小程序的数据模型中
        this.setData({
          ITEM: item,
          item: item
        });
        const item1 = this.data.ITEM.filter(item => {
          return item.position.city === that.data.region
        })
        this.setData({
          item: item1,
        })
      }
    })

  },
  selectorChange1: function (e) {
    let i = e.detail.value;//获得选项的数组下标
    let selector1 = this.data.selectorItems1[i];//获得选项的值
    this.setData({ selector1: selector1 });//将选项名称更新到WXML页面上
    const item = this.data.contentList.filter(item => {
      const str = item.price;
      const regex = /^(\d+)/; // 定义一个正则表达式，匹配任意个数字字符
      const matchArray = regex.exec(str); // 将正则表达式应用在字符串上，返回匹配数组
      const numberStr = matchArray[1]; // 取出匹配结果中的第一个子串，即前面的数字序列
      const number = parseInt(numberStr, 10); // 将字符串转换为数字
      let condition2 = number >= this.data.number
      if (this.data.selector1 === '不限') {
        let condition3 = item.position.city === this.data.region;
        if (this.data.selector2 === '不限') {
          return (condition3);
        }
        else {
          return (condition2 && condition3);
        }
      } else {
        let condition1 = item.jobtype === this.data.selector1;
        let condition3 = item.position.city === this.data.region;
        if (this.data.selector2 === '不限') {
          return (condition1 && condition3);
        }
        else {
          return (condition1 && condition2 && condition3);
        }
      }
    })
    this.setData({
      item: item,
    })
  },
  selectorChange2: function (e) {
    let i = e.detail.value;//获得选项的数组下标
    let selector2 = this.data.selectorItems2[i];//获得选项的值
    const str = selector2;
    const regex = /^(\d+)/; // 定义一个正则表达式，匹配任意个数字字符
    const matchArray = regex.exec(str); // 将正则表达式应用在字符串上，返回匹配数组
    if (matchArray && matchArray.length > 1) {
      const numberStr = matchArray[1]; // 取出匹配结果中的第一个子串，即前面的数字序列
      const number = parseInt(numberStr, 10); // 将字符串转换为数字
      this.setData({ number: number })
      console.log('提取到的数字是：', number);
    } else {
      console.log('字符串内没有数字！');
    }
    this.setData({ selector2: selector2 });//将选项名称更新到WXML页面上
    console.log(this.data.selector2, this.data.selector1, this.data.region);
    const item = this.data.contentList.filter(item => {
      if (this.data.selector2 === '不限') {
        let condition2 = item.type === this.data.selector1;
        let condition3 = item.position.city === this.data.region;
        if (this.data.selector1 === '不限') {
          return (condition3);
        }
        else {
          return (condition2 && condition3);
        }
      } else {
        // const salary = item.price.split('-');
        // let condition1 = salary[0]>=this.data.number
        const str = item.price;
        const regex = /^(\d+)/; // 定义一个正则表达式，匹配任意个数字字符
        const matchArray = regex.exec(str); // 将正则表达式应用在字符串上，返回匹配数组
        const numberStr = matchArray[1]; // 取出匹配结果中的第一个子串，即前面的数字序列
        const number = parseInt(numberStr, 10); // 将字符串转换为数字
        let condition1 = number >= this.data.number
        let condition2 = item.type === this.data.selector1;
        let condition3 = item.position.city === this.data.region;
        if (this.data.selector1 === '不限') {
          return (condition1 && condition3);
        }
        else {
          return (condition1 && condition2 && condition3);
        }
      }
    })
    this.setData({
      item: item,
    })
    console.log(item)
  },
  regionChange: function (e) {
    let str = e.detail.value[1];//获得选择的省市区
    let region = str;
    this.setData({ region: region });
    console.log(this.data.selector2, this.data.selector1, this.data.region);
    const item = this.data.contentList.filter(item => {
      const str = item.price;
      const regex = /^(\d+)/; // 定义一个正则表达式，匹配任意个数字字符
      const matchArray = regex.exec(str); // 将正则表达式应用在字符串上，返回匹配数组
      const numberStr = matchArray[1]; // 取出匹配结果中的第一个子串，即前面的数字序列
      const number = parseInt(numberStr, 10); // 将字符串转换为数字
      const condition1 = item.type === this.data.selector1;
      let condition2 = number >= this.data.number
      const condition3 = item.position.city === this.data.region;
      if (this.data.selector1 === '不限') {
        if (this.data.selector2 === '不限') {
          return (condition3)
        } else {
          return (condition2 && condition3)
        }
      }
      else {
        if (this.data.selector2 === '不限') {
          return (condition1 && condition3)
        } else {
          return (condition1 && condition2 && condition3)
        }
      }
    })
    this.setData({
      item: item,
    })
    console.log(this.data.item)
  },
  tiaozhuan: function (e) {
    // var id = contentList[e.currentTarget.dataset.id].id
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/item/item?id=${id}`,
    })
  },
  // 获取招聘信息
  getjob(page) {
    const token = wx.getStorageSync('token')
    wx.request({
      url: baseurl + '/job/getAll',
      method: 'GET',
      data: { page: page },
      header: {
        'Authorization': 'Bearer ' + token,
      },
      success: res => {
        const updatedList = this.data.contentList.concat(res.data.data);
        console.log(updatedList)
        this.setData({
          contentList: updatedList,
          page: page + 1,
          loading: false
        });
      }
    })
  },
  /**
* 生命周期函数--监听页面加载
*/
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
  onLoad: function () {

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
    // this.onSearch()
    this.getjob(this.data.page);
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
    // 页面滚动到底部时的操作
    console.log("触底加载")
    this.loadMoreData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})