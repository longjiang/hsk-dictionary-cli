<template>
  <div class="main" v-cloak :key="entryKey">
    
    <!-- ANCHOR img/anchors/entry.png  -->
    <div class="container">
      <div class="row text-center">
        <div class="col-md-12">
          <div class="entry-heEntad-wrapper">
            <button
              class="save-word-button"
              :key="savedWordsKey"
              :data-method="entry.method"
              :data-args="JSON.stringify(entry.args)"
            >
              <i
                class="glyphicon glyphicon-star-empty"
                v-on:click="SavedWords.saveWordClick"
                v-if="!SavedWords.includes(entry.method, entry.args)"
                title="Save word"
              ></i>
              <i
                class="glyphicon glyphicon-star"
                v-on:click="SavedWords.removeWordClick"
                v-if="SavedWords.includes(entry.method, entry.args)"
                title="Remove word"
              ></i>
            </button>
            <button
              class="paginate-button previous"
              v-on:click="previousClick"
              title="Previous word"
              v-if="hasPrevious"
            >
              <img src="img/angle-left.svg" alt />
            </button>
            <button
              class="paginate-button next"
              v-on:click="nextClick"
              title="Next word"
              v-if="hasNext"
            >
              <img src="img/angle-right.svg" alt />
            </button>

            <div>
              <div v-if="entry.measureWords" style="display:inline-block">
                <div class="pinyin measure-word-pinyin">
                  yī {{ entry.measureWords[0].pinyin }}
                  <i
                    class="speak glyphicon glyphicon-volume-up"
                    v-bind:data-speak="'一' + entry.measureWords[0].simplified"
                  ></i>
                </div>
                <div class="word measure-word">一{{ entry.measureWords[0].simplified }}</div>
              </div>
              <div class="entry-word" style="display:inline-block">
                <div class="pinyin">
                  {{ entry.pinyin }}
                  <i
                    class="speak glyphicon glyphicon-volume-up"
                    v-bind:data-speak="entry.word"
                  ></i>
                </div>
                <div class="word">
                  <span v-bind:data-hsk="entry.book">{{ entry.word }}</span>
                </div>
              </div>
            </div>
            <div class="definitions" v-if="entry.english && !entry.definitions">
              <p class="english" v-if="entry.english">{{ entry.english }}</p>
            </div>
            <ul class="definitions collapsed" v-if="entry.definitions" data-collapse-target>
              <li v-for="definition in entry.definitions" class="english">{{ definition.text }}</li>
            </ul>
            <button
              v-if="entry.definitions && entry.definitions.length > 4"
              class="show-more collapsed mb-4"
              v-on:click="Helper.showMoreClick"
              title="Show all definitions"
            >
              <span class="label-expand">
                Show
                {{ entry.definitions.length - 3 }}
                more senses
              </span>
              <span class="label-collapse">Collapse</span>
            </button>
          </div>
        </div>
        <!-- .col -->
      </div>
      <!-- .row -->
    </div>
    <!-- .container -->

    <!-- ANCHOR img/anchors/oofc.png -->
    <div class="container-fluid mb2" v-cloak v-if="entry.oofc && entry.oofc !== ''">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 text-center">
            This word is not required in HSK {{ entry.book }} but is covered in
            our
            <a
              href="https://courses.chinesezerotohero.com/"
              :data-hsk="entry.book"
              class="video-course"
            >HSK {{ entry.book }} Video Course</a>
            as an optional vocabulary word.
          </div>
        </div>
      </div>
    </div>

    <!-- ANCHOR img/anchors/pn.png -->
    <div class="container-fluid mb2" v-cloak v-if="entry.pn && entry.pn !== ''">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 text-center">
            This is a
            <b>
              <em>proper noun</em>
            </b>
            that appeared in
            <b>
              Lesson {{ entry.lesson }}
              <span v-if="entry.book < 5">, Text {{ entry.dialog }}</span>
            </b>
            of our
            <a
              href="https://courses.chinesezerotohero.com/"
              :data-hsk="entry.book"
              class="video-course"
            >HSK {{ entry.book }} Video Course</a>.
          </div>
        </div>
      </div>
    </div>

    <!-- ANCHOR img/anchors/example-bar.png -->
    <div class="container-fluid example-bar" v-cloak v-if="entry.example && entry.example !== ''">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="image-wrapper">
              <img v-bind:src="image" class="example-image" v-if="hasImage && !admin" />
              <img
                v-bind:src="image + '?v=' + Date.now()"
                class="example-image"
                v-if="hasImage && admin"
              />
            </div>
          </div>
          <div class="col-md-6 example-wrapper text-md-left text-sm-center sm-mt2">
            <div
              class="label"
              v-bind:data-bg-hsk="entry.book"
              v-if="entry.oofc == ''"
            >HSK {{ entry.book }}</div>
            <div class="example-sentence mt-4">
              <!-- <p class="example-sentence-pinyin">{{ entry.examplePinyin }} <i class="speak glyphicon glyphicon-volume-up" v-bind:data-speak="entry.example"></i></p> -->
              <p class="example-sentence-word" v-html="highlight(entry.example)"></p>
              <p class="example-sentence-english">{{ entry.exampleTranslation }}</p>
              <button
                class="show-more mt1"
                v-on:click="Helper.showPinyinClick"
                data-target-selector=".example-sentence-word"
              >Show Pinyin</button>
            </div>
          </div>
        </div>
        <div class="unsplash-sources" v-if="admin">
          <div class="row mb2">
            <div class="col-sm-12">
              Search
              <input
                type="text"
                class="search-image"
                v-on:keyup.enter="searchImageKeyupEnter"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb2" v-for="src in unsplashSrcs">
              <div class="image-wrapper">
                <img
                  v-bind:src="src"
                  alt
                  class="example-image unsplash-thumb"
                  v-on:click="unsplashThumbClick"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div>
                Image URL:
                <input
                  type="text"
                  class="image-url d-block"
                  v-on:keyup.enter="imageUrlKeyupEnter"
                />
              </div>
              <div class="mt2">
                <a
                  :href="
                    'https://www.canva.com/photos/search/' +
                      hsk.simplifyEnglish(entry.english)
                  "
                  target="_blank"
                >Search on Canva</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container" :key="webImagesKey" v-cloak>
      <div class="row mt-5 mb-5" v-if="entry.images && entry.images.length > 0">
        <div class="col-sm-12">
          <div class="image-wall">
            <img
              :src="image.img"
              alt
              v-if="!image.img.includes('nipic')"
              v-for="image in entry.images.slice(0, 20)"
              class="image-wall-image"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- ANCHOR img/anchors/character-example.png -->
    <!-- FIXME Handle homonyms (e.g. 称 in 称心如意 should be chèn not chēng) -->
    <div class="container mt-4 mb-4" v-cloak>
      <div class="row character-example-wrapper mt-4">
        <!-- ANCHOR img/anchors/character.png -->
        <div class="col-md-6" v-for="(character, index) in characters">
          <!-- ANCHOR img/anchors/parts.png -->
          <div class="text-center">
            <div class="pinyin mb-2">{{ entry.pinyin.split(' ')[index] }}</div>
            <decomposition :char="character.character"></decomposition>
            <a
              class="stroke stroke-decomposition btn-small mt-2"
              :href="hsk.hanzi.animatedSvgUrl(character.character)"
              target="_blank"
              title="Show stroke order animation"
            >
              <img src="img/stroke.svg" /> Strokes
            </a>
            <div class="english mt-3 mb-4">{{ character.definition }}</div>
          </div>

          <div class="etymology" v-if="character.etymology">
            <span v-if="character.etymology.type">
              <b>Origin:</b> A
              <em v-if="character.etymology">{{ character.etymology.type }}</em>
              character.
            </span>
            <span v-if="character.etymology.hint">
              <b>Mnemonic:</b>
              {{ character.etymology.hint }}.
            </span>
          </div>

          <div class="parts">
            <div class="part character-example" v-for="part in character.parts">
              <span class="part-part" v-if="part">
                <b>{{ part.character }}</b>
              </span>
              <span
                class="part-definition character-example-english"
                v-if="part.definition"
              >{{ part.definition }}</span>
              <span
                class="part-pinyin character-example-english"
                v-if="part.character == '？'"
              >Other elements</span>
              <a
                class="stroke btn-small"
                :href="hsk.hanzi.animatedSvgUrl(part.character)"
                target="_blank"
                title="Show stroke order animation"
              >
                <img src="img/stroke.svg" />
              </a>
              <ul class="part-examples" v-if="part.showExamples">
                <li>{{ part.hskCharacters.length }} characters:</li>
                <li class="part-example" v-for="row in part.hskCharacters">
                  <a
                    :href="'#view/hsk/' + row.firstHSKWord.id"
                    v-html="
                      highlightCharacter(
                        row.firstHSKWord.word,
                        row.character,
                        row.firstHSKWord.book
                      )
                    "
                  ></a>
                  <span class="part-pinyin character-example-pinyin" v-if="part.pinyin">
                    {{ row.firstHSKWord.pinyin }}
                    <i
                      class="speak glyphicon glyphicon-volume-up"
                      v-bind:data-speak="row.firstHSKWord.word"
                    ></i>
                  </span>
                  <span
                    class="part-definition character-example-english"
                    v-if="part.definition"
                  >{{ row.firstHSKWord.english }}</span>
                </li>
              </ul>
              <button v-on:click="togglePartExamples(part)" class="btn-small">
                <span v-if="!part.showExamples">List characters with {{ part.character }}</span>
                <span v-else>Collapse</span>
              </button>
            </div>
          </div>
          <ul class="character-examples collapsed" data-collapse-target>
            <li v-for="example in character.examples" class="character-example">
              <a :href="'#view/hsk/' + example.id">
                <span
                  class="character-example-word"
                  v-html="
                    highlightCharacter(
                      example.word,
                      character.character,
                      example.book
                    )
                  "
                ></span>
              </a>
              <span class="character-example-pinyin">
                {{ example.pinyin }}
                <i
                  class="speak glyphicon glyphicon-volume-up"
                  v-bind:data-speak="example.word"
                ></i>
              </span>
              <em class="character-example-english">{{ example.english }}</em>
            </li>
          </ul>
          <button
            v-if="character.examples.length > 4"
            class="show-more collapsed"
            v-on:click="Helper.showMoreClick"
            title="Show all examples"
          >
            <span class="label-expand">Show {{ character.examples.length - 4 }} more</span>
            <span class="label-collapse">Collapse</span>
          </button>
        </div>
      </div>
    </div>

    <div class="container" :key="grammarKey">
      <div class="row mt-5 mb-5" v-if="entry.grammarPoints && entry.grammarPoints.length > 0">
        <div class="col-sm-12 text-center">
          <div class="label song-label mb-2">Grammar notes</div>
          <button
            class="show-more mt-4"
            v-on:click="Helper.showPinyinClick"
            data-target-selector="#grammar .grammar-structure, #grammar .grammar-example"
          >Show Pinyin</button>
          <div class="grammar-notes" id="grammar">
            <div v-for="grammar in entry.grammarPoints" class="grammar-notes-item">
              <div class="character-example-header-word grammar-structure">
                <b
                  v-html="
                    Helper.highlight(
                      grammar.structure,
                      entry.word,
                      grammar.book
                    )
                  "
                ></b>
              </div>
              <div class="example-sentence-english grammar-english">{{ grammar.english }}</div>
              <div
                class="example-sentence-word grammar-example"
                v-html="
                  Helper.highlight(grammar.example, entry.word, grammar.book)
                "
              ></div>
              <div
                class="character-example-english grammar-example-english"
              >{{ grammar.exampleTranslation }}</div>
              <a
                v-if="grammar.url !== ''"
                :href="grammar.url"
                :data-bg-hsk="grammar.book"
                class="show-more mt-3"
                target="_blank"
              >
                <i class="glyphicon glyphicon-facetime-video"></i>
                <b>Grammar Lesson</b>
                (HSK {{ grammar.book }} Lesson {{ grammar.lesson }} Grammar Note
                {{ grammar.number }} )
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container" :key="relatedKey">
      <div class="row mt-5" v-if="entry.related && entry.related.length > 0">
        <div class="col-sm-12">
          <div class="label song-label mb-2">Words related to “{{ entry.word }}”</div>
          <ul class="related collapsed" id="related" data-collapse-target>
            <li v-for="word in entry.related" class="related-item character-example">
              <a
                class="character-example-word"
                v-if="word.hskCandidates && word.hskCandidates.length > 0"
                :href="`#view/hsk/${word.hskCandidates[0].id}`"
              >
                <span :data-hsk="word.hskCandidates[0].book">
                  {{
                  word.word
                  }}
                </span>
              </a>
              <a
                class="character-example-word"
                v-if="
                  word.hskCandidates.length < 1 &&
                    word.cedictCandidates &&
                    word.cedictCandidates.length > 0
                "
                :href="
                  `#view/cedict/${word.cedictCandidates[0].traditional},${
                    word.cedictCandidates[0].pinyin
                  }`
                "
              >
                <span data-hsk="outside">{{ word.word }}</span>
              </a>
              <span
                class="character-example-pinyin"
                v-if="word.cedictCandidates && word.cedictCandidates.length > 0"
              >
                {{ word.cedictCandidates[0].pinyin }}
                <i
                  :data-speak="word.word"
                  class="speak glyphicon glyphicon-volume-up"
                ></i>
              </span>
              <ul
                class="character-example-english inline-list"
                v-if="word.cedictCandidates && word.cedictCandidates.length > 0"
              >
                <li v-for="definition in word.cedictCandidates[0].definitions">{{ definition.text }}</li>
              </ul>
            </li>
          </ul>
          <button
            v-if="entry.related.length > 12"
            class="show-more collapsed"
            v-on:click="Helper.showMoreClick"
            title="Show all related words"
            :data-bg-hsk="entry.book"
          >
            <span class="label-expand">Show {{ entry.related.length - 12 }} more</span>
            <span class="label-collapse">Collapse</span>
          </button>
        </div>
      </div>
    </div>

    <div class="container collocations" :key="collocationsKey">
      <div class="row mt-5" v-if="entry.sketch && entry.sketch.Gramrels">
        <collocations
          v-for="collocation in entry.sketch.Gramrels"
          v-if="
            collocation.name === 'SentObject_of' && collocation.Words.length > 0
          "
          :title="`Adjective/Verb + ${entry.word}`"
          :word="entry.word"
          :level="entry.book"
          :type="collocation.name"
          :collocation="collocation"
        ></collocations>
        <collocations
          v-for="collocation in entry.sketch.Gramrels"
          v-if="collocation.name === 'Modifier' && collocation.Words.length > 0"
          :title="`Adverb + ${entry.word}`"
          :word="entry.word"
          :level="entry.book"
          :type="collocation.name"
          :collocation="collocation"
        ></collocations>
        <collocations
          v-for="collocation in entry.sketch.Gramrels"
          v-if="
            collocation.name === 'A_Modifier' && collocation.Words.length > 0
          "
          :title="`Adjective + 的${entry.word}`"
          :word="entry.word"
          :level="entry.book"
          :type="collocation.name"
          :collocation="collocation"
        ></collocations>
        <collocations
          v-for="collocation in entry.sketch.Gramrels"
          v-if="
            collocation.name === 'Object_of' && collocation.Words.length > 0
          "
          :title="`Verb + ${entry.word}`"
          :word="entry.word"
          :level="entry.book"
          :type="collocation.name"
          :collocation="collocation"
        ></collocations>
        <collocations
          v-for="collocation in entry.sketch.Gramrels"
          v-if="collocation.name === 'Measure' && collocation.Words.length > 0"
          :title="`Measure Word + ${entry.word}`"
          :word="entry.word"
          :level="entry.book"
          :type="collocation.name"
          :collocation="collocation"
        ></collocations>
        <collocations
          v-for="collocation in entry.sketch.Gramrels"
          v-if="
            collocation.name === 'N_Modifier' && collocation.Words.length > 0
          "
          :title="`Noun + ${entry.word}`"
          :word="entry.word"
          :level="entry.book"
          :type="collocation.name"
          :collocation="collocation"
        ></collocations>
        <collocations
          v-for="collocation in entry.sketch.Gramrels"
          v-if="
            collocation.name === 'Possessor' && collocation.Words.length > 0
          "
          :title="`Noun + 的${entry.word}`"
          :word="entry.word"
          :level="entry.book"
          :type="collocation.name"
          :collocation="collocation"
        ></collocations>
        <collocations
          v-for="collocation in entry.sketch.Gramrels"
          v-if="
            collocation.name === 'Possession' && collocation.Words.length > 0
          "
          :title="`${entry.word}的 + Noun`"
          :word="entry.word"
          :level="entry.book"
          :type="collocation.name"
          :collocation="collocation"
        ></collocations>
        <collocations
          v-for="collocation in entry.sketch.Gramrels"
          v-if="collocation.name === 'Modifies' && collocation.Words.length > 0"
          :title="`${entry.word} (的) + Noun`"
          :word="entry.word"
          :level="entry.book"
          :type="collocation.name"
          :collocation="collocation"
        ></collocations>
        <collocations
          v-for="collocation in entry.sketch.Gramrels"
          v-if="collocation.name === 'Object' && collocation.Words.length > 0"
          :title="`${entry.word} + Noun`"
          :word="entry.word"
          :level="entry.book"
          :type="collocation.name"
          :collocation="collocation"
        ></collocations>
        <collocations
          v-for="collocation in entry.sketch.Gramrels"
          v-if="
            collocation.name === 'SentObject' && collocation.Words.length > 0
          "
          :title="`${entry.word} + Complement`"
          :word="entry.word"
          :level="entry.book"
          :type="collocation.name"
          :collocation="collocation"
        ></collocations>
      </div>
    </div>

    <div class="container concordance" :key="concordanceKey">
      <div class="row mb-5" v-if="entry.examples && entry.examples.length > 0">
        <div class="col-sm-12">
          <div class="label song-label mb-2">Sentences with “{{ entry.word }}”</div>
          <button
            class="show-more mt-1"
            v-on:click="Helper.showPinyinClick"
            data-target-selector="#examples"
          >Show Pinyin</button>
          <ul class="character-examples collapsed" id="examples" data-collapse-target>
            <li class="character-example" v-for="example in entry.examples.slice(0, 100)">
              <span
                class="character-example-word"
                v-html="Helper.highlight(example, entry.word, entry.book)"
              ></span>
            </li>
          </ul>
          <button
            v-if="entry.examples.length > 4"
            class="show-more collapsed"
            v-on:click="Helper.showMoreClick"
            title="Show all examples"
            :data-bg-hsk="entry.book"
          >
            <span class="label-expand">Show {{ Math.min(entry.examples.length, 100) - 4 }} more</span>
            <span class="label-collapse">Collapse</span>
          </button>
        </div>
      </div>
    </div>

    <div class="container mistakes" :key="mistakesKey">
      <div class="row mb-5" v-if="entry.mistakes && entry.mistakes.length > 0">
        <div class="col-sm-12">
          <div
            class="label song-label mb-2 mistakes-label"
          >Common mistakes containing “{{ entry.word }}”</div>
          <button
            class="show-more mt-1"
            v-on:click="Helper.showPinyinClick"
            data-target-selector="#mistakes .character-example-word, #mistakes .mistake-l1"
          >Show Pinyin</button>
          <ul class="character-examples collapsed" id="mistakes" data-collapse-target>
            <li class="character-example mistake-item" v-for="mistake in entry.mistakes">
              <span
                class="character-example-word concordance-context collapsed"
                data-collapse-target
              >{{ mistake.leftContext }}</span>
              <span class="character-example-word mistake-sentence">
                {{ mistake.left }}
                <span class="mistake-word">{{ entry.word }}</span>
                {{ mistake.right }}
              </span>
              <span
                class="character-example-word concordance-context collapsed"
                data-collapse-target
              >{{ mistake.rightContext }}</span>
              <button class="show-more collapsed" v-on:click="Helper.showMoreClick">
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
              <span class="mistake-description" v-if="mistake.errorLevel && mistake.errorType">
                Mistake with
                <b>
                  {{ mistake.errorLevel }}
                  <span
                    v-if="mistake.errorType !== 'anomaly'"
                  >({{ mistake.errorType }})</span>
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
            <span class="label-expand">Show {{ entry.mistakes.length - 4 }} more</span>
            <span class="label-collapse">Collapse</span>
          </button>
        </div>
      </div>
    </div>

    <!-- ANCHOR img/anchors/learn-this.png -->
    <div class="container-fluid learn-this-bar" v-cloak v-if="entry.book !== 'outside'">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 text-center">
            <a
              :href="
                `https://courses.chinesezerotohero.com/p/hsk-${
                  entry.book
                }-course`
              "
            >
              <img :src="`img/courses/hsk${entry.book}.jpg`" class="course-cover" />
            </a>
            <br />
            Learn how to use “{{ entry.word }}” in
            <b>
              Lesson {{ entry.lesson }}
              <span v-if="entry.book < 5">, Text {{ entry.dialog }}</span>
            </b>
            of our
            <a
              href="https://courses.chinesezerotohero.com/"
              class="video-course"
            >HSK {{ entry.book }} Video Course</a>
          </div>
        </div>
      </div>
    </div>

    <!-- ANCHOR img/anchors/learn-this.png -->
    <div class="container-fluid learn-this-bar" v-cloak v-if="entry.book === 'outside'">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 text-center">
            <a href="https://chinesezerotohero.teachable.com/p/path-to-fluency">
              <img src="img/courses/fluency.jpg" class="course-cover" />
            </a>
            <br />Learn how to progress
            <em>beyond the HSK</em> toward fluency
            with our
            <a
              href="https://chinesezerotohero.teachable.com/p/path-to-fluency"
              class="video-course"
            >Path to Fluency Video Course</a>
          </div>
        </div>
      </div>
    </div>

    <!-- ANCHOR img/anchors/lyrics-bar.png -->
    <div
      class="container-fluid song-lyrics-bar"
      :data-bg-hsk="entry.book"
      v-cloak
      v-if="lrcs && lrcs.length > 0"
    >
      <div class="container">
        <div class="row">
          <div class="col-sm-12 text-center">
            <strong>“{{ entry.word }}” IN SONG LYRICS</strong>
          </div>
        </div>
      </div>
    </div>
    <div class="container-flud lyrics-bar" v-cloak v-if="lrcs && lrcs.length > 0">
      <div class="songs">
        <div
          class="row song"
          v-for="(lrc, lrcIndex) in lrcs"
          v-if="lrc.youtube && lrc.youtube.length > 0"
        >
          <div class="container">
            <div class="row">
              <div class="col-md-6 text-center lyrics-wrapper sm-mb2">
                <button
                  class="show-more mb-3"
                  v-on:click="Helper.showPinyinClick"
                  :data-target-selector="'#lyrics-' + entry.id + '-' + lrcIndex"
                >Show Pinyin</button>
                <div
                  class="lyrics collapsed"
                  :id="'lyrics-' + entry.id + '-' + lrcIndex"
                  data-collapse-target
                >
                  <div class="lyrics-title" v-html="lrc.artist + '《' + lrc.title + '》'"></div>
                  <hr />
                  <div
                    class="lyrics-line"
                    v-for="(line, lineIndex) in lrc.content"
                    v-if="!LRC.rejectLine(line.line)"
                    v-bind:class="{
                      matched: lrc.matchedLines.includes(lineIndex),
                      'matched-context': LRC.inContext(lineIndex, 2, lrc)
                    }"
                    v-on:click="YouTube.seekYouTube(lrc, line.starttime)"
                    v-html="highlight(line.line)"
                  ></div>
                </div>
                <button
                  class="show-more collapsed mt1"
                  v-on:click="Helper.showMoreClick"
                  :data-bg-hsk="entry.book"
                >
                  <span class="label-expand">Show Entire Song</span>
                  <span class="label-collapse">Collapse</span>
                </button>
              </div>
              <div class="col-md-6 text-center">
                <div class="youtube-versions" :id="'lrc-' + lrcIndex + '-youtube'">
                  <div class="youtube" v-for="youtube in lrc.youtube">
                    <div
                      v-bind:style="{
                        backgroundImage:
                          'url(' +
                          '//img.youtube.com/vi/' +
                          youtube +
                          '/hqdefault.jpg' +
                          ')'
                      }"
                      class="youtube-screen"
                      v-on:click="
                        YouTube.loadYouTubeiFrame(
                          youtube,
                          lrc.content[lrc.matchedLines[0]].starttime,
                          'lrc-' + lrcIndex + '-youtube-' + youtube,
                          lrc
                        )
                      "
                    >
                      <div :id="'lrc-' + lrcIndex + '-youtube-' + youtube"></div>
                    </div>
                  </div>
                  <div class="mt-4">
                    Showing {{ lrc.currentYoutubeIndex }} of
                    {{ lrc.youtube.length }} videos of this song.
                    <button
                      v-on:click="YouTube.cycleYouTube(lrc, lrcIndex)"
                      class="youtube-version-button btn-small"
                    >Show Next</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- .lyrics-bar -->
  </div>
</template>

<script>
import Collocations from '@/components/Collocations.vue'
import Decomposition from '@/components/Decomposition.vue'
import SavedHSKWords from '@/lib/saved-hsk-words'
import HSK from '@/lib/hsk'
import Hanzi from '@/lib/hanzi'
import CEDICT from '@/lib/cedict'
import SketchEngine from '@/lib/sketch-engine'
import LRC from '@/lib/lrc'
import WordPhotos from '@/lib/word-photos'
import Grammar from '@/lib/grammar'
import $ from 'jquery'

export default {
  components: {
    Collocations,
    Decomposition
  },
  data() {
    return {
      entry: undefined,
      characters: [],
      character: {},
      hasImage: true,
      admin: false,
      image: undefined,
      lrcs: [], // matched song lyrics, pulled from another server
      unsplashSrcs: [],
      unsplashSearchTerm: '',
      entryKey: 0, // used to force re-render this component
      collocationsKey: 0,
      concordanceKey: 0,
      relatedKey: 0,
      webImagesKey: 0,
      mistakesKey: 0,
      grammarKey: 0,
      savedWordsKey: 0
    }
  },
  computed: {
    hasPrevious: function() {
      var thisId = parseInt(this.entry.id)
      if (SavedHSKWords.count() < 2) {
        return HSK.hasPrevious(thisId)
      } else {
        let i = SavedHSKWords.getIdsSorted().indexOf(thisId.toString())
        return i > 0
      }
    },
    hasNext: function() {
      var thisId = parseInt(this.entry.id)
      if (SavedHSKWords.count() < 2) {
        return HSK.hasNext(thisId)
      } else {
        let i = SavedHSKWords.getIdsSorted().indexOf(thisId.toString())
        return i + 1 < SavedHSKWords.count()
      }
    },
    hash: function() {
      if (this.entry && this.entry.method) {
        let args
        if (this.entry.method === 'hsk') {
          args = [this.entry.id]
        } else if (this.entry.method === 'cedict') {
          args = [this.entry.traditional]
        }
        return `view/${this.entry.method}/${args.join(',')}`
      } else {
        // uninitialized
        return `view/hsk/1`
      }
    }
  },
  methods: {
    previousClick() {
      var thisId = parseInt(this.entry.id)
      var previousId
      if (SavedHSKWords.count() < 2) {
        previousId = Math.max(HSK.first(), thisId - 1)
      } else {
        const savedIds = SavedHSKWords.getIdsSorted()
        let i = savedIds.indexOf(thisId.toString())
        var previousIndex = Math.max(0, i - 1)
        previousId = savedIds[previousIndex]
      }
      location.hash = 'view/hsk/' + previousId
    },
    nextClick() {
      let thisId = parseInt(this.entry.id)
      let nextId
      if (SavedHSKWords.count() < 2) {
        nextId = Math.min(HSK.last(), thisId + 1)
      } else {
        const savedIds = SavedHSKWords.getIdsSorted()
        let i = savedIds.indexOf(thisId.toString())
        let nextIndex = Math.min(SavedHSKWords.count() - 1, i + 1)
        nextId = savedIds[nextIndex]
      }
      location.hash = 'view/hsk/' + nextId
    },
    highlight(text) {
      if (text) {
        return text.replace(
          this.entry.word,
          '<span data-hsk="' +
            this.entry.book +
            '">' +
            this.entry.word +
            '</span>'
        )
      }
    },
    recalculateExampleColumns: function(word) {
      var $div = $('.character-example-wrapper > div')
      var span = 12 / word.length
      $div.removeClass()
      $div.addClass('col-md-' + span)
    },
    show(entry) {
      const app = this
      app.entryKey += 1
      app.entry = entry
      app.characters = Hanzi.getCharactersInWord(entry.word)
      app.characters.forEach(function(character) {
        character.examples = HSK.lookupFuzzy(character.character)
      })
      LRC.getLrcs(entry.word, function(lrcs) {
        lrcs.forEach(function(lrc) {
          lrc.matchedLines = []
          lrc.content.forEach(function(line, index) {
            if (line.line.includes(entry.word)) {
              lrc.matchedLines.push(index)
            }
          })
          lrc.currentYoutubeIndex = 1 // "Showing 1 of 23 videos..."
        })
        app.lrcs = lrcs.sort(function(a, b) {
          return (
            Object.keys(b.matchedLines).length -
            Object.keys(a.matchedLines).length
          )
        })
      })
      SketchEngine.thesaurus(entry.word, function(response) {
        entry.related = []
        for (let Word of response.Words) {
          Word.hskCandidates = HSK.lookup(Word.word)
          Word.cedictCandidates = CEDICT.lookupSimplified(Word.word)
          entry.related.push(Word)
        }
        app.relatedKey += 1
      })
      SketchEngine.wsketch(entry.word, function(response) {
        entry.sketch = response
        app.collocationsKey += 1
      })
      SketchEngine.concordance(entry.word, function(response) {
        entry.examples = response.slice(0, 25)
        app.concordanceKey += 1
      })
      SketchEngine.mistakes(entry.word, function(response) {
        entry.mistakes = response
        app.mistakesKey += 1
      })
      WordPhotos.getWebImages(entry.word, function(srcs) {
        entry.images = srcs
        app.webImagesKey += 1
      })
      entry.grammarPoints = Grammar.lookupFuzzy(entry.word)
      app.grammarKey += 1
      app.getImage(entry)
      app.suggestions = []
      $('#lookup').val(entry.word)
      $('.youtube iframe').remove() // Show new videos;
    },
    getImage() {
      var app = this
      WordPhotos.getPhoto(
        app.entry,
        function(imagePath) {
          app.image = imagePath
          app.hasImage = true
        },
        function() {
          app.hasImage = false
        }
      )
    },
    highlightCharacter(text, character, hsk) {
      if (text) {
        return text.replace(
          character,
          '<span data-hsk="' + hsk + '">' + character + '</span>'
        )
      }
    },
    attachSpeakEventHandler: function() {
      $('.speak')
        .off()
        .click(function() {
          var text = $(this).attr('data-speak')
          var utterance = new SpeechSynthesisUtterance(text)
          utterance.lang = 'zh-CN'
          speechSynthesis.speak(utterance)
        })
    },
    togglePartExamples(part) {
      var app = this
      if (!part.hskCharacters) {
        part.hskCharacters = HSK.getHSKCharactersByRadical(part.character)
      }
      part.showExamples
        ? (part.showExamples = false)
        : (part.showExamples = true)
      app.$forceUpdate()
    },
    searchImageKeyupEnter(e) {
      const app = this
      WordPhotos.getSrcsFromUnsplash($(e.target).val(), function(srcs) {
        app.unsplashSrcs = srcs
      })
    },
    imageUrlKeyupEnter(e) {
      var $input = $(e.target)
      var url = $(e.target).val()
      this.uploadPhotoAndUpdate(url, $input)
    },
    uploadPhotoAndUpdate(url, $button) {
      const app = this
      WordPhotos.savePhoto(app.entry, url, function(response) {
        $button.after('<span class="success">Uploaded</span>')
        app.hasImage = true
        app.image = response.url + '?' + Date.now()
        setTimeout(function() {
          $('.success').remove()
        }, 3000)
      })
    },
    unsplashThumbClick(e) {
      var $button = $(e.target)
      var url = $button.attr('src')
      this.uploadPhotoAndUpdate(url, $button)
    }
  },
  mounted() {
    const method = this.$route.params.method
    const args = this.$route.params.args.split(',')
    if (method == 'hsk') {
      if (args.length > 0) {
        const id = args[0]
        let entry = HSK.get(id)
        if (!entry) {
          location.hash = '/'
          return
        }
        const cedictCandidates = CEDICT.lookupSimplified(
          entry.word,
          entry.pinyin
        )
        if (cedictCandidates.length === 1) {
          entry = Object.assign(entry, cedictCandidates[0])
        }
        this.show(entry)
      }
    } else if (method === 'cedict') {
      if (args.length > 0) {
        const traditional = args[0]
        const pinyin = args[1]
        let entry = CEDICT.get(traditional, pinyin)
        if (entry) {
          entry.word = entry.simplified
          entry.book = 'outside'
          this.show(entry)
        } else {
          location.hash = '/'
          return
        }
      }
    }
  },
  updated() {
    const app = this
    if (this.entry) {
      app.recalculateExampleColumns(this.entry.word)
      app.attachSpeakEventHandler()
    }
  }
}
</script>
