import countries from './countries.js'
import $ from 'jquery'
import Annotator from '@/vendor/annotator-js/js/annotator'
import AnnotatorTooltip from '@/vendor/annotator-js/js/annotator-tooltip'
import Helper from '@/lib/helper'
import Normalizer from '@/lib/normalizer'

export default {
  loaderMessages: [],
  lastId: 0,
  uniqueId() {
    this.lastId += 1
    return this.lastId
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
  saved(candidate) {
    return window.hskDictionaryApp.$store.getters.hasSavedWord(
      candidate.identifier
    )
  },
  addSaved(candidate) {
    window.hskDictionaryApp.$store.dispatch(
      'addSavedWord',
      candidate.identifier
    )
  },
  removeSaved(candidate) {
    window.hskDictionaryApp.$store.dispatch(
      'removeSavedWord',
      candidate.identifer
    )
  },
  augmentAnnotatedBlocks(selectorOrNode) {
    let nodes = []
    if (typeof selectorOrNode === 'object') {
      nodes = [selectorOrNode]
    } else {
      nodes = $(selectorOrNode).get()
    }
    for (let node of nodes) {
      const wordBlocks = $(node)
        .find('.word-block[data-candidates]')
        .get()
      for (let block of wordBlocks) {
        let data = $(block).attr('data-candidates')
        if (data) {
          const candidates = JSON.parse(unescape(data))
          if (candidates) {
            let book = 'outside'
            for (let candidate of candidates) {
              const saved = Helper.saved(candidate)
              candidate = Normalizer.normalize(candidate)
              if (candidate.book !== 'outside') book = candidate.book
              if (saved) $(block).addClass('saved')
            }
            $(block).attr('data-hover-hsk', book)
            $(block).attr('data-candidates', JSON.stringify(candidates))
          }
          $(block).click(function() {
            const candidates = JSON.parse(
              unescape($(block).attr('data-candidates'))
            )
            if (candidates && candidates.length > 0) {
              if ($(block).hasClass('saved')) {
                Helper.removeSaved(candidates[0])
              } else {
                Helper.addSaved(candidates[0])
              }
            }
          })
        }
      }
      this.addToolTips(node)
    }
  },
  addToolTips(selectorOrNode) {
    AnnotatorTooltip.addTooltips(selectorOrNode, function(candidates) {
      let html = ''
      for (let candidate of candidates) {
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
          <a class="tooltip-entry-character" href="#/view/cedict/${
            candidate.traditional
          },${candidate.pinyin},${candidate.index}"><span data-hsk="${
          candidate.book
        }">${candidate.simplified}</span>${traditionalHtml}</a>
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
  unique(names) {
    var uniqueNames = []
    $.each(names, function(i, el) {
      if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el)
    })
    return uniqueNames
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
