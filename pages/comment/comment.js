var request = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList: [],
    pageSize: 10,
    pageNo: 1,
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var token = wx.getStorageSync('token')
    var data = {
      url: '/api/user/commentList',
      data: {
        token: token.token
      },
      callback: function (result) {
        if(result.data){
          that.setData({
            commentList: result.data.records,
            pageSize: result.data.size,
            pageNo: result.data.current,
            total: result.data.total
          })
        }
      }
    }
    request.httpPost(data);
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