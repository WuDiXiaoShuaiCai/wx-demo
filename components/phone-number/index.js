// components/dialog/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    actions: [
      { name: '请求获取用户手机号', color: '#07c160', openType: 'getPhoneNumber' },
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose () {
      this.triggerEvent('close')
    },
    getPhoneNumber (event) {
      this.triggerEvent('getphonenumber', event)
    }
  }
})
