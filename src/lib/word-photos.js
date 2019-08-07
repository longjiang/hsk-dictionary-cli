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
      console.log(src, 'testImage fail')
      fail(src)
    }
    tester.src = src
  },
  testImages(srcs, success, fail = () => {}) {
    if (srcs.length === 0) return
    let f = srcs => {
      this.testImages(srcs.slice(1), success, srcs => {
        f(srcs)
      })
    }
    this.testImage(srcs[0], success, () => {
      f(srcs)
    })
  },
  // strWord = "视频"
  getWebImages(strWord, callback) {
    $.getJSON(
      `${
        Config.proxy
      }?http://image.so.com/j?q=${strWord}&src=srp&correct=&sn=0&pn=10`,
      function(response) {
        let images = [] // images = [{_thumb: "http://...", img: "http://..."}, {...}, {...}]
        if (response && response.data && response.data.list) {
          for (let item of response.data.list) {
            images.push(item)
          }
        }
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
  }
}
