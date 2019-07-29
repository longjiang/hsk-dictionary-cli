<template>
  <div class="col-md-6 col-lg-4 mb-5" v-if="collocation">
    <div class="label song-label mb-2">{{ title }}</div>
    <button
      class="show-more mt-1"
      v-on:click="Helper.showPinyinClick"
      :data-target-selector="`#Gramrels-${type}`"
    >
      Show Pinyin
    </button>
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
    <button
      v-if="collocation.Words.length > 4"
      class="show-more collapsed"
      v-on:click="Helper.showMoreClick"
      title="Show all examples"
      :data-bg-hsk="entry.book"
    >
      <span class="label-expand">
        Show
        {{ collocation.Words.length - 4 }} more
      </span>
      <span class="label-collapse">Collapse</span>
    </button>
  </div>
</template>

<script>
export default {
  props: ['word', 'level', 'type', 'title', 'collocation'],
  data() {
    return {}
  }
}
</script>
