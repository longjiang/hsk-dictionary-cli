import $ from 'jquery'
import Grammar from '@/lib/grammar'
import Helper from '@/lib/helper'

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
    return function() {
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
            <a class="label d-block mb-2" href="${point.url}" data-bg-hsk="${
          point.book
        }">Grammar ${point.code}</a>
            <a class="tooltip-entry-character" href="${
              point.url
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
      let tooltipHTML = grammarHTML + entriesHTML
      if (templateFilterFunction) {
        tooltipHTML = templateFilterFunction(candidates, this, tooltipHTML) // this binds to the word-block node
      }
      return tooltipHTML
    }
  }
}
