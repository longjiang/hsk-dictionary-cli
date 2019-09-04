import countries from './countries.js'
import $ from 'jquery'
import Helper from '@/lib/helper'
import Config from '@/lib/config'

export default {
  hskColors: {
    1: '#f8b51e',
    2: '#267f94',
    3: '#fd4f1c',
    4: '#bb1718',
    5: '#1b3e76',
    6: '#6a3669',
    outside: '#c59f94'
  },
  hskWordCount: {
    1: 150,
    2: 150,
    3: 300,
    4: 600,
    5: 1300,
    6: 2500
  },
  loaderMessages: [],
  lastId: 0,
  async loaded(callback) {
    let a = await window.annotatorLoads
    let loadedGrammar = await window.grammarLoads
    let loadedHanzi = await window.hanziLoads
    let loadedUnihan = await window.unihanLoads
    callback(a[0], a[1], loadedGrammar, loadedHanzi, loadedUnihan)
  },
  unescape(html) {
    return $('<div/>')
      .html(html)
      .text()
  },
  uniqueId() {
    this.lastId += 1
    return this.lastId
  },
  // json or plain text only, and returns object
  proxy(url, callback) {
    $.ajax(Config.proxy + '?' + url).done(function(response) {
      callback(response.data)
    })
  },
  // html only, and returns html
  async scrape(url, callback) {
    await $.ajax(Config.scrape + '?' + url).done(function(response) {
      // We use 'ownerDocument' so we don't load the images and scripts!
      // https://stackoverflow.com/questions/15113910/jquery-parse-html-without-loading-images
      var ownerDocument = document.implementation.createHTMLDocument('virtual')
      var $html = $(response, ownerDocument)
      var text = $html.find('a').text()
      return response ? callback($html, response, text) : null
    })
  },
  async scrape2(url, cacheLife = -1) {
    return new Promise(resolve => {
      $.ajax(
        `${Config.scrape2}?url=${encodeURIComponent(
          url
        )}&cache_life=${cacheLife}`
      ).done(response => {
        if (response) {
          var ownerDocument = document.implementation.createHTMLDocument(
            'virtual'
          )
          var $html = $(response, ownerDocument)
          resolve($html, ownerDocument, response)
        }
      })
    })
  },
  highlight(text, word, level = false) {
    let levelAttr = level ? ` data-hsk="${level}"` : ''
    if (text) {
      return text.replace(
        word,
        `<span ${levelAttr} class="highlight">${word}</span>`
      )
    }
  },
  highlightMultiple(text, words, level) {
    if (text && words && words.length > 0) {
      for (let word of words) {
        text = this.highlight(text, word, level)
      }
      return text
    } else {
      return text
    }
  },
  /* http://hackingui.com/front-end/a-pure-css-solution-for-multiline-text-truncation/ */
  ellipsizeTextBox(el) {
    var wordArray = el.innerHTML.split(' ')
    while (el.scrollHeight > el.offsetHeight) {
      wordArray.pop()
      el.innerHTML = wordArray.join(' ') + '...'
    }
  },
  wordBlockTemplateFilter(block, textOrCandidates) {
    if (Array.isArray(textOrCandidates)) {
      const candidates = textOrCandidates
      for (let candidate of candidates) {
        const saved = Helper.saved(candidate)
        if (saved) $(block).addClass('saved')
      }
      $(block).click(function() {
        if (candidates && candidates.length > 0) {
          if ($(this).hasClass('saved')) {
            Helper.removeSaved(candidates[0])
          } else {
            Helper.addSaved(candidates[0])
          }
        }
      })
    }
    return block
  },
  saved(candidate) {
    return window.ChineseZeroToHeroApp.$store.getters.hasSavedWord(
      candidate.identifier
    )
  },
  addSaved(candidate) {
    window.ChineseZeroToHeroApp.$store.dispatch(
      'addSavedWord',
      candidate.identifier
    )
  },
  removeSaved(candidate) {
    window.ChineseZeroToHeroApp.$store.dispatch(
      'removeSavedWord',
      candidate.identifier
    )
  },
  tooltipTemplateFilter() {
    return (candidates, block, html) => {
      let $newHtml = $('<div />').html(html)
      for (let i in candidates) {
        let candidate = candidates[i]
        $newHtml
          .find(
            `.tooltip-entries .tooltip-entry:eq(${i}) span.tooltip-entry-character`
          )
          .wrap(
            `<a href="#/view/cedict/${candidate.identifier}" class="tooltip-entry-character"></a>`
          )
      }
      let newHTML = $newHtml.html()
      return newHTML
    }
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
        '<b>10 more beats...</b><br>It gets faster next time.'
      )
    } else {
      $('.loading-messages').html(`${message}`)
    }
  },
  ucFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  },
  absoluteURL(base, relative) {
    if (relative.startsWith('#')) {
      return base + relative
    }
    if (relative.startsWith('/')) {
      const protocal = base.replace(/(.*):\/\/.*/, '$1')
      const host = base.replace(/.*\/\/([^/]*).*/, '$1')
      return `${protocal}://${host}${relative}`
    }
    var stack = base.split('/'),
      parts = relative.split('/')
    stack.pop() // remove current file name (or empty string)
    // (omit if "base" is the current folder without trailing slash)
    for (var i = 0; i < parts.length; i++) {
      if (parts[i] == '.') continue
      if (parts[i] == '..') stack.pop()
      else stack.push(parts[i])
    }
    return stack.join('/')
  }
}
