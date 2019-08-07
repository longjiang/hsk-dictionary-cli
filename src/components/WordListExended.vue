<template>
  <div>
    <ul
      :key="listKey"
      :class="{
        'word-list-ext': true,
        collapsed: collapse > 0
      }"
      data-collapse-target
    >
      <li
        :class="
          `word-list-ext-item text-center ${compareWith ? 'compare' : ''}`
        "
        v-for="(word, index) in words"
      >
        <div class="word-list-ext-item-head" :key="`image-${index}-${imgKey}`">
          <div class="word-list-ext-cycle">
            <button class="paginate-button previous" v-on:click="imgPrev(word)">
              <img src="img/angle-left.svg" alt />
            </button>
            <button class="paginate-button next" v-on:click="imgNext(word)">
              <img src="img/angle-right.svg" alt />
            </button>
            <button class="paginate-button close" v-on:click="remove(word)">
              <i class="glyphicon glyphicon-remove"></i>
            </button>
          </div>
          <img
            v-if="word.srcs && word.srcs.length > 0"
            :src="word.srcs[0]"
            class="word-list-ext-image"
          />
        </div>
        <div class="word-list-ext-item-body">
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
            <div
              :data-hsk="word.hsk"
              class="word-list-ext-item-word simplified"
            >
              {{ word.simplified }}
            </div>
            <div
              :data-hsk="word.hsk"
              class="word-list-ext-item-word traditional"
            >
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
            :href="
              `#/compare/cedict/${compareWith.identifier},${word.identifier}`
            "
            class="btn show-more word-list-ext-compare-btn mt-3"
            :data-bg-hsk="word.hsk"
            >Compare:
            <span class="simplified"
              >{{ compareWith.simplified }} vs {{ word.simplified }}</span
            >
            <span class="traditional"
              >{{ compareWith.traditional }} vs {{ word.traditional }}</span
            ></a
          >
        </div>
      </li>
    </ul>
    <ShowMoreButton
      v-if="collapse > 0"
      :length="words.length"
      :min="collapse"
    />
  </div>
</template>
<script>
import Helper from '@/lib/helper'
import Config from '@/lib/config'
import WordPhotos from '@/lib/word-photos'

export default {
  watch: {
    words() {
      this.updateImages()
      this.imgKey++
    }
  },
  mounted() {
    this.imgKey++
    if (this.words && this.words.length > 0) {
      this.updateImages()
    }
  },
  data() {
    return {
      Helper,
      Config,
      listKey: 0,
      imgKey: 0
    }
  },
  props: {
    words: {
      type: Array
    },
    compareWith: {
      default: false
    },
    traditional: {
      default: false
    },
    highlight: {
      default: false
    },
    collapse: {
      default: 0
    },
    star: {
      default: true
    },
    hsk: {
      default: false
    }
  },
  methods: {
    remove(word) {
      if (word) {
        for (let i in this.words) {
          if (this.words[i].simplified === word.simplified) {
            this.words.splice(i, 1)
            this.listKey++
          }
        }
      }
    },
    imgPrev(word) {
      word.srcs.push(word.srcs.shift())
      this.imgKey++
    },
    imgNext(word) {
      word.srcs.unshift(word.srcs.pop())
      this.imgKey++
    },
    getWebImages(word) {
      const unsplash = `https://source.unsplash.com/featured/?${
        word.definitions[0].text
      }`
      WordPhotos.getWebImages(word.simplified, images => {
        word.srcs = images.map(image => image.img).concat([unsplash])
        this.imgKey++
      })
    },
    updateImages() {
      for (let word of this.words) {
        if (!word.srcs) {
          word.srcs = []
          if (word.hsk !== 'outside') {
            WordPhotos.getPhoto(
              word,
              src => {
                word.srcs.push(src)
                this.imgKey++
                this.getWebImages(word)
              },
              () => {
                this.getWebImages(word)
              }
            )
          } else {
            this.getWebImages(word)
          }
        }
      }
    }
  }
}
</script>
