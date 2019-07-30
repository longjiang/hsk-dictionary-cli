<template>
  <div
    class="question-collocation"
    :id="id"
    v-if="word.sketch && gramrel(word.sketch.Gramrels, 'SentObject_of')"
  >
    <div class="question-slide-aspect">
      <div class="question-slide" :id="`question-${id}-slide-1`">
        <div class="question-prompt mb-4">What do you think this means?</div>
        <div>
          <button
            class="show-more mb-1"
            v-on:click="Helper.showPinyinClick"
            :data-target-selector="`#${id}-slide-1 .big-word`"
          >
            Show Pinyin
          </button>
        </div>
        <div
          class="text-center big-word"
          v-html="
            Helper.highlight(
              gramrel(word.sketch.Gramrels, 'SentObject_of').Words[0].cm,
              word.simplified,
              word.book
            )
          "
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import Helper from '@/lib/helper'
import Config from '@/lib/config'
import $ from 'jquery'

export default {
  props: ['id', 'word', 'type'],
  components: {},
  data() {
    return {
      Helper,
      Config
    }
  },
  mounted() {
    $(`#${this.id} .decomposition`).each(function() {
      let $characters = $(this).find('.part-character')
      let character =
        $characters[Math.floor(Math.random() * $characters.length)]
      $(character)
        .parent()
        .addClass('hide')
      $(this).click(function() {
        if ($(this).is('.decomposition')) {
          $(this).toggleClass('show-answer')
        } else {
          $(this)
            .parents('.decomposition')
            .toggleClass('show-answer')
        }
      })
    })
  },
  methods: {
    gramrel(Gramrels, name) {
      if (Gramrels) {
        return Gramrels.find(function(Gramrel) {
          return Gramrel.name === name
        })
      }
    }
  }
}
</script>
