var md5 = require('md5.js');
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day, hour, minute, second].map(formatNumber).join('')
  // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  putStorage: putStorage,
  getStorage: getStorage,
  rmStorage: rmStorage,
  phoneCheck: phoneCheck,
  numberCheck: numberCheck,
  eMailCheck: eMailCheck
}



//设置有时效的缓存
function putStorage(key,value,time){
  wx.setStorageSync(key, value)
  var seconds=parseInt(time);
  if(seconds>0){
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000 + seconds;
    wx.setStorageSync(key + "_deadtime", timestamp + "")
  } else {
    wx.removeStorageSync(key + "_deadtime")
  }
}

function getStorage(key) {
  var deadtime = parseInt(wx.getStorageSync(key + "_deadtime"))
  if (deadtime) {
    //缓存已失效
    if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
      wx.removeStorageSync(key+"_deadtime")
      wx.removeStorageSync(key)
      return null;
    }
  }
  var res = wx.getStorageSync(key);
  if (res)  return res;
  else return null;
}

function rmStorage(key) {
    wx.removeStorageSync(key + "_deadtime")
    wx.removeStorageSync(key)
}

function eMailCheck(eMail){
  if (eMail == undefined || eMail == null || eMail == '') return false;
  var str = /^[a-zA-Z0-9_]+@[a-zA-Z0-9_]+(\.[a-zA-Z]+)+$/;
  if (str.test(eMail)) {
    return true;
  } else {
    return false;
  }
}

function phoneCheck(phonenum){
  if (phonenum == undefined || phonenum == null || phonenum == '') return false;
  var str = /^((13[0-9])|(17[0-9])|(16[0-9])|(19[0-9])|(14[0-9])|(15[0-9])|(18[0-9]))\d{8}$/;
  if (str.test(phonenum)) {
    return  true;
  }else{
    return false;
  }
}

function numberCheck(num){
  if (num == undefined || num == null || num == '') return false;
  var str = /^[0-9]+(.[0-9]{1,2})?$/;
  if (str.test(num)) {
    return true;
  } else {
    return false;
  }

}