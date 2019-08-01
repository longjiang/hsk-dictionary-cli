<template>
  <div class="container mistakes" :key="'mistakes-' + mistakesKey">
    <div class="row mb-5" v-if="entry.mistakes && entry.mistakes.length > 0">
      <div class="col-sm-12">
        <div class="label song-label mb-2 mistakes-label">
          Common mistakes containing “{{ entry.simplified }}”
        </div>
        <PinyinButton
          class="mt-1"
          keep="true"
          :selector="`#mistakes .character-example-word, #mistakes .mistake-l1`"
        />
        <ul
          class="character-examples collapsed"
          id="mistakes"
          data-collapse-target
        >
          <li
            class="character-example mistake-item"
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
            <button
              class="show-more collapsed"
              v-on:click="Helper.showMoreClick"
            >
              <span class="label-expand">Context</span>
              <span class="label-collapse">Collapse</span>
            </button>
            <br />
            <span class="mistake-description" v-if="mistake.country">
              Student from
              <b>{{ mistake.country.name }}</b>
            </span>
            <span class="mistake-description" v-if="mistake.l1">
              and speaks
              <span class="mistake-l1">
                <b>{{ mistake.l1 }}</b>
              </span>
            </span>
            <br />
            <span
              class="mistake-description"
              v-if="mistake.errorLevel && mistake.errorType"
            >
              Mistake with
              <b>
                {{ mistake.errorLevel }}
                <span v-if="mistake.errorType !== 'anomaly'"
                  >({{ mistake.errorType }})</span
                >
              </b>
            </span>
            <br />
            <span class="mistake-description" v-if="mistake.proficiency">
              <b>{{ Helper.ucFirst(mistake.proficiency) }}</b> Chinese
              proficiency
            </span>
          </li>
        </ul>
        <button
          v-if="entry.mistakes.length > 4"
          class="show-more collapsed"
          v-on:click="Helper.showMoreClick"
          title="Show all mistakes"
          :data-bg-hsk="entry.book"
        >
          <span class="label-expand"
            >Show {{ entry.mistakes.length - 4 }} more</span
          >
          <span class="label-collapse">Collapse</span>
        </button>
      </div>
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
      mistakesKey: 0
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
