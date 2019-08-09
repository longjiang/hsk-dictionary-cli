<template>
  <i
    @click="speak(text)"
    class="focus-exclude speak glyphicon glyphicon-volume-up"
  ></i>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: ['text'],
  methods: {
    speak(text) {
      var utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'zh-CN'
      speechSynthesis.speak(utterance)
    }
  }
}
</script>
