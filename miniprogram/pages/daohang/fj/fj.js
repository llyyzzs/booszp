// pages/daohang/fj/fj.ts
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:'',
    isCollected1:false,
    isCollected2:false,
    isCollected3:false,
    defaultIndex:0,
    region:'东莞',
    selector1:'不限',
    selector2:'不限',
    selectorItems1:['不限','兼职','全职'],
    selectorItems2:['不限','3K','5K','8K','10K','12K','14K','15K','18K','20K'],
    ITEM:[
      {id:1,zw:"产品经理",xz:"10-20K",gs:"菩提投资",rs:"0-20人",yq:["1-2年","大专","软件开发","包吃包住"],image:"https://ts1.cn.mm.bing.net/th/id/R-C.b8dde23cc5004d52b72a80fd0ada08a7?rik=mqhuk5X74RCawQ&riu=http%3a%2f%2fwww.qzqn8.com%2fwp-content%2fuploads%2f2020%2f02%2f2-9.jpg&ehk=uQhQFxBRle1Na4eVX1sNfaScN9RQDLZ0ekwjRg0vxuA%3d&risl=&pid=ImgRaw&r=0",mz:"廖启明" ,dd:"东莞",lx:"兼职"
      },
      {id:2,zw:"软件开发工程师",xz:"15-16K",gs:"腾讯",rs:"0-20人",yq:["1-2年","大专","软件开发","包吃包住"],image:"https://ts1.cn.mm.bing.net/th/id/R-C.b8dde23cc5004d52b72a80fd0ada08a7?rik=mqhuk5X74RCawQ&riu=http%3a%2f%2fwww.qzqn8.com%2fwp-content%2fuploads%2f2020%2f02%2f2-9.jpg&ehk=uQhQFxBRle1Na4eVX1sNfaScN9RQDLZ0ekwjRg0vxuA%3d&risl=&pid=ImgRaw&r=0",mz:"张三 总经理" ,dd:"深圳",lx:"全职"
      },
      {id:3,zw:"软件开发工程师",xz:"15-16K",gs:"腾讯",rs:"0-20人",yq:["1-2年","大专","软件开发","包吃包住"],image:"https://ts1.cn.mm.bing.net/th/id/R-C.b8dde23cc5004d52b72a80fd0ada08a7?rik=mqhuk5X74RCawQ&riu=http%3a%2f%2fwww.qzqn8.com%2fwp-content%2fuploads%2f2020%2f02%2f2-9.jpg&ehk=uQhQFxBRle1Na4eVX1sNfaScN9RQDLZ0ekwjRg0vxuA%3d&risl=&pid=ImgRaw&r=0",mz:"张三 总经理" ,dd:"深圳",lx:"兼职"
      },
      {id:4,zw:"软件开发工程师",xz:"15-16K",gs:"腾讯",rs:"0-20人",yq:["1-2年","大专","软件开发","包吃包住"],image:"https://ts1.cn.mm.bing.net/th/id/R-C.b8dde23cc5004d52b72a80fd0ada08a7?rik=mqhuk5X74RCawQ&riu=http%3a%2f%2fwww.qzqn8.com%2fwp-content%2fuploads%2f2020%2f02%2f2-9.jpg&ehk=uQhQFxBRle1Na4eVX1sNfaScN9RQDLZ0ekwjRg0vxuA%3d&risl=&pid=ImgRaw&r=0",mz:"张三 总经理" ,dd:"东莞",lx:"全职"
      },
      {id:5,zw:"软件开发工程师",xz:"15-16K",gs:"腾讯",rs:"0-20人",yq:["1-2年","大专","软件开发","包吃包住"],image:"https://ts1.cn.mm.bing.net/th/id/R-C.b8dde23cc5004d52b72a80fd0ada08a7?rik=mqhuk5X74RCawQ&riu=http%3a%2f%2fwww.qzqn8.com%2fwp-content%2fuploads%2f2020%2f02%2f2-9.jpg&ehk=uQhQFxBRle1Na4eVX1sNfaScN9RQDLZ0ekwjRg0vxuA%3d&risl=&pid=ImgRaw&r=0",mz:"张三 总经理" ,dd:"深圳",lx:"兼职"
      },
   ]
  },
  //搜索点击事件
  onInputChange: function (event) {
    this.setData({ keyword: event.detail.value })
  },
  onSearch:function(e){
    const that=this
    wx.request({
      url: '/text',
      data: {
        keyword: this.data.keyword, 
      },   
    success: res=> {
      // 解析返回数据
      console.log(res.data)
      let item = res.data.data;
      // 将新闻列表存储在小程序的数据模型中
      this.setData({
        ITEM: item,
        item:item
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
  selectorChange1: function (e) {
    let i = e.detail.value;//获得选项的数组下标
    let selector1 = this.data.selectorItems1[i];//获得选项的值
    this.setData({selector1:selector1});//将选项名称更新到WXML页面上
    const item = this.data.ITEM.filter(item => {
      const str = item.xz;
      const regex = /^(\d+)/; // 定义一个正则表达式，匹配任意个数字字符
      const matchArray = regex.exec(str); // 将正则表达式应用在字符串上，返回匹配数组
      const numberStr = matchArray[1]; // 取出匹配结果中的第一个子串，即前面的数字序列
      const number = parseInt(numberStr, 10); // 将字符串转换为数字
      let condition2 = number>=this.data.number
      if (this.data.selector1 === '不限') {
          let condition3 = item.dd ===this.data.region; 
        if(this.data.selector2==='不限'){ 
          return (condition3);
        }
        else{
          return (condition2&&condition3);
        }
      } else {    
        let condition1 = item.lx ===this.data.selector1; 
        let condition3 = item.dd ===this.data.region;
        if(this.data.selector2==='不限'){
          return (condition1&&condition3);
        }
        else{ 
          return (condition1&&condition2&&condition3);
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
      this.setData({number:number})
      console.log('提取到的数字是：', number);
    } else {
      console.log('字符串内没有数字！');
    }
    this.setData({selector2:selector2});//将选项名称更新到WXML页面上
    console.log(this.data.selector2,this.data.selector1,this.data.region);
    const item = this.data.ITEM.filter(item => {
      if (this.data.selector2 === '不限') {
          let condition2 = item.lx ===this.data.selector1; 
          let condition3 = item.dd ===this.data.region; 
        if(this.data.selector1==='不限'){ 
          return (condition3);
        }
        else{
          return (condition2&&condition3);
        }
      } else {
        // const salary = item.xz.split('-');
        // let condition1 = salary[0]>=this.data.number
        const str = item.xz;
        const regex = /^(\d+)/; // 定义一个正则表达式，匹配任意个数字字符
        const matchArray = regex.exec(str); // 将正则表达式应用在字符串上，返回匹配数组
        const numberStr = matchArray[1]; // 取出匹配结果中的第一个子串，即前面的数字序列
        const number = parseInt(numberStr, 10); // 将字符串转换为数字
        let condition1 = number>=this.data.number
        let condition2 = item.lx ===this.data.selector1; 
        let condition3 = item.dd ===this.data.region;
        if(this.data.selector1==='不限'){
          return (condition1&&condition3);
        }
        else{ 
          return (condition1&&condition2&&condition3);
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
    let region = str.substring(0, str.length-1);
    this.setData({ region: region});
    console.log(this.data.selector2,this.data.selector1,this.data.region);
    const item = this.data.ITEM.filter(item => {
      const str = item.xz;
      const regex = /^(\d+)/; // 定义一个正则表达式，匹配任意个数字字符
      const matchArray = regex.exec(str); // 将正则表达式应用在字符串上，返回匹配数组
      const numberStr = matchArray[1]; // 取出匹配结果中的第一个子串，即前面的数字序列
      const number = parseInt(numberStr, 10); // 将字符串转换为数字
      const condition1 = item.lx ===this.data.selector1; 
      let condition2 = number>=this.data.number
      const condition3 = item.dd ===this.data.region;
      if(this.data.selector1==='不限'){
         if(this.data.selector2==='不限'){
           return (condition3)
         }else{
          return (condition2&&condition3)
         }
      }
      else{
        if(this.data.selector2==='不限'){
          return (condition1&&condition3)
        }else{
         return (condition1&&condition2&&condition3)
        }
    }
    })
    this.setData({
      item: item,
    })
    console.log(this.data.item)
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function() {
    var that=this
    this.setData({
      ITEM:app.globalData.ITEM
    })
    const item1 = this.data.ITEM.filter(item => {
      return item.dd===that.data.region
    })
    this.setData({
      item: item1,
    }) 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady:function() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:function() {
    // this.onSearch()
    
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide:function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload:function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh:function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom:function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage:function() {

  }
})