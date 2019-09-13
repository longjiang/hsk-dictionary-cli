import $ from 'jquery'
import Grammar from '@/lib/grammar'
import Helper from '@/lib/helper'
import WordPhotos from '@/lib/word-photos'
import Config from '@/lib/config'

export default {
  /**
   * Add tooltips with the jQuery UI Tooltip component.
   */

  addTooltips(selectorOrNode = false, templateFilterFunction = false) {
    window.AnnotatorTooltip = this
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
        let s = $(block).attr('data-candidates')
        if (s) {
          var candidates = JSON.parse(unescape(s))
        }
        this.addTooltip(block, candidates, templateFilterFunction)
      }
    }
  },

  addTooltip(block, candidates, templateFilterFunction = false) {
    Tipped.create(
      block,
      this.tooltipTemplate(candidates, templateFilterFunction),
      {
        position: 'bottomleft', // Tooltip width and height set in annotator.css's .tpd-content selector
        close: true
      }
    )
  },

  addHighlightingEventListener() {
    $('.word-block-simplified')
      .off('click')
      .on('click', function() {
        $(this)
          .parent()
          .toggleClass('mand-highlight')
      })
    $('.word-block-traditional')
      .off('click')
      .on('click', function() {
        $(this)
          .parent()
          .toggleClass('mand-highlight')
      })
  },

  speak(text) {
    window.speechSynthesis.cancel()
    var utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'zh-CN'
    window.speechSynthesis.speak(utterance)
    utterance.onend = function() {
      //
    }
  },

  /* Generate the content of the tooltip, then optionally transform it with a filter function */
  tooltipTemplate(candidates, templateFilterFunction = false) {
    window.wordPhotos = WordPhotos
    window.czhTooltipPhotos = (term, selector) => {
      window.wordPhotos.getWebImages(term, images => {
        window.wordPhotos.testImages(images.slice(0, 5), image => {
          $(selector).append(
            `<a href="${image.link}" class="tooltip-image-wrapper"><img src="${
              Config.imageProxy
            }?${image.img}" class="tooltip-image" /></a>`
          )
        })
      })
    }
    return function() {
      let id = `tooltip-images-${Helper.uniqueId()}`
      let tooltipImagesHTML = `<div class="tooltip-images" id="${id}"></div><script>window.czhTooltipPhotos("${
        candidates[0].simplified
      }", "#${id}")</script>`
      const grammar = Grammar.listWhere(
        row => row.words && row.words.includes(candidates[0].simplified)
      )
      let grammarHTML = '<div class="tooltip-grammar">'
      for (let point of grammar) {
        let structureHTML = Helper.highlightMultiple(
          point.structure,
          point.words,
          point.book
        )
        grammarHTML += `
          <div class="tooltip-entry">
            <a class="d-block mb-2" href="#/grammar/view/${point.id}" data-hsk="${
  point.book
}"><strong>Grammar ${point.code}</strong></a>
            <a class="tooltip-entry-character" href="#/grammar/view/${
  point.id
}">${structureHTML}</a>
            <button onclick="window.AnnotatorTooltip.speak('${
  point.structure
}');  return false" class="btn speak"><i class="glyphicon glyphicon-volume-up"></i></button>
            <div class="tooltip-entry-definition">${point.english}</div>
          </div>`
      }
      grammarHTML += '</div>'
      var entriesHTML = '<div class="tooltip-entries">'
      for (let candidate of candidates) {
        var $definitionsList = $(`<ol class="tooltip-entry-definitions"></ol>`)
        for (let definition of candidate.definitions) {
          $definitionsList.append(
            `<li class="tooltip-entry-definition">${definition.text}</li>`
          )
        }
        entriesHTML += `
        <div class="tooltip-entry">
          <span class="tooltip-entry-character"><b data-hsk="${
  candidate.hsk
}">${candidate.simplified}</b> (${candidate.traditional})</span>
          <span class="tooltip-entry-pinyin">${candidate.pinyin}</span>
          <button onclick="window.AnnotatorTooltip.speak('${
  candidate.simplified
}');  return false" class="btn speak"><i class="glyphicon glyphicon-volume-up"></i></button>
          ${$definitionsList.html()}
        </div>`
      }
      entriesHTML += '</div>'
      let tooltipHTML = tooltipImagesHTML + grammarHTML + entriesHTML
      if (templateFilterFunction) {
        tooltipHTML = templateFilterFunction(candidates, this, tooltipHTML) // this binds to the word-block node
      }
      return tooltipHTML
    }
  }
}
