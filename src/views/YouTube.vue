<template>
  <div class="youtube-view main">
    <div class="container mt-5 mb-5">
      <div class="row">
        <div class="col-md-4">
          <YouTubeVideo :youtube="args" />
        </div>
        <div class="col-sm-6 col-md-4">
          <SyncedTranscript :lines="this.chinese" />
        </div>
        <div class="col-sm-6 col-md-4">
          <SyncedTranscript :lines="this.english"  />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import YouTubeVideo from '@/components/YouTubeVideo'
import SyncedTranscript from '@/components/SyncedTranscript'
import Helper from '@/lib/helper'

export default {
  components: {
    YouTubeVideo,
    SyncedTranscript
  },
  props: {
    method: {
      type: String
    },
    args: {
      type: String
    }
  },
  data() {
    return {
      chinese: [],
      english: []
    }
  },
  mounted() {
    Helper.scrape(
      'https://www.youtube.com/api/timedtext?v=MIvRrU884y0&asr_langs=de%2Cen%2Ces%2Cfr%2Cit%2Cja%2Cko%2Cnl%2Cpt%2Cru&caps=asr&xorp=true&hl=en&ip=0.0.0.0&ipbits=0&expire=1566979714&sparams=ip%2Cipbits%2Cexpire%2Cv%2Casr_langs%2Ccaps%2Cxorp&signature=C9DA80BDD9E74E7C3069C00868FA7440D4AD1A9D.25130D38A5D8F50E7CDA9AA309B5124CFC7FB32A&key=yt8&lang=en&fmt=srv3&tlang=zh',
      $html => {
        for (let p of $html.find('p')) {
          let line = {
            line: $(p).text(),
            starttime: parseInt($(p).attr('t')) / 1000
          }
          this.chinese.push(line)
        }
        console.log(this.chinese)
      }
    ),
    Helper.scrape(
      'https://www.youtube.com/api/timedtext?v=MIvRrU884y0&asr_langs=de%2Cen%2Ces%2Cfr%2Cit%2Cja%2Cko%2Cnl%2Cpt%2Cru&caps=asr&xorp=true&hl=en&ip=0.0.0.0&ipbits=0&expire=1566979714&sparams=ip%2Cipbits%2Cexpire%2Cv%2Casr_langs%2Ccaps%2Cxorp&signature=C9DA80BDD9E74E7C3069C00868FA7440D4AD1A9D.25130D38A5D8F50E7CDA9AA309B5124CFC7FB32A&key=yt8&lang=en&fmt=srv3&tlang=en',
      $html => {
        for (let p of $html.find('p')) {
          let line = {
            line: $(p).text(),
            starttime: parseInt($(p).attr('t')) / 1000
          }
          this.english.push(line)
        }
        console.log(this.english)
      }
    )
  }
}
</script>
