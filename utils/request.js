var util = require('util.js');
var md5 = require('md5.js');
const app = getApp();
module.exports = {
  httpPost: httpPost
}
function sign(timeStamp) {
  var str = app.globalData.signSecret + "&@!" + timeStamp + "#*(" + app.globalData.appid;
  return md5.MD5(str)
}

function httpPost(data) {
  var key = data.url + "_" + data.data;
  var val = util.getStorage(key);
  if (!val) {
    util.putStorage(key, data, 60)
  } else {
    wx.showToast({
      title: "服务器正在加载，请耐心等候",
      icon: "none",
      duration: 2000
    });
    return;
  }
  var url = app.globalData.baseHttpUrl + data.url;
  var timeStamp = util.formatTime(new Date);
  data.data.timeStamp = timeStamp;
  data.data.appId = app.globalData.appid;
  data.data.sign = sign(timeStamp);
  wx.request({
    url: url,
    method: 'post',
    data: data.data,
    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      if (typeof data.callback == 'function') {
        data.callback(res.data);
      }
    },
    complete: function (res) {
      util.rmStorage(key);
    }
  })

}