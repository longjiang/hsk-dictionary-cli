import $ from 'jquery'
import Helper from './helper'
import Config from './config'

export default {
  savePhoto(word, url, callback) {
    $.getJSON(
      `${Config.savePhoto}?id=${word.id}&word=${
        word.word
      }&url=${encodeURIComponent(url)}`,
      callback
    )
  },
  getPhoto(simplified, id, success, fail) {
    var url = Config.imageUrl + id + '-' + simplified + '.jpg'
    $.ajax(url)
      .done(function() {
        success(url)
      })
      .fail(function() {
        fail()
      })
  },
  // strWord = "视频"
  getWebImages(strWord, callback) {
    $.getJSON(
      `${
        Config.proxy
      }?http://image.so.com/j?q=${strWord}&src=srp&correct=&sn=0&pn=10`,
      function(response) {
        let srcs = []
        response.data.list.forEach(function(item) {
          srcs.push(item)
        })
        callback(srcs)
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
