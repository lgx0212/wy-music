// pages/login/login.js
import request from '../../utils/request'
import loginRequest from '../../utils/loginRequest'
// import simulatedData from './simulatedData'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  formInput(event) {
    let type = event.currentTarget.id
    this.setData({
      [type]: event.detail.value
    })
  },
  login() {
    if (!this.data.phone) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'error'
      })
      return
    }
    let phoneReg = /^1[3-9]\d{9}$/
    if (!phoneReg.test(this.data.phone)) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'error'
      })
      return
    }
    if (!this.data.password) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'error'
      })
      return
    }
    loginRequest({
      phone: this.data.phone,
      password: this.data.password
    }).then(res => {
      if (res.data.code === 200) {
        wx.setStorageSync('cookies', res.cookies)
        wx.setStorageSync('userInfo', JSON.stringify(res.data.profile))
        wx.navigateBack({
          delta: 1,
        })
      } else {
        wx.showToast({
          title: '账号或密码错误',
          icon: 'error'
        })
      }
    })
    // wx.setStorageSync('userInfo', JSON.stringify(simulatedData.profile))
    // wx.navigateBack({
    //   delta: 1,
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})