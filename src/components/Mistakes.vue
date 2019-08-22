<template>
  <div class="mistakes" v-if="mistakes && mistakes.length > 0">
    <div class="label song-label mistakes-label">
      Common mistakes containing “{{ text }}”
    </div>

    <div class="mt-4">
      <ul class="collapsed pl-0" data-collapse-target>
        <li
          class="list-unstyled mistake-item mt-4 mb-4"
          v-for="mistake in mistakes"
        >
          <Annotate
            class="concordance-context collapsed"
            data-collapse-target
            >{{ mistake.leftContext }}</Annotate
          >
          <Annotate class="mistake-sentence">
            {{ mistake.left }}
            <span class="mistake-word">{{ text }}</span>
            {{ mistake.right }}
          </Annotate>
          <Annotate
            class="concordance-context collapsed"
            data-collapse-target
            >{{ mistake.rightContext }}</Annotate
          >
          <ShowMoreButton class="mb-2 btn-small">Context</ShowMoreButton>
          <div>
            <div class="mistake-description">
              <span v-if="mistake.country">
                Student from
                <b>{{ mistake.country.name }}</b>
              </span>
              <span v-if="mistake.l1">
                and speaks
                <Annotate class="mistake-l1">
                  <b>{{ mistake.l1 }}</b>
                </Annotate>
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
        :length="mistakes.length"
        min="4"
        data-bg-hsk="outside"
      ></ShowMoreButton>
    </div>
  </div>
</template>

<script>
import SketchEngine from '@/lib/sketch-engine'
import Helper from '@/lib/helper'

export default {
  props: ['text'],
  data() {
    return {
      Helper,
      show: false,
      mistakes: []
    }
  },
  methods: {
    showClick() {
      this.show = true
    }
  },
  created() {
    SketchEngine.mistakes(this.text, response => {
      this.mistakes = response
    })
  }
}
</script>
