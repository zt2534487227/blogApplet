var request = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userAccount:'',
    password:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  addAccount:function(e){
    this.setData({ userAccount: e.detail.value })
  },
  addPassword: function (e) {
    this.setData({ password: e.detail.value })
  },
  loginsubmit:function(e){
    var userAccount = this.data.userAccount;
    var password = this.data.password;
    if (userAccount == '' || password==''){
      wx.showToast({
        title: '请输入账号密码',
        icon: "none",
        duration: 2000
      })
      return
    }
    var data = {
      url: '/api/login',
      data: {
        userAccount: userAccount,
        password: password
      },
      callback: function (result) {
        if (result.success){
          var userToken = result.data;
          wx.setStorageSync('token', userToken);
          wx.switchTab ({url: '/pages/user/user'});
        }else{
          var title='失败';
          if(result.msg){
            title = result.msg;
          }
          wx.showToast({
            title: title,
            icon: "none",
            duration: 2000
          })
        }
      }
    }
    request.httpPost(data);


  }
})