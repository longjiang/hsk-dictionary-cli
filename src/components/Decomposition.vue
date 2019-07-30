<template>
  <div class="decomposition" :id="id"></div>
</template>

<script>
import AnnotatorService from '@/vendor/annotator-js/js/annotator-service.js'

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

import Helper from '@/lib/helper'
import Hanzi from '@/lib/hanzi'
import HSK from '@/lib/hsk'
import CEDICT from '@/lib/cedict'
import $ from 'jquery'

export default {
  props: ['char'],
  data() {
    return {
      id: 'decomposition-' + Helper.uniqueId(),
      CEDICT
    }
  },
  mounted() {
    this.drawDecomposition(this.char, '#' + this.id)
  },
  methods: {
    drawDecomposition(char, selector) {
      const character = Hanzi.lookup(char)
      character.walkDecompositionTree(function(node) {
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
            const childCharacterHSK = HSK.lookup(childCharacter.character)[0]
            const childCharacterCEDICT = CEDICT.lookupSimplified(
              childCharacter.character
            )[0]
            let href = ''
            if (childCharacterCEDICT) {
              href = `href="#/view/cedict/${childCharacterCEDICT.traditional},${
                childCharacterCEDICT.pinyin
              }"`
            }
            let radicalNamePinyin = false
            if (node.info) {
              // eslint-disable-next-line no-undef
              radicalNamePinyin = AnnotatorService.annotate(node.info.name)
                .map(function(candidates) {
                  return candidates[0].pinyin
                })
                .join(' ')
            }
            const book = childCharacterHSK ? childCharacterHSK.book : 'outside'
            $template = $(`
            <div class="part-pinyin">${radicalNamePinyin ||
              childCharacter.pinyin}</div>
            <div class="part-character"><a ${href} data-hsk="${book}">${
              childCharacter.character
            }</a></div>`)
          }
          node.selector = `${node.parent.selector} > .description-${
            node.parent.character
          } > .part-${node.parent.character}-${node.index + 1}`
          $(node.selector).append($template)
        }
      })
    }
  }
}
</script>
