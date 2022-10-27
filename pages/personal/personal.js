// pages/personal/personal.js
import request from '../../utils/request'
let startY = 0
let moveY = 0
let moveDistance = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform: 'translateY(0)',
    coverTransition: '',
    userInfo: {},
    recentMusicList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  handleTouchStart(evevt) {
    startY = evevt.touches[0].clientY
    this.setData({
      coverTransition: 'all .3s'
    })
  },
  handleTouchMove(evevt) {
    moveY = evevt.touches[0].clientY
    moveDistance = moveY - startY
    if (moveDistance < 0) return
    if (moveDistance >= 80) moveDistance = 80
    this.setData({
      coverTransform: `translateY(${moveDistance}rpx)`
    })
  },
  handleTouchEnd() {
    this.setData({
      coverTransform: `translateY(0)`,
      coverTransition: 'all .5s'
    })
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
    let that = this
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        that.setData({
          userInfo: JSON.parse(res.data)
        })
        request('/user/record', {
          uid: that.data.userInfo.userId,
          type: 1
        }).then(res => {
          that.setData({
            recentMusicList: res.weekData.slice(0,10)
          })
        })
      }
    })
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