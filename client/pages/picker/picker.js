Page({
  data: {
    array: ['美国', '中国', '巴西', '日本'],
    index: 0,
    date: '2018-09-22',
    time: '12:01'
  },
  bindPickerChange: function(res) {
    console.log('picker发送选择改变，携带值为:', res.detail.value)
    this.setData({
      index: res.detail.value
    })
  },
  bindDateChange: function(res) {
    this.setData({
      date: res.detail.value
    })
  },
  bindTimeChange: function(res) {
    this.setData({
      time: res.detail.value
    })
  }
})