import countries from './countries.js'
import $ from 'jquery'
import Annotator from '@/lib/annotator'
import AnnotatorTooltip from '@/lib/annotator-tooltip'
import Helper from '@/lib/helper'
import Config from '@/lib/config'

export default {
  loaderMessages: [],
  lastId: 0,
  async loaded(callback) {
    let a = await window.annotatorLoads
    let loadedGrammar = await window.grammarLoads
    let loadedHanzi = await window.hanziLoads
    callback(a[0], a[1], loadedGrammar, loadedHanzi)
  },
  uniqueId() {
    this.lastId += 1
    return this.lastId
  },
  // json only, and returns object
  proxy(url, callback) {
    $.ajax(Config.proxy + '?' + url).done(function(response) {
      callback(JSON.parse(response).data)
    })
  },
  // html only, and returns html
  scrape(url, callback) {
    $.ajax(Config.scrape + '?' + url).done(function(response) {
      // We use 'ownerDocument' so we don't load the images and scripts!
      // https://stackoverflow.com/questions/15113910/jquery-parse-html-without-loading-images
      var ownerDocument = document.implementation.createHTMLDocument('virtual')
      var $html = $(response, ownerDocument)
      var text = $html.find('a').text()
      callback($html, response, text)
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
  augmentAnnotatedBlocks(node) {
    const wordBlocks = $(node)
      .find('.word-block[data-candidates]')
      .get()
    for (let block of wordBlocks) {
      let data = $(block).attr('data-candidates')
      if (data) {
        let candidates = JSON.parse(unescape(data))
        if (candidates) {
          for (let candidate of candidates) {
            const saved = Helper.saved(candidate)
            if (saved) $(block).addClass('saved')
          }
          // Sort the candidates by HSK
          candidates = candidates.sort((a, b) => {
            let abook = a.hsk === 'outside' ? 7 : a.hsk
            let bbook = b.hsk === 'outside' ? 7 : b.hsk
            return abook - bbook
          })
          // Set the best candidate
          block.outerHTML = Annotator.wordBlockTemplate(candidates)
        }
      }
    }
    $(node)
      .find('.word-block[data-candidates]')
      .click(function() {
        const candidates = JSON.parse(unescape($(this).attr('data-candidates')))
        if (candidates && candidates.length > 0) {
          if ($(this).hasClass('saved')) {
            Helper.removeSaved(candidates[0])
          } else {
            Helper.addSaved(candidates[0])
          }
        }
      })
    Helper.addToolTips(node)
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
      candidate.identifier
    )
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
            candidate.identifier
          }"><span data-hsk="${candidate.hsk}">${
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
