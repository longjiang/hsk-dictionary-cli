import $ from 'jquery'
import Helper from './helper'
import Config from './config'

export default {
  corpname: 'preloaded/zhtenten17_simplified_stf2',
  proficiency: {
    初级: 'beginner',
    中级: 'intermediate',
    高级: 'advanced'
  },
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
  wsketch(term, callback) {
    $.getJSON(
      `${
        Config.sketchEngineProxy
      }?https://api.sketchengine.eu/bonito/run.cgi/wsketch?corpname=${
        this.corpname
      }&lemma=${term}`,
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
    $.post(
      `${
        Config.sketchEngineProxy
      }?https://app.sketchengine.eu/bonito/run.cgi/concordance?corpname=${
        this.corpname
      }`,
      {
        json: `{"lpos":"","wpos":"","default_attr":"word","attrs":"word","refs":"=doc.website","ctxattrs":"word","attr_allpos":"all","usesubcorp":"","viewmode":"kwic","cup_hl":"q","cup_err":"true","cup_corr":"","cup_err_code":"true","structs":"s,g","gdex_enabled":0,"fromp":1,"pagesize":1000,"concordance_query":[{"queryselector":"iqueryrow","iquery":"${term}"}],"kwicleftctx":"100#","kwicrightctx":"100#"}`
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
            line = line.replace(/[”]$/, '')
            if (
              line.length > term.length + 4 &&
              line.match(/[。！？]$/) &&
              !line.match(/，。$/)
            ) {
              result.push(line)
            }
          })
          result = result.sort(function(a, b) {
            return a.length - b.length
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
      }?https://app.sketchengine.eu/bonito/run.cgi/thes?corpname=${
        this.corpname
      }`,
      {
        lemma: term,
        lpos: '',
        clusteritems: 0,
        maxthesitems: 100,
        minthesscore: 0,
        minsim: 0.3
      },
      function(response) {
        try {
          const data = JSON.parse(response).data
          callback(data)
        } catch (err) {
          throw 'Thesaurus did not return any data.'
        }
      }
    )
  },
  mistakes(term, callback) {
    let SketchEngine = this
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
        let SketchEngine = this
        try {
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
              const leftContext = ml[1]
                .replace(/<s>/g, '')
                .replace(/<\/s>/g, '')
              let mr = Line.Right.map(function(item) {
                return item.str || item.strc
              })
                .join('')
                .match(/^([^</s>]*)<\/s>(.*)/)
              const right = mr[1]
              const rightContext = mr[2]
                .replace(/<s>/g, '')
                .replace(/<\/s>/g, '')
              var refs = {}
              const r = Line.ref.split(',')
              for (let i = 0; i < r.length; i++) {
                refs[SketchEngine.mistakeRefKeys[i]] = r[i]
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
              // catch errors
            }
          }
          results = results.sort(function(a, b) {
            return a.text.length - b.text.length
          })
          callback(results)
        } catch (err) {
          throw 'Concordance (mistakes) did not return any data.'
        }
      }
    )
  }
}
