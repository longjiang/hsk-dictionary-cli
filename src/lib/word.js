import HSK from './hsk'
import CEDICT from './cedict'

export default class {
  constructor(method, args) {
    this.method = method
    this.args = args
    if (method === 'hsk') {
      let hskWord = HSK.get(args[0])
      if (hskWord) {
        this._assignHSK(hskWord)
        const cedictWords = CEDICT.lookupSimplified(
          hskWord.word,
          hskWord.pinyin
        )
        if (cedictWords && cedictWords.length > 0) {
          this._assignCEDICT(cedictWords[0])
        }
      }
    } else if (method === 'cedict') {
      const cedictWord = CEDICT.get(...args)
      if (cedictWord) {
        this._assignCEDICT(cedictWord)
        const hskWords = HSK.lookup(cedictWord.simplified, cedictWord.pinyin)
        if (hskWords && hskWords.length > 0) {
          this._assignHSK(hskWords[0])
        }
        cedictWord.book = 'outside'
        return cedictWord
      }
    }
  }
  static getArgs(method, data) {
    if (method === 'hsk') {
      return [data.id]
    } else if (method === 'cedict') {
      return [data.traditional, data.pinyin]
    }
  }
  _assignCEDICT(cedictWord) {
    Object.assign(this, cedictWord)
  }
  _assignHSK(hskWord) {
    Object.assign(this, {
      id: hskWord.id,
      simplified: hskWord.word,
      pinyin: hskWord.pinyin,
      book: hskWord.book,
      lesson: hskWord.lesson,
      dialog: hskWord.dialog,
      nw: hskWord.nw,
      examplePinyin: hskWord.examplePinyin,
      example: hskWord.example,
      exampleTranslation: hskWord.exampleTranslation,
      oofc: hskWord.oofc,
      pn: hskWord.pn,
      definitions: [
        {
          type: 'definition',
          definition: hskWord.english
        }
      ]
    })
  }
}
