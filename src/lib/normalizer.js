import HSK from './hsk'
import CEDICT from './cedict'

export default {
  get(traditional, pinyin, index = 0) {
    let cedictWord = CEDICT.get(traditional, pinyin, index)
    if (cedictWord) {
      return this.normalize(cedictWord)
    }
  },
  normalize(word) {
    if (word.traditional && !word.book) {
      return this.assignHSK(word)
    } else if (word.book && !word.traditional) {
      return this.assignCEDICT(word)
    }
    return word
  },
  getArgs(method, data) {
    if (method === 'hsk') {
      return [data.id]
    } else if (method === 'cedict') {
      return [data.traditional, data.pinyin]
    }
  },
  assignCEDICT(hskWord) {
    const cedictWords = CEDICT.lookupSimplified(hskWord.word, hskWord.pinyin)
    if (cedictWords.length > 0) {
      const cedictWord = cedictWords[0]
      Object.assign(hskWord, cedictWord)
      hskWord.hasCEDICT = true
    } else {
      hskWord.simplified = hskWord.word
      hskWord.definitions = [
        {
          type: 'definition',
          text: hskWord.english
        }
      ]
      hskWord.hasCEDICT = false
    }
    return hskWord
  },

  assignHSK(cedictWord) {
    const hskWords = HSK.lookup(cedictWord.simplified, cedictWord.pinyin)
    if (hskWords.length > 0) {
      const hskWord = hskWords[0]
      Object.assign(cedictWord, {
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
        hasHSK: true
      })
    } else {
      cedictWord.book = 'outside'
      cedictWord.hasHSK = false
    }
    return cedictWord
  }
}