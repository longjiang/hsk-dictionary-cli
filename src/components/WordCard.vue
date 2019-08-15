<template>
  <component
    :is="tag"
    v-if="!removed"
    :class="`word-list-ext-item text-center ${compareWith ? 'compare' : ''}`"
  >
    <div class="word-list-ext-item-head">
      <div class="word-list-ext-cycle">
        <button class="paginate-button previous" v-on:click="imgPrev">
          <img src="img/angle-left.svg" alt />
        </button>
        <button class="paginate-button next" v-on:click="imgNext">
          <img src="img/angle-right.svg" alt />
        </button>
        <button class="paginate-button close" v-on:click="remove">
          <i class="glyphicon glyphicon-remove"></i>
        </button>
      </div>
      <a :href="`#/view/cedict/${word.identifier}`">
        <img
          v-if="srcs && srcs.length > 0"
          :src="`${Config.imageProxy}?${srcs[0]}`"
          class="word-list-ext-image"
        />
      </a>
    </div>
    <div class="word-list-ext-item-body">
      <Frequency class="mb-1" v-if="word" :entry="word" />
      <div class="character-example-pinyin">
        <Star
          class="word-list-ext-item-head-star"
          v-if="word && star === true"
          :word="word"
        ></Star>
        {{ word.pinyin }}
        <Speak :text="word.simplified" />
      </div>
      <a v-if="word" :href="`#/view/cedict/${word.identifier}`">
        <div :data-hsk="word.hsk" class="word-list-ext-item-word simplified">
          {{ word.simplified }}
        </div>
        <div :data-hsk="word.hsk" class="word-list-ext-item-word traditional">
          {{ word.traditional }}
        </div>
      </a>

      <div v-if="word.definitions" class="character-example-english mb-2">
        <div v-for="definition in word.definitions.slice(0, 3)">
          <span v-if="definition.text">
            {{ definition.text.replace(/\(.*\)/, '') }}
          </span>
        </div>
      </div>
      <PinyinButton />
      <div
        v-html="Helper.highlight(word.example, word.simplified, word.hsk)"
        class="word-list-ext-example"
      ></div>
      <div class="character-example-english mt-1">
        {{ word.exampleTranslation }}
      </div>
      <a
        v-if="compareWith"
        :href="`#/compare/cedict/${compareWith.identifier},${word.identifier}`"
        class="btn show-more word-list-ext-compare-btn mt-3"
        :data-bg-hsk="word.hsk"
        ><i class="glyphicon glyphicon-adjust"></i> Compare</a
      >
      <a
        v-if="compareWith"
        :href="`#/explore/related/${word.identifier}`"
        class="btn show-more word-list-ext-related-btn mt-3"
        :data-bg-hsk="word.hsk"
        ><i class="glyphicon glyphicon-fullscreen"></i> Related</a
      >
    </div>
  </component>
</template>

<script>
import Config from '@/lib/config'
import Frequency from '@/components/Frequency'
import WordPhotos from '@/lib/word-photos'
import Helper from '@/lib/helper'

export default {
  components: {
    Frequency
  },
  props: {
    tag: {
      default: 'div'
    },
    word: {
      default: undefined
    },
    compareWith: {
      default: false
    },
    star: {
      default: true
    },
    index: {
      default: 0
    }
  },
  data() {
    return {
      Config,
      Helper,
      removed: false,
      srcs: []
    }
  },
  mounted() {
    this.updateImages()
  },
  methods: {
    remove() {
      this.removed = true
    },
    imgPrev() {
      this.srcs.push(this.srcs.shift())
    },
    imgNext() {
      this.srcs.unshift(this.srcs.pop())
    },
    updateImages() {
      if (this.srcs.length === 0) {
        if (this.word.hsk !== 'outside') {
          WordPhotos.getPhoto(
            this.word,
            src => {
              this.srcs.push(src)
              this.getWebImages()
            },
            () => {
              this.getWebImages()
            }
          )
        } else {
          this.getWebImages()
        }
      }
    },
    getWebImages() {
      WordPhotos.getWebImages(this.word.simplified, images => {
        this.srcs = this.srcs.concat(images.map(image => image.img))
      })
    }
  }
}
</script>
