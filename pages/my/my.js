import {
  ClassicModel
} from '../../models/classic.js'
import {
  BookModel
} from '../../models/book.js'

import {
  promisic
} from '../../util/common.js'

const classicModel = new ClassicModel()
const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null,
    showPhoneModal: false
  },

  onShow(options) {
    this.getUserInfo()
    this.getMyBookCount()
    this.getMyFavor()
  },

  getMyFavor() {
    classicModel.getMyFavor(res => {
      this.setData({
        classics: res
      })
    })
  },

  getMyBookCount() {
    bookModel.getMyBookCount()
      .then(res => {
        this.setData({
          bookCount: res.count
        })
      })
  },
  // 从缓存中获取
  getUserInfo () {
    const userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      return
    }
    this.setData({
      authorized: true,
      userInfo
    })
  },
  // 获取手机号
  getMobileNumber () {
    this.setData({
      showPhoneModal: true
    })
  },
  closePhoneModal () {
    this.setData({
      showPhoneModal: false
    })
  },
  getPhoneNumber (event) {
    console.log(event)
  },
  async getUserProfile () {
    const { userInfo } = await promisic(wx.getUserProfile)({desc: '获取用户头像，昵称'})
    this.setData({
      authorized: true,
      userInfo
    }, this.getMobileNumber)
    wx.setStorageSync('userInfo', userInfo)
  },

  userAuthorized1() {
    promisic(wx.getSetting)()
      .then(data => {
        if (data.authSetting['scope.userInfo']) {
          return promisic(wx.getUserInfo)()
        }
        return false
      })
      .then(data => {
        if (!data) return 
        this.setData({
          authorized: true,
          userInfo: data.userInfo
        })
      })
  },

  async userAuthorized2(){
    const data = await promisic(wx.getSetting)()
    console.log(data)
    if (data.authSetting['scope.userInfo']) {
       const res =  await promisic(wx.getUserInfo)()
       const userInfo = res.userInfo
       this.setData({
         authorized: true,
         userInfo
       })
    }
  },


  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        }
      }
    })
  },

  onJumpToAbout(event) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },

  onStudy(event) {
    wx.navigateTo({
      url: '/pages/course/course',
    })
  },

  onJumpToDetail(event){
    const cid = event.detail.cid
    const type = event.detail.type
    // wx.navigateTo
    wx.navigateTo({
      url:`/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`
    })
  }


})









    // wx.navigateTo({
    //   url:`/pages/classic-detail/index?cid=${cid}
    //     &type=${type}`
    // })