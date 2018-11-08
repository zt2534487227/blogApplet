//app.js
var md5 = require('/utils/md5.js');
var util = require('/utils/util.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    var that=this;
    wx.checkSession({
      fail(){
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            console.log(res);
            var time = util.formatTime(new Date);
            var str = that.globalData.signSecret + "&@!" + time + "#*(" + that.globalData.appid;
            wx.request({
              url: that.globalData.baseHttpUrl + '/api/getWxSession',
              data: {
                code: res.code,
                timeStamp: time,
                appId: that.globalData.appid,
                sign: md5.MD5(str)
              },
              method: 'post',
              header: { 'Content-Type': 'application/x-www-form-urlencoded' },
              success: function (res) {
                console.log(res);
                var result=res.data;
                if(result.data){
                  var userToken = result.data;
                  wx.setStorageSync('token', userToken)
                }
              }
            })
          }
        })
      }
    })

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
  

    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    baseHttpUrl:'https://www.zhendehenyouyisi.com',
    baseImageUrl:'https://image.zhendehenyouyisi.com',
    signSecret:'zRiN00nwdY1C1Kfruk5VWQ5e',
    appId:'blog'
  }
})