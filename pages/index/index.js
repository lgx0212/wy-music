// pages/index/index.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannderList:[],
    recommendList:[],
    topList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    request('/banner',{type:2}).then(res=>{
      this.setData({
        bannderList:res.banners
      })
    })
    request('/personalized',{limit:10}).then(res=>{
      this.setData({
        recommendList:res.result
      })
    })
    // 接口被弃用
    // let arr = []
    // for(let i = 0; i < 5; i++){
    //   await request('/top/list',{idx:i}).then(res=>{
    //     let item = {
    //       name:res.playlist.name,
    //       tracks:res.playlist.tracks.slice(0,3)
    //     }
    //     arr.push(item)
    //     this.setData({
    //       topList:arr
    //     })
    //   })
    // }
  },

  recommended(){
    wx.navigateTo({
      url: '/pages/index/recommended/recommended',
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