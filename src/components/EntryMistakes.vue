<template>
  <div
    class="mistakes"
    :key="'mistakes-' + mistakesKey"
    v-if="entry.mistakes && entry.mistakes.length > 0"
  >
    <div class="label song-label mistakes-label">
      Common mistakes containing “{{ entry.simplified }}”
    </div>

    <div v-if="!show" class="text-center pt-4 pb-4 lyrics-bar">
      <button class="btn show-more" :data-bg-hsk="entry.hsk" @click="showClick">
        Show Mistakes
      </button>
    </div>
    <div v-if="show" class="mt-4">
      <PinyinButton
        class="mt-1"
        :selector="`#mistakes .character-example-word, #mistakes .mistake-l1`"
      />
      <ul
        class="character-examples collapsed"
        id="mistakes"
        data-collapse-target
      >
        <li
          class="character-example mistake-item mt-4 mb-4"
          v-for="mistake in entry.mistakes"
        >
          <span
            class="character-example-word concordance-context collapsed"
            data-collapse-target
            >{{ mistake.leftContext }}</span
          >
          <span class="character-example-word mistake-sentence">
            {{ mistake.left }}
            <span class="mistake-word">{{ entry.simplified }}</span>
            {{ mistake.right }}
          </span>
          <span
            class="character-example-word concordance-context collapsed"
            data-collapse-target
            >{{ mistake.rightContext }}</span
          >
          <ShowMoreButton class="mb-2">Context</ShowMoreButton>
          <div>
            <div class="mistake-description">
              <span v-if="mistake.country">
                Student from
                <b>{{ mistake.country.name }}</b>
              </span>
              <span v-if="mistake.l1">
                and speaks
                <span class="mistake-l1">
                  <b>{{ mistake.l1 }}</b>
                </span>
              </span>
            </div>
            <div class="mistake-description">
              <span v-if="mistake.errorLevel && mistake.errorType">
                Mistake with
                <b>
                  {{ mistake.errorLevel }}
                  <span v-if="mistake.errorType !== 'anomaly'"
                    >({{ mistake.errorType }})</span
                  >
                </b>
              </span>
            </div>
            <div class="mistake-description">
              <span v-if="mistake.proficiency">
                <b>{{ Helper.ucFirst(mistake.proficiency) }}</b> Chinese
                proficiency
              </span>
            </div>
          </div>
        </li>
      </ul>
      <ShowMoreButton
        :length="entry.mistakes.length"
        min="4"
        :data-bg-hsk="entry.hsk"
      ></ShowMoreButton>
    </div>
  </div>
</template>

<script>
import SketchEngine from '@/lib/sketch-engine'
import Helper from '@/lib/helper'

export default {
  props: ['entry'],
  data() {
    return {
      Helper,
      show: false,
      mistakesKey: 0
    }
  },
  methods: {
    showClick() {
      this.show = true
    }
  },
  mounted() {
    SketchEngine.mistakes(this.entry.simplified, response => {
      this.entry.mistakes = response
      this.mistakesKey += 1
    })
  }
}
</script>
