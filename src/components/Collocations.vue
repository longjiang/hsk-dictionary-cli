<template>
  <div class="col-md-6 col-lg-4 mb-5" v-if="collocation">
    <div class="label song-label mb-2">{{ title }}</div>
    <PinyinButton class="mt-3 mb-3" :selector="`#Gramrels-${type}`" />
    <ul
      class="character-examples collapsed"
      :id="`Gramrels-${type}`"
      data-collapse-target
    >
      <li
        v-for="Word in collocation.Words"
        v-if="Word.cm"
        class="character-example"
      >
        <span
          v-html="Helper.highlight(Word.cm.replace(/ /gi, ''), word, level)"
          class="character-example-word"
        ></span>
      </li>
    </ul>
    <ShowMoreButton
      :data-bg-hsk="level"
      :length="collocation.Words.length"
      :min="4"
    />
  </div>
</template>

<script>
import Helper from '@/lib/helper'

export default {
  props: ['word', 'level', 'type', 'title', 'collocation'],
  data() {
    return {
      Helper
    }
  }
}
</script>
