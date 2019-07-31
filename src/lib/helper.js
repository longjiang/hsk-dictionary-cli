import countries from './countries.js'
import $ from 'jquery'
import Annotator from '@/vendor/annotator-js/js/annotator'
import AnnotatorTooltip from '@/vendor/annotator-js/js/annotator-tooltip'
import Helper from '@/lib/helper'
import HSK from '@/lib/hsk'

export default {
  loaderMessages: [],
  lastId: 0,
  uniqueId() {
    this.lastId += 1
    return this.lastId
  },
  isChinese(text) {
    return text.match(
      // eslint-disable-next-line no-irregular-whitespace
      /[\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B‌​\u3400-\u4DB5\u4E00-\u9FCC\uF900-\uFA6D\uFA70-\uFAD9]+/g
    )
  },
  scrape(url, callback) {
    $.ajax('proxy.php?' + url).done(function(response) {
      // We use 'ownerDocument' so we don't load the images and scripts!
      // https://stackoverflow.com/questions/15113910/jquery-parse-html-without-loading-images
      var ownerDocument = document.implementation.createHTMLDocument('virtual')
      var $html = $(response.data, ownerDocument)
      callback($html, response.data)
    })
  },
  highlight(text, word, level) {
    if (text) {
      return text.replace(
        word,
        '<span data-hsk="' + level + '">' + word + '</span>'
      )
    }
  },
  showPinyinClick(e) {
    const selector = $(e.target).attr('data-target-selector')
    $(selector).addClass('add-pinyin') // Soo it will have the pinyin looks
    $(e.target).text('Loading...')
    // eslint-disable-next-line no-undef
    new Annotator(CEDICT).annotateBySelector(`${selector}`, function() {
      $(e.target).remove()
      Helper.augmentAnnotatedBlocks(selector)
    })
  },
  f(candidate) {
    if (candidate.id) {
      location.hash = `#view/hsk/${candidate.id}`
    } else {
      location.hash = `#view/cedict/${candidate.traditional}`
    }
  },
  addHSKToCandidate(candidate) {
    const hskWords = HSK.lookup(candidate.simplified)
    if (hskWords.length > 0) {
      candidate.method = 'hsk'
      candidate.args = [hskWords[0].id]
      candidate.book = hskWords[0].book
    } else {
      candidate.method = 'cedict'
      candidate.args = [candidate.traditional, candidate.pinyin]
      candidate.book = 'outside'
    }
    return candidate
  },
  augmentAnnotatedBlocks(selector) {
    $(selector + ' .word-block[data-candidates]').each(function() {
      try {
        const candidate = JSON.parse(
          unescape($(this).attr('data-candidates'))
        )[0]
        try {
          Helper.addHSKToCandidate(candidate)
          $(this).attr('data-hover-hsk', candidate.book)
          $(this).attr('data-method', candidate.method)
          $(this).attr('data-args', escape(JSON.stringify(candidate.args)))
          if (
            window.hskDictionaryApp.$store.getters.hasSavedWord(
              candidate.method,
              candidate.args
            )
          ) {
            $(this).addClass('saved')
          }
        } catch (err) {
          // catch errors
        }
        $(this).click(function() {
          if ($(this).hasClass('saved')) {
            window.hskDictionaryApp.$store.dispatch('removeSavedWord', {
              traditional: candidate.traditional,
              pinyin: candidate.pinyin
            })
          } else {
            window.hskDictionaryApp.$store.dispatch('addSavedWord', {
              traditional: candidate.traditional,
              pinyin: candidate.pinyin
            })
          }
        })
      } catch (err) {
        // catch errors
      }
    })
    AnnotatorTooltip.addTooltips(selector, function(candidates, block) {
      let html = ''
      for (let candidate of candidates) {
        candidate = Helper.addHSKToCandidate(candidate)
        var $definitionsList = $(`<ol class="tooltip-entry-definitions"></ol>`)
        for (let definition of candidate.definitions) {
          $definitionsList.append(
            `<li class="tooltip-entry-definition">${definition.text}</li>`
          )
        }
        const traditionalHtml =
          candidate.simplified != candidate.traditional
            ? ` (${candidate.traditional})`
            : ''
        html += `
        <div class="tooltip-entry">
          <a class="tooltip-entry-character" href="#view/${
            candidate.method
          }/${candidate.args.join(',')}"><span data-hsk="${candidate.book}">${
          candidate.simplified
        }</span>${traditionalHtml}</a>
          <span class="tooltip-entry-pinyin">${candidate.pinyin}</span>
          <button onclick="AnnotatorTooltip.speak('${
            candidate.simplified
          }');  return false" class="btn speak"><i class="glyphicon glyphicon-volume-up"></i></button>
          ${$definitionsList.html()}
        </div>`
      }
      return html
    })
  },
  showMoreClick(e) {
    var $button = $(e.currentTarget)
    $button.siblings('[data-collapse-target]').toggleClass('collapsed')
    $button.toggleClass('collapsed')
  },
  unique(names) {
    var uniqueNames = []
    $.each(names, function(i, el) {
      if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el)
    })
    return uniqueNames
  },
  map(collection, callback) {
    var i
    var mapped = []
    for (i = 0; i < collection.length; i++) {
      mapped.push(callback(collection[i]))
    }
    return mapped
  },
  country(code) {
    for (let country of countries) {
      if (country.code === code) {
        return country
      }
    }
  },
  randomArrayItem(array, start = 0, length = false) {
    length = length || array.length
    array = array.slice(start, length)
    let index = Math.floor(Math.random() * array.length)
    console.log(index, 'random')
    return array[index]
  },
  loaderMessage(message) {
    this.loaderMessages.push(message)
    console.log('loaderMessage()', message)
    if (this.loaderMessages.length > 4) {
      $('.loading-messages').html(
        `<b>10 more beats...</b><br>It gets faster next time.`
      )
    } else {
      $('.loading-messages').html(`${message}`)
    }
  },
  ucFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
}
