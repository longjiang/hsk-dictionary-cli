<template>
  <div class="decomposition" :id="id"></div>
</template>

<script>
const decompositionTemplate = {
  '⿰': `<div class="description description-⿰">
    <div class="part part-⿰-1"></div>
    <div class="part part-⿰-2"></div>
  </div>`,
  '⿱': `<div class="description description-⿱">
    <div class="part part-⿱-1"></div>
    <div class="part part-⿱-2"></div>
  </div>`,
  '⿲': `<div class="description description-⿲">
    <div class="part part-⿲-1"></div>
    <div class="part part-⿲-2"></div>
    <div class="part part-⿲-3"></div>
  </div>`,
  '⿳': `<div class="description description-⿳">
    <div class="part part-⿳-1"></div>
    <div class="part part-⿳-2"></div>
    <div class="part part-⿳-3"></div>
  </div>`,
  '⿹': `<div class="description description-⿹">
    <div class="part part-⿹-1"></div>
    <div class="part part-⿹-2"></div>
  </div>`,
  '⿸': `<div class="description description-⿸">
    <div class="part part-⿸-1"></div>
    <div class="part part-⿸-2"></div>
  </div>`,
  '⿺': `<div class="description description-⿺">
    <div class="part part-⿺-1"></div>
    <div class="part part-⿺-2"></div>
  </div>`,
  '⿵': `<div class="description description-⿵">
    <div class="part part-⿵-1"></div>
    <div class="part part-⿵-2"></div>
  </div>`,
  '⿶': `<div class="description description-⿶">
    <div class="part part-⿶-1"></div>
    <div class="part part-⿶-2"></div>
  </div>`,
  '⿷': `<div class="description description-⿷">
    <div class="part part-⿷-1"></div>
    <div class="part part-⿷-2"></div>
  </div>`,
  '⿴': `<div class="description description-⿴">
    <div class="part part-⿴-1"></div>
    <div class="part part-⿴-2"></div>
  </div>`,
  '⿻': `<div class="description description-⿻">
    <div class="part part-⿻-1"></div>
    <div class="part part-⿻-2"></div>
  </div>`
}

import Annotator from '@/lib/annotator.js'
import Helper from '@/lib/helper'
import Hanzi from '@/lib/hanzi'
import $ from 'jquery'

export default {
  props: ['char'],
  data() {
    return {
      id: 'decomposition-' + Helper.uniqueId()
    }
  },
  mounted() {
    this.drawDecomposition(this.char, '#' + this.id)
  },
  methods: {
    drawDecomposition(char, selector) {
      const character = Hanzi.lookup(char)
      character.walkDecompositionTree(node => {
        if (character.isIdeographicDescCharacter(node.character)) {
          if (node.parent) {
            node.selector = `${node.parent.selector} > .description-${
              node.parent.character
            } > .part-${node.parent.character}-${node.index + 1}`
          } else {
            node.selector = `${selector}`
          }
          const $template = $(decompositionTemplate[node.character])
          $(node.selector).append($template)
        } else {
          let $template
          if (node.character === '？') {
            $template = $(`<div class="part-pinyin">(other elements)</div>`)
          } else {
            const childCharacter = Hanzi.lookupShallow(node.character)
            Helper.loaded(
              (
                LoadedAnnotator,
                LoadedHSKCEDICT,
                loadedGrammar,
                LoadedHanzi
              ) => {
                LoadedHSKCEDICT.lookupSimplified(
                  words => {
                    if (words.length > 0) {
                      $(`.part-character-${node.character} a`)
                        .attr('href', '#/view/cedict/' + words[0].identifier)
                        .attr('data-hsk', words[0].hsk)
                    }
                  },
                  [node.character]
                )
              }
            )
            let href = ''
            if (node.info) {
              // eslint-disable-next-line no-undef
              Annotator.annotateText(node.info.name, data => {
                let radicalNamePinyin = data
                  .map(function(candidates) {
                    return candidates[0].pinyin
                  })
                  .join(' ')
                if (radicalNamePinyin) {
                  $(`.part-pinyin-${node.character}`).text(radicalNamePinyin)
                }
              })
            }
            $template = $(`
            <div class="part-pinyin part-pinyin-${node.character}">${
              childCharacter.pinyin
            }</div>
            <div class="part-character part-character-${
              node.character
            }"><a ${href}>${childCharacter.character}</a></div>`)
          }
          if (node.parent) {
            node.selector = `${node.parent.selector} > .description-${
              node.parent.character
            } > .part-${node.parent.character}-${node.index + 1}`
          } else {
            node.selector = `${selector}`
          }
          $(node.selector).append($template)
        }
      })
    }
  }
}
</script>
