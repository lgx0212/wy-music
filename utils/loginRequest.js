const baseUrl = "http://localhost:3000"
export default (data = {}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + '/login/cellphone',
      data,
      success: (res) => {
        resolve(res)
      },
      fail: (error) => {
        reject(error)
      }
    })
  })

}