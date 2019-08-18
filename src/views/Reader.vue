<template>
  <div class="main mt-4" v-cloak :key="readerKey">
    <div class="container mt2 mb2">
      <div class="row">
        <div class="col-sm-12">
          <h4>Reader</h4>
          <p>This tool helps you read Chinese text.</p>
          <hr />
          <div id="reader-annotated" class="focus"></div>
          <Loader />
          <div class="mt-4">
            <textarea
              id="reader-textarea"
              class="form-control"
              cols="30"
              rows="10"
              placeholder="Enter your Chinese text here. Markdown and HTML also supported."
              v-model="text"
            ></textarea>
            <button
              class="btn btn-success btn-block mt-4"
              v-on:click="startClick"
            >
              Start Reading
            </button>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-sm-6">
          <div>
            <h4 class="mb-4">Not sure what to read?</h4>
            <p>
              <a href="https://news.sogou.com/?w=03021800" target="_blank"
                >搜狗新闻</a
              >
              (
              <a href="https://news.sogou.com" target="_blank"
                >https://news.sogou.com</a
              >) is a popular Chinese news site.
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

            <hr />

            <p>
              This
              <b>video lesson</b> from our
              <a
                href="https://chinesezerotohero.teachable.com/p/path-to-fluency"
                >Path to Fluency Course</a
              >
              tells you how to get interesting online Chinese content for
              reading:
              <a
                class="btn btn-danger mt-3 pl-3 pr-3"
                href="https://chinesezerotohero.teachable.com/courses/path-to-fluency/lectures/10288884"
              >
                <i class="glyphicon glyphicon-facetime-video mr-2"></i>Watch
                <em>Path to Fluency</em> Lecture 3.1.6
              </a>
            </p>
          </div>
        </div>
        <div class="col-sm-6">
          <h4 class="mb-4">Using Desktop Google Chrome?</h4>
          <p>Install the <b>“Add Pinyin” Chrome extension</b> to read all Chinese webpages with pinyin annotation.</p>
          <img
            src="img/extension-screenshot-1.jpg"
            alt
            class="img-fluid mb-4 shadow rounded"
          />
          <div class="shadow rounded p-4 text-center">
            <a
              href="https://chrome.google.com/webstore/detail/add-pinyin-chinese-zero-t/nhhoiplgolfammoegggnjojoaljjbojg"
              target="_blank"
            >
              <img
                src="img/chrome-store.png"
                alt="Chrome Web Store"
                style="width: 15rem"
              />
            </a>
            <a
              class="btn btn-danger mt-3 pl-3 pr-3"
              href="https://chrome.google.com/webstore/detail/add-pinyin-chinese-zero-t/nhhoiplgolfammoegggnjojoaljjbojg"
              target="_blank"
            >
              Install “Add Pinyin” Extension
              <font-awesome-icon icon="external-link-alt" />
            </a>
          </div>
          <hr class="mt2" />
          <p>
            <b>In China? Can’t access Google?</b> Install the extension package
            manually using developer mode.
          </p>
          <a href="files/czh-reader-extension.zip" download
            >Download extension package for developer mode</a
          >
          <p class="mt-3 mb-0">
            This downloads a
            <code>.zip</code> file.
          </p>
          <ul class="mt-0">
            <li>Extract it.</li>
            <li>
              Navigate to
              <code>chrome://extensions</code>
            </li>
            <li>
              Turn on
              <b>Developer Mode</b>
            </li>
            <li>
              Click
              <b>Load Unpacked</b>
            </li>
            <li>Choose the folder you just extracted *</li>
          </ul>
        </div>
      </div>
    </div>
    <!-- .container -->

    <!-- ANCHOR img/anchors/learn-this.png -->
    <div class="container-fluid learn-this-bar">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 text-center">
            <a href="https://chinesezerotohero.teachable.com/p/path-to-fluency">
              <img src="img/courses/fluency.jpg" class="course-cover" />
            </a>
            <br />Learn how to progress <em>beyond the HSK</em> toward fluency
            with our
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
import Helper from '@/lib/helper'
import Annotator from '@/lib/annotator'
import Marked from 'marked'

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
      hidePinyinExceptSaved: localStorage.getItem('czhHidePinyinExceptSaved'),
      useTraditional: localStorage.getItem('czhUseTraditional'),
      showDefinition: false,
      readerKey: 0, // used to force re-render this component
      savedWordsKey: 0
    }
  },
  methods: {
    startClick() {
      if (this.text) {
        Reader.save(this.text)
        this.show()
      }
    },
    show() {
      const marked = Marked(this.text) || this.text
      if (marked) {
        $('#reader-annotated').html(marked)
        // eslint-disable-next-line no-undef
        Helper.loaded(
          (LoadedAnnotator, LoadedHSKCEDICT, loadedGrammar, LoadedHanzi) => {
            LoadedAnnotator.annotateBySelector(
              '#reader-annotated',
              node => {
                this.annotated = true
                this.$store.dispatch('updateSavedWordsDisplay')
              },
              Helper.wordBlockTemplateFilter,
              Helper.tooltipTemplateFilter
            )
          }
        )
      }
    },
    route() {
      $('#hsk-dictionary')[0].scrollIntoView()
      let method = this.$route.params.method
      let arg = this.$route.params.arg
      if (method) {
        if (method === 'md-url') {
          Helper.proxy(arg, md => {
            this.text = md
            this.show()
          })
        }
        if (method === 'html-url') {
          Helper.scrape(arg, (html, response, text) => {
            this.text = text
            this.show()
          })
        }
        if (method === 'md') {
          this.text = arg
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
        if (!this.text) {
          const text = Reader.get()
          if (text) {
            this.text = text
            this.show()
          }
        }
      }
    }
  },
  watch: {
    $route() {
      if (this.$route.name === 'reader') {
        this.$store.dispatch('updateSavedWordsDisplay')
        this.route()
      }
    }
  },
  mounted() {
    if (this.$route.name === 'reader') {
      this.$store.dispatch('updateSavedWordsDisplay')
      this.route()
    }
  }
}
</script>
