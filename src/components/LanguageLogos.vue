<template>
  <div class="zerotohero">
    <LanguageLogo
      v-for="language in languages.filter(language => language.url && language.published === true).sort((a,b) => b.name > a.name ? -1 : 0)"
      :language="language"
    />
  </div>
</template>

<script>
import LanguageLogo from '@/components/LanguageLogo'
import Config from '@/lib/config'

export default {
  components: {
    LanguageLogo
  },
  data() {
    return {
      languages: []
    }
  },
  async created() {
    this.languages = await $.getJSON(`${Config.server}data/languages.json`)
  }
}
</script>

<style>
.zerotohero {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
}
.zerotohero-item {
  width: 12rem;
}
</style>