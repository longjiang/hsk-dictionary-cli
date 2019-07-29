import $ from 'jquery'

export default {
  getLrcs(word, callback) {
    $.getJSON(
      'https://www.chinesezerotohero.com/lyrics-search/lrc/search/' +
        word +
        '/20', // Limit to only 20 songs
      function(results) {
        callback(results)
      }
    )
  },
  rejectLine(line) {
    var bannedPatterns = [
      'www',
      'LRC',
      ' - ',
      '歌词',
      'QQ',
      '演唱：',
      '编辑：',
      '☆'
    ]
    var rejected = false
    bannedPatterns.forEach(function(pattern) {
      if (line.includes(pattern)) {
        rejected = true
      }
    })
    return rejected
  },
  /**
   *
   * @param {*} index the index of the lrc line
   * @param {*} margin show 'margin' number of lines above and below the first matched line
   * @param {*} lrc the lrc object
   */
  inContext(index, margin, lrc) {
    var min = lrc.matchedLines[0] - margin
    var max = lrc.matchedLines[0] + margin
    return index >= min && index <= max
  }
}
