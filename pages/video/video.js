// pages/video/video.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList: [],
    videoItemList:[],
    navId:0,
    isTriggered: false,
    videoListOffset:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    request('/video/group/list').then(res => {
      this.setData({
        videoList:res.data.slice(0,10),
        navId:res.data[0].id
      })
      this.getVideoItemList(this.data.navId)
    })
  },
  handleNav(event){
    this.setData({
      navId:event.currentTarget.id
    })
    this.getVideoItemList(event.currentTarget.id)
  },
  getVideoItemList(id){
    this.setData({
      videoItemList:[],
      videoListOffset:0
    })
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    request('/video/group',{id,cookie:wx.getStorageSync('cookies').join(";"),offset:this.data.videoListOffset}).then(res=>{
      this.setData({
        videoItemList:res.datas,
        isTriggered:false
      })
      wx.hideLoading({})
    })
  },
  // 点击播放/继续播放的回调
  handlePlay(event){
    /*
      问题： 多个视频同时播放的问题
    * 需求：
    *   1. 在点击播放的事件中需要找到上一个播放的视频
    *   2. 在播放新的视频之前关闭上一个正在播放的视频
    * 关键：
    *   1. 如何找到上一个视频的实例对象
    *   2. 如何确认点击播放的视频和正在播放的视频不是同一个视频
    * 单例模式：
    *   1. 需要创建多个对象的场景下，通过一个变量接收，始终保持只有一个对象，
    *   2. 节省内存空间
    * */
    
    let vid = event.currentTarget.id;
    // 关闭上一个播放的视频
    this.vid !== vid && this.videoContext && this.videoContext.stop();
    if(this.vid !== vid){
      if(this.videoContext){
        this.videoContext.stop()
      }
    }
    this.vid = vid;
    
    // 更新data中videoId的状态数据
    // this.setData({
    //   videoId: vid
    // })
    // 创建控制video标签的实例对象
    this.videoContext = wx.createVideoContext(vid);
    // 判断当前的视频之前是否播放过，是否有播放记录, 如果有，跳转至指定的播放位置
    // let {videoUpdateTime} = this.data;
    // let videoItem = videoUpdateTime.find(item => item.vid === vid);
    // if(videoItem){
    //   this.videoContext.seek(videoItem.currentTime);
    // }
    // this.videoContext.play();
    // this.videoContext.stop();
  },
  playVideo(event){
    const that = this
    let videoItemList = this.data.videoItemList
    videoItemList[event.currentTarget.id*1].showVideo = true
    request("/video/url",{id:videoItemList[event.currentTarget.id*1].data.vid}).then(res=>{
      videoItemList[event.currentTarget.id*1].videoUrl = res.urls[0].url
      that.setData({
        videoItemList:videoItemList
      })
    })
    
  },
  handlerefresh(){
    this.getVideoItemList(this.data.navId)
  },
  handletolower(){
    //追加数据，上拉加载更多
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    let videoListOffset = this.data.videoListOffset
    this.setData({
      videoListOffset:videoListOffset*1 + 1
    })
    request('/video/group',{id:this.data.navId,cookie:wx.getStorageSync('cookies').join(";"),offset:this.data.videoListOffset}).then(res=>{
      
      this.setData({
        videoItemList:[...this.data.videoItemList,...res.datas]
      })
      wx.hideLoading({})
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