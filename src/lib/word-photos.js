import $ from 'jquery'
import Helper from './helper'
import Config from './config'

export default {
  savePhoto(word, url, callback) {
    $.getJSON(
      `${Config.savePhoto}?id=${word.hskId}&word=${
        word.simplified
      }&url=${encodeURIComponent(url)}`,
      callback
    )
  },
  getPhoto(word, success, fail = () => {}) {
    let src = `${Config.imageUrl}${word.hskId}-${word.simplified}.jpg`
    this.testImage(src, success, fail)
  },
  testImage(src, success, fail = () => {}) {
    let tester = new Image()
    tester.onload = () => {
      success(src)
    }
    tester.onerror = () => {
      fail(src)
    }
    tester.src = src
  },
  testImages(srcs, success, fail = () => {}) {
    if (srcs.length === 0) return
    for (let src of srcs) {
      this.testImage(src, success, fail)
    }
  },
  // strWord = "视频"
  getWebImages(strWord, callback) {
    console.log(strWord, 'getting...')
    $.getJSON(
      `${
        Config.proxy
      }?http://image.so.com/j?q=${strWord}&src=srp&correct=&sn=0&pn=10`,
      (response) => {
        let images = [] // images = [{_thumb: "http://...", img: "http://..."}, {...}, {...}]
        if (response && response.data && response.data.list) {
          for (let item of response.data.list) {
            images.push(item)
          }
        }
        images = images.filter(image => {
          let keep = true
          for (let keyword of this.reject) {
            if (image.img && image.img.includes(keyword)) keep = false
          }
          return keep
        })
        console.log(strWord, images)
        callback(images)
      }
    )
  },
  getSrcsFromUnsplash(term, callcback) {
    Helper.scrape('https://unsplash.com/search/photos/' + term, function(
      $html
    ) {
      var srcs = []

      var $metas = $html.filter('meta') // cannot use find
      $metas.each(function() {
        var property = $(this).attr('property')
        if (property) {
          if (property.includes('og:image:secure_url')) {
            srcs.push($(this).attr('content'))
          }
        }
      })
      callcback(srcs)
    })
  },
  reject: [
    'nipic',
    '16pic.com',
    'photophoto.cn',
    'pconline',
    'zol.com',
    'youth.cn',
    '58pic.com',
    'sanwen.net',
    'winxuancdn.com',
    'gtimg.com',
    'pic.ibaotu.com',
    'sc.jb51.net',
    'so.qhmsg.com',
    'soso.com',
    'comicyu.com',
    'duitang.com',
    'chachaba.com',
    'qzone.cc',
    'tianjimedia.com',
    'bitauto.com',
    'dzwww.com',
    'pstatp.com',
    'huitu.com'
  ]
}
