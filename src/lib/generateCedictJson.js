import Helper from '.helper'

export default {
  _data: [],
  generate(cedictText, callback) {
    let same = {
      traditional: undefined,
      pinyin: undefined
    }
    for (let line of cedictText.split('\n')) {
      if (!line.startsWith('#')) {
        const matches = line.match(/^([^\s]+) ([^\s]+) \[(.+)\] \/(.*)\//)
        if (matches) {
          let row = {
            simplified: matches[2],
            traditional: matches[1],
            pinyin: this.parsePinyin(matches[3]),
            pinyinFuzzy: matches[3].replace(/\d/g, ''),
            definitions: matches[4].split('/'),
            index: 0, // for homonyms
            search:
              matches[1] +
              ' ' +
              matches[2] +
              ' ' +
              matches[3].toLowerCase().replace(/[\s\d]/gi, '') +
              ' ' +
              matches[4]
          }
          if (
            row.traditional === same.traditional &&
            row.pinyin === same.pinyin
          ) {
            row.index++
          } else {
            same = {
              traditional: row.traditional,
              pinyin: row.pinyin
            }
          }
          row.identifier = `${row.traditional},${row.pinyin},${
            row.index
          }`.replace(/ /g, '_')
          Object.freeze(row)
          if (row) this._data.push(row)
        }
      }
    }
    this._data = this._data.sort(function(a, b) {
      return b.simplified.length - a.simplified.length
    })
    Helper.loaderMessage('CC-CEDICT library ready.')
    return this._data
  }
}
