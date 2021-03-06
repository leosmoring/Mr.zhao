// pages/iThink/iThink.js
const app = getApp();
const util = require("../../utils/util.js");
const api = require("../../api/index.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    maskClassName: "columnCenter",
    needShouQuan: true,
    isRegister: false,
    phoneNumber: "", // 手机号
    verificationCode: "", // 验证码
    showTime: false,
    time: 60,
    throwError: false
  },
  onLoad: function(options) {},
  onShow() {
    // 没有授权数据
    if (!app.globalData.userInfo) {
      this.setData({
        needShouQuan: true
      });
    } else {
      // 有授权数据
      this.setData({
        needShouQuan: false
      });
      this.login();
    }
  },
  // 授权登录
  bindGetUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      needShouQuan: false
    });
    this.login();
  },
  login() {
    var that = this;
    wx.login({
      success(res) {
        if (res.code) {
          util
            .promiseRequest(api.login, {
              wxcode: res.code
            })
            .then(response => {
              var data = response.data.response_data;
              console.log(data);
              if (data && data.result === true) {
                //已登录 true
                // 直接存储数据
                app.globalData.userData = data;
                app.globalData.openid = data.openid;
                app.globalData.access_token = data.access_token;
                wx.Storage.setItem("token", data.access_token);
                console.log("app.globalData-----------------------");
                console.dir(app.globalData);
                that.delayToIndex();
                wx.yue.pub("hasToken", data.access_token);
              } else if (data.result === false) {
                app.globalData.openid = data.openid;
                // 需要去注册
                that.setData({
                  isRegister: true
                });
              }
            });
        }
      }
    });
  },
  getVerificationCode() {
    var y = this;
    var yData = this.data;
    var phoneNumber = yData.phone.replace(/\s+/g, "");
    var isPhoneNumber = util.checkType(phoneNumber, "phone");
    if (phoneNumber != "" && isPhoneNumber) {
      util
        .promiseRequest(api.verificationCode, {
          mobile: phoneNumber
        })
        .then(res => {
          if (res.data.response_data.lists === "发送成功") {
            y.setData({
              showTime: true
            });
            // 开始计时
            y.timing();

            util.toast("短信发送成功...");
          } else {
            util.toast("故障，请稍后重试...");
          }
        });
    } else {
      util.toast("手机号码有误...");
    }
  },
  timing() {
    var y = this,
      num = y.data.time,
      timeOut;
    timeOut = setInterval(() => {
      y.setData({
        time: num >= 0 ? num-- : 0
      });
      if (num === 0) {
        clearInterval(timeOut);
        y.setData({
          showTime: false
        });
      }
    }, 1000);
  },
  bindKeyInput(e) {
    var data = e.currentTarget.dataset,
      value = e.detail.value;
    if (data.name === "phone") {
      //正则过滤
      value = value.replace(
        /[\u4E00-\u9FA5`~!@#$%^&*()_+<>?:"{},.\/;'[\]\-\sa-zA-Z]*/g,
        ""
      );
      let result = [];
      for (let i = 0; i < value.length; i++) {
        if (i == 3 || i == 7) {
          result.push(" ", value.charAt(i));
        } else {
          result.push(value.charAt(i));
        }
      }
      this.setData({
        phone: result.join("")
      });
    } else {
      this.setData({
        verificationCode: value
      });
    }
  },

  shouQuan() {
    var y = this,
      yData = y.data;
    if (app.globalData.userInfo) {
      var userInfo = app.globalData.userInfo;
      var paramObj = {
        mobile: yData.phone.replace(/\s+/g, ""),
        code: yData.verificationCode,
        openid: app.globalData.openid,
        img_url: userInfo.avatarUrl,
        sex: userInfo.gender === 2 ? 1 : 0, // 1 =》男性，值为2时是女性，值为0时是未知
        nickname: userInfo.nickName,
        invite_id: app.globalData.inviteId || 0 // 邀请id
      };
      util
        .promiseRequest(api.register, paramObj)
        .then(res => {
          // console.log("注册后获得的数据----------")
          var data = res.data.response_data;
          // console.log(data);
          if (data.access_token) {
            app.globalData.access_token = data.access_token;
            wx.Storage.setItem("token", data.access_token);
            y.delayToIndex();
          }
        })
        .catch(error => {
          y.setData({
            throwError: true
          });
        });
    } else {
      // 没有用户信息请求授权
      this.setData({
        isShouQuan: false
      });
    }
  },
  delayToIndex() {
    wx.showToast({
      title: "您已注册成功...",
      icon: "none",
      duration: 1000,
      complete: function() {
        setTimeout(() => {
          app.toIndex();
        }, 1000);
      }
    });
  },

  goLastPage() {
    app.returnLastPage();
  }
});
