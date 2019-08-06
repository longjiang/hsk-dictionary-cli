const AnnotatorService = {
  annotate(text, callback = function() {}) {
    const result = this._annotateIteratively(
      text,
      HSKCEDICT.subdictFromText(text),
      HSKCEDICT.isTraditional(text)
    )
    callback(result)
    return result
  },
  _annotateIteratively(text, subdict, traditional = false) {
    const annotatorService = this
    const longest = subdict.longest(text, traditional)
    if (longest.matches.length > 0) {
      let result = []
      text.split(longest.text).forEach(function(item) {
        result.push(item)
        result.push(longest.matches)
      })
      result = result.filter(function(item) {
        return item !== ''
      })
      result.pop()
      var newArr = []
      result.forEach(function(item) {
        if (typeof item === 'string') {
          for (let an of annotatorService._annotateIteratively(item, subdict)) {
            newArr.push(an)
          }
        } else {
          newArr.push(item)
        }
      })
      return newArr
    } else {
      return [text]
    }
  }
}
