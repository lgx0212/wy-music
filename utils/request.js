const baseUrl = "http://localhost:3000"
export default (url, data={}, method="GET") => {
  return new Promise((resolve, reject) => {
    wx.request({
      url:baseUrl+url,
      data,
      method,
      header:{
        cookie:wx.getStorageSync('cookies')?wx.getStorageSync('cookies').join(";"):''
      },
      success: (res) => {
        resolve(res.data)
      },
      fail: (error) => {
        reject(error)
      }
    })
  })

}