import $ from 'jquery'
import Helper from './helper'
import Config from './config'
import SketchEngine from './sketch-engine'

export default {
  proficiency: {
    初级: 'beginner',
    中级: 'intermediate',
    高级: 'advanced'
  },
  corpra: [
    {
      code: 'zhtenten_lenoch',
      name: 'Chinese Web 2011 (zhTenTen11, Stanford tagger)',
      words: 1729867455,
      language: 'Chinese Simplified',
      note:
        'Featured. This is the default. Although having fewer words than Chinese Web 2017, the data is much cleaner.'
    },
    {
      code: 'cgw2_sc',
      name: 'Chinese GigaWord 2 Corpus: Mainland, simplified',
      words: 205031379,
      language: 'Chinese Simplified',
      note:
        'Non-Web. That means the text is from sources other than the Internet.'
    },
    {
      code: 'i_zh',
      name: 'Chinese Web (Internet-ZH, NEUCSP tagger)',
      words: 198205344,
      language: 'Chinese Simplified',
      note: 'Web. That means the text source is from the Internet.'
    },
    {
      code: 'zhtenten_10M',
      name: 'Chinese Web 2011 (zhTenTen11, sample 10M)',
      words: 9012125,
      language: 'Chinese Simplified',
      note: 'Web'
    },
    {
      code: 'zhtenten17_simplified_stf2',
      name: 'Chinese Web 2017 (zhTenTen17) Simplified',
      words: 13531331169,
      language: 'Chinese Simplified',
      note: 'Web'
    },
    {
      code: 'opus2_zh',
      name: 'OPUS2 Chinese Simplified',
      words: 243427123,
      language: 'Chinese Simplified',
      note:
        'Parallel. That means English <b>translation</b> is available. However, the text is mostly from UN / public domain sources, with less colloquial examples.'
    },
    {
      code: 'cgw2_tc',
      name: 'Chinese GigaWord 2 Corpus: Taiwan, traditional',
      words: 382600557,
      language: 'Chinese Traditional',
      note: 'Non-Web'
    },
    {
      code: 'chinese_taiwan_usg',
      name: 'Chinese Traditional Web (TaiwanWaC, Universal Sketch Grammar)',
      words: 259156002,
      language: 'Chinese Traditional',
      note: 'Web'
    },
    {
      code: 'chinese_taiwan',
      name: 'Chinese Traditional Web (TaiwanWaC)',
      words: 259156002,
      language: 'Chinese Traditional',
      note: 'Web'
    },
    {
      code: 'zhtenten17_traditional_stf2',
      name: 'Chinese Web 2017 (zhTenTen17) Traditional',
      words: 2400405372,
      language: 'Chinese Traditional',
      note: 'Web'
    },
    {
      code: 'opus2_zh_TW',
      name: 'OPUS2 Chinese Traditional',
      words: 380245,
      language: 'Chinese Traditional',
      note: 'Parallel'
    },
    {
      code: 'guangwai',
      name: 'Guangwai - Lancaster Chinese Learner Corpus',
      words: 1289060,
      language: 'Chinese Simplified',
      note: 'Learner'
    }
  ],
  mistakeRefKeys: [
    '=text.id',
    '=err.type',
    '=err.level',
    '=u.proficiency',
    '=u.score',
    '=u.country',
    '=u.l1',
    '=u.gender',
    '=text.genre',
    '=text.interaction',
    '=text.mode',
    '=u.role',
    '=text.wordcount',
    '=text.topic',
    '=u.who',
    '=err.combin',
    '=err.target',
    '#',
    'text'
  ],
  errors: {
    orth: 'orthography',
    punct: 'puncutation',
    mean: 'word choice',
    form: 'form',
    col: 'collocation',
    wo: 'word order',
    incl: 'inclusion of extra word(s)',
    anom: 'anomaly',
    omit: 'omission of word(s)'
  },
  corpname() {
    return localStorage.getItem('czhCorpname') || 'zhtenten_lenoch'
  },
  collocationDescription(word) {
    return {
      // Common for all
      'and/or': `A (和) B`,

      // Common for nouns
      Measure: `Measure Word + ${word}`,
      A_Modifier: `Adjective + 的 + ${word}`,
      Possessor: `Noun + 的 + ${word}`,
      Possession: `${word} + 的 + Noun`,
      N_Modifier: `Noun + ${word}`,
      Subject_of: `${word} + Verb`,
      Object_of: `Verb + ${word}`,
      'Direct-Object_of': `Verb + ${word}`,
      'Indirect-Object_of': `Verb + ${word}`,

      // Common for Adjectives
      SentObject_of: `Adjective/Verb + ${word}`,
      Modifies: `${word} + (的) + Noun`,

      // Common for Verbs
      Modifier: `Adverb + ${word}`,
      Object: `${word} + Noun`,
      SentObject: `${word} + Complement`
    }
  },
  wsketch(term, callback) {
    $.getJSON(
      `${
        Config.sketchEngineProxy
      }?https://api.sketchengine.eu/bonito/run.cgi/wsketch?corpname=preloaded/${this.corpname()}&lemma=${term}`,
      function(response) {
        if (response.data.Gramrels && response.data.Gramrels.length > 0) {
          response.data.Gramrels.forEach(function(Gramrel) {
            Gramrel.Words = Gramrel.Words.filter(function(Word) {
              return Word.cm !== ''
            })
            for (let Word of Gramrel.Words) {
              Word.cm = Word.cm.replace(/-\w( ?)/gi, '')
            }
          })
        }
        callback(response.data)
      }
    )
  },
  concordance(term, callback) {
    let parallel = this.corpname().startsWith('opus')
    let requestJSON = parallel
      ? `{"attrs":"word","structs":"s,g","refs":"=doc.subcorpus","ctxattrs":"word","viewmode":"align","usesubcorp":"","freqml":[{"attr":"word","ctx":"0","base":"kwic"}],"fromp":1,"pagesize":1000,"concordance_query":[{"queryselector":"iqueryrow","sel_aligned":["opus2_en"],"cql":"","iquery":"${term}","queryselector_opus2_en":"iqueryrow","iquery_opus2_en":"","pcq_pos_neg_opus2_en":"pos","filter_nonempty_opus2_en":"on"}]}`
      : `{"lpos":"","wpos":"","default_attr":"word","attrs":"word","refs":"=doc.website","ctxattrs":"word","attr_allpos":"all","usesubcorp":"","viewmode":"kwic","cup_hl":"q","cup_err":"true","cup_corr":"","cup_err_code":"true","structs":"s,g","gdex_enabled":0,"fromp":1,"pagesize":50,"concordance_query":[{"queryselector":"iqueryrow","iquery":"${term}"}],"kwicleftctx":"100#","kwicrightctx":"100#"}`
    $.post(
      `${
        Config.sketchEngineProxy
      }?https://app.sketchengine.eu/bonito/run.cgi/concordance?corpname=preloaded/${this.corpname()}`,
      {
        json: requestJSON
      },
      function(response) {
        try {
          const data = JSON.parse(response).data
          var result = []
          data.Lines.slice(0, 500).forEach(function(Line) {
            var line =
              Line.Left.map(function(item) {
                return item ? item.str : ''
              }).join('') +
              Line.Kwic[0].str +
              Line.Right.map(function(item) {
                return item ? item.str : ''
              }).join('')
            line = '。' + line + '。'
            line = line.replace(
              new RegExp(
                `.*[。！？“]([^。！？”]*${term}[^。！？”]*[。！？”]).*`,
                'gi'
              ),
              '$1'
            )
            line = line.replace(/[”]$/, '').replace(/^[。，）]*/, '')
            if (
              line.length > term.length + 4 &&
              line.match(/[。！？]$/) &&
              !line.match(/，。$/)
            ) {
              let parallelLine = {
                chinese: line
              }
              if (Line.Align && Line.Align[0].Kwic) {
                parallelLine.english = Line.Align[0].Kwic.map(
                  kwic => kwic.str
                ).reduce((english, kwic) => english + ' ' + kwic)
              }
              result.push(parallelLine)
            }
          })
          result = result.sort(function(a, b) {
            return a.chinese.length - b.chinese.length
          })
          callback(Helper.unique(result))
        } catch (err) {
          throw 'Concordance did not return any data.'
        }
      }
    )
  },
  thesaurus(term, callback) {
    $.post(
      `${
        Config.sketchEngineProxy
      }?https://app.sketchengine.eu/bonito/run.cgi/thes?corpname=preloaded/${this.corpname()}`,
      {
        lemma: term,
        lpos: '',
        clusteritems: 0,
        maxthesitems: 100,
        minthesscore: 0,
        minsim: 0.3
      },
      function(response) {
        let data = {}
        try {
          data = JSON.parse(response).data
        } catch (err) {
          throw 'Error in thesaurus'
        }
        callback(data)
      }
    )
  },
  mistakes(term, callback) {
    $.post(
      `${
        Config.sketchEngineProxy
      }?https://app.sketchengine.eu/bonito/run.cgi/concordance?corpname=preloaded/guangwai`,
      {
        json: JSON.stringify({
          lpos: '',
          wpos: '',
          default_attr: 'word',
          attrs: 'word',
          refs: SketchEngine.mistakeRefKeys.join(','),
          ctxattrs: 'word',
          attr_allpos: 'all',
          usesubcorp: '',
          viewmode: 'kwic',
          cup_hl: 'q',
          cup_err: '',
          cup_corr: '',
          cup_err_code: '',
          structs: 's,g',
          gdex_enabled: 0,
          fromp: 1,
          pagesize: 50,
          concordance_query: [
            {
              queryselector: 'iqueryrow',
              iquery: term,
              'sca_err.level': ['col', 'form', 'mean', 'orth', 'punct'],
              'sca_err.type': ['anom', 'incl', 'omit', 'wo']
            }
          ],
          kwicleftctx: '100#',
          kwicrightctx: '100#'
        })
      },
      function(response) {
        const data = JSON.parse(response).data
        let results = []
        for (let Line of data.Lines) {
          try {
            const ml = Line.Left.map(function(item) {
              return item.str || item.strc
            })
              .join('')
              .match(/(.*)<s>([^<s>]*?)$/)
            const left = ml[2]
            const leftContext = ml[1].replace(/<s>/g, '').replace(/<\/s>/g, '')
            let mr = Line.Right.map(function(item) {
              return item.str || item.strc
            })
              .join('')
              .match(/^([^</s>]*)<\/s>(.*)/)
            const right = mr[1]
            const rightContext = mr[2].replace(/<s>/g, '').replace(/<\/s>/g, '')
            var refs = {}
            for (let i in Line.Refs) {
              refs[SketchEngine.mistakeRefKeys[i]] = Line.Refs[i]
            }
            const country = refs['=text.id'].replace(
              /^[^_]*_[^_]*_[^_]*_[^_]*_([^_]*).*/g,
              '$1'
            )
            results.push({
              left: left,
              right: right,
              leftContext: leftContext,
              rightContext: rightContext,
              text: left + term + right,
              country: Helper.country(country),
              refs: refs,
              proficiency: SketchEngine.proficiency[refs['=u.proficiency']],
              errorType: SketchEngine.errors[refs['=err.type']],
              errorLevel: SketchEngine.errors[refs['=err.level']],
              l1: refs['=u.l1']
            })
          } catch (err) {
            console.log(err)
          }
        }
        results = results.sort(function(a, b) {
          return a.text.length - b.text.length
        })
        callback(results)
      }
    )
  }
}
