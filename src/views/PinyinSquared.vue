<template>
  <div class="container main mt-5 mb-5">
    <div class="row">
      <div class="col-sm-12">
        <h1 class="text-center">Pinyin<sup class="text-success">2</sup></h1>
        <h5 class="text-center mt-5">
          A new, experimental way of writing Chinese phonetics with
          character-<em>like</em> blocks.
        </h5>
        <p class="mt-5">
          Type some pinyin (with <em>numeric</em> tone-marks) here and click
          "Convert".
        </p>
        
        <div id="output" class="p-4 rounded shadow">
          <PinyinSquaredCharacter pinyin="wo3"/>
        </div>
        <textarea
          v-model="text"
          class="form-control mt-4"
          rows="10"
          placeholder="wo3 hui4 shuo1 zhong1 wen2"
        ></textarea>
        <button @click="convertClick" class="btn btn-success btn-block mt-3">
          Convert to Pinyin<sup>2</sup>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import PinyinSquared from '@/lib/pinyin-squared'
import PinyinSquaredCharacter from '@/components/PinyinSquaredCharacter'

export default {
  components: {
    PinyinSquaredCharacter
  },
  data() {
    return {
      text: ''
    }
  },
  methods: {
    convertClick() {
      PinyinSquared.convert(this.text, $('#output')[0])
    }
  }
}
</script>

<style>
.character {
  width: 1.5rem;
  height: 1.5rem;
  position: relative;
}

.initial,
.final,
.tone {
  width: 100%;
  position: absolute;
}

.initial {
  left: -25%;
}

.final {
  left: 25%;
}

.tone {
  left: 0;
}

.block .pinyin {
  text-align: center;
  display: none;
  font-size: 0.5em;
  font-family: serif;
}

.block {
  display: inline-block;
  margin: 0 0.1em;
}

.hidden {
  display: none;
}

.chart {
  border-spacing: 0;
  border-collapse: collapse;
}

.chart td {
  padding: 0.3rem;
  border: 1px solid #ccc;
  min-width: 3em;
  text-align: center;
}

.chart td p {
  margin: 0;
}

.chart tr:first-child,
.chart td:first-child {
  background-color: #eee;
}

.chart .block {
  font-size: 2em;
}
</style>
