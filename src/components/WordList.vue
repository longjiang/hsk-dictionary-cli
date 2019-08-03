<template>
  <div>
    <ul class="saved-words">
      <li class="saved-words-item character-example" v-for="word in words">
        <Star :word="word"></Star>
        <a
          :href="
            `#/view/cedict/${word.traditional},${word.pinyin},${word.index}`
          "
        >
          <span class="character-example-word" :data-hsk="word.book">{{
            word.simplified
          }}</span
          >&nbsp; <span class="character-example-pinyin">{{ word.pinyin }}</span
          >&nbsp;
          <span v-if="word.definitions" class="character-example-english">{{
            word.definitions[0].text
          }}</span></a
        >
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['words']
}
</script>
