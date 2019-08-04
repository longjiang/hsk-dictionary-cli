<template>
  <div class="main mt-4 mb-4" v-cloak :key="readerKey">
    <div class="container mt2 mb2">
      <div class="row">
        <div class="col-sm-12">
          <h4>Reader</h4>
          <p>This tool helps you read Chinese text.</p>
          <hr />
          <div class="mt-2 mb-2" v-if="annotated">
            <input
              type="checkbox"
              id="hide-pinyin"
              class="mr-1"
              v-model="hidePinyinExceptSaved"
              checked
            />
            <label for="hide-pinyin">Hide Pinyin</label>
            <input
              type="checkbox"
              id="use-traditional"
              class="ml-3 mr-1"
              v-model="useTraditional"
            />
            <label for="use-traditional">Traditional</label>
            <input
              type="checkbox"
              id="show-definition"
              class="ml-3 mr-1"
              v-model="showDefinition"
            />
            <label for="show-definition">Definition</label>
          </div>
          <div
            id="reader-annotated"
            v-bind:class="{
              'show-pinyin': true,
              'hide-pinyin-except-saved': hidePinyinExceptSaved,
              'show-simplified': !useTraditional,
              'show-traditional': useTraditional,
              'show-definition': showDefinition
            }"
          ></div>
          <div class="mt-4">
            <textarea
              id="reader-textarea"
              class="form-control"
              cols="30"
              rows="10"
              placeholder='Paste some Chinese text here, and click "Start Reading"'
              v-model="text"
            ></textarea>
            <button
              class="btn btn-success btn-block mt-4"
              v-on:click="startClick"
            >
              Start Reading
            </button>
          </div>
          <div>
            <p class="mt-4">
              Not sure what to read? Watch this video lesson from our
              <a
                href="https://chinesezerotohero.teachable.com/p/path-to-fluency"
                >Path to Fluency Course</a
              >
              for some ideas.
            </p>
            <div class="embed-responsive embed-responsive-16by9">
              <video class="embed-responsive-item" controls>
                <source
                  src="https://www.filepicker.io/api/file/Wyy5PoptTeGfOXfgEiKx"
                  type="video/mp4"
                />
              </video>
            </div>
            <div class="lecture-text-container">
              <h6 class="mt-4">Some resources mentioned in the video:</h6>
              <p>
                <a href="https://news.sogou.com/?w=03021800" target="_blank"
                  >搜狗新闻</a
                >
                (<a href="https://news.sogou.com" target="_blank"
                  >https://news.sogou.com</a
                >) is particularly useful if you want to gain the “China
                perspective” on a global issue, such as Brexit (<a
                  href="https://news.sogou.com/news?query=%CD%D1%C5%B7&amp;mode=1&amp;w=01029901&amp;sut=1405&amp;sst0=1556927358381&amp;lkt=1%2C1556927358275%2C1556927358275"
                  target="_blank"
                  >脱欧</a
                >).
              </p>
              <p>
                For news sites in Taiwan and Hong Kong, check out
                <a
                  href="https://news.google.com/?hl=zh-TW&amp;gl=TW&amp;ceid=TW:zh-Hant"
                  target="_blank"
                  >Google News Taiwan</a
                >
                and
                <a href="https://hk.news.yahoo.com/" target="_blank"
                  >Yahoo News Hong Kong</a
                >.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- .container -->

    <!-- ANCHOR img/anchors/learn-this.png -->
    <div class="container-fluid learn-this-bar">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 text-center">
            <a href="https://chinesezerotohero.teachable.com/p/path-to-fluency"
              ><img src="img/courses/fluency.jpg" class="course-cover"/></a
            ><br />
            Learn how to progress <em>beyond the HSK</em> toward fluency with
            our
            <a
              href="https://chinesezerotohero.teachable.com/p/path-to-fluency"
              class="video-course"
              >Path to Fluency Video Course</a
            >
          </div>
        </div>
      </div>
    </div>
    <!-- .container-fluid -->
  </div>
</template>

<script>
import $ from 'jquery'
import CEDICT from '@/lib/cedict'
import Helper from '@/lib/helper'
import Annotator from '@/vendor/annotator-js/js/annotator'
import Marked from 'marked'
import Config from '@/lib/config'

const Reader = {
  get() {
    return localStorage.getItem('readerText')
  },
  save(text) {
    localStorage.setItem('readerText', text)
  }
}

export default {
  template: '#reader-template',
  data() {
    return {
      text: '',
      annotated: false,
      hidePinyinExceptSaved: false,
      useTraditional: false,
      showDefinition: false,
      readerKey: 0, // used to force re-render this component
      savedWordsKey: 0
    }
  },
  methods: {
    startClick() {
      Reader.save(this.text)
      this.show()
    },
    show() {
      $('#reader-annotated').html(this.text)
      // eslint-disable-next-line no-undef
      new Annotator(CEDICT).annotateBySelector('#reader-annotated', () => {
        this.annotated = true
        Helper.augmentAnnotatedBlocks('#reader-annotated')
      })
    },
    route() {
      $('#hsk-dictionary')[0].scrollIntoView()
      let method = this.$route.params.method
      let arg = this.$route.params.arg
      if (method) {
        if (method === 'md-url') {
          Helper.proxy(arg, md => {
            this.text = Marked(md)
            this.show()
          })
        }
        if (method === 'html-url') {
          Helper.proxy(arg, html => {
            this.text = html
            this.show()
          })
        }
        if (method === 'md') {
          this.text = Marked(arg)
          this.show()
        }
        if (method === 'html') {
          this.text = arg
          this.show()
        }
        if (method === 'txt') {
          this.text = arg.replace(/\n/g, '<br>')
          this.show()
        }
      } else {
        this.text = Reader.get().replace(/\n/g, '<br>')
        this.show()
      }
    }
  },
  watch: {
    $route() {
      if (this.$route.name === 'reader') {
        this.route()
      }
    }
  },
  mounted() {
    if (this.$route.name === 'reader') {
      this.route()
    }
  }
}
</script>
