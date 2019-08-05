import $ from 'jquery'

/* Responsible for actually annotating elements */
export default {
  worker: undefined,
  config: {
    dictUrl: '//www.mdbg.net/chindict/chindict.php?wdqb=',
    editUrl:
      '//cc-cedict.org/editor/editor.php?handler=InsertSimpleEntry&insertsimpleentry_old_cedict=',
    addUrl:
      '//cc-cedict.org/editor/editor.php?return=&popup=0&handler=InsertQueueEntry&insertqueueentry_diff=%2B+' // &#43; is the plus sign
  },
  load(callback) {
    // worker ready
    this.worker = new Worker('./workers/annotator-worker.js')
    this.worker.onmessage = e => {
      if (e.data[0] === 'load' && e.data[1] === 'ready') {
        window.Annotator = this
        callback()
      }
    }
  },
  wordBlockTemplate(textOrCandidates) {
    if (Array.isArray(textOrCandidates)) {
      let candidates = textOrCandidates
      let word = candidates[0]
      let book = candidates[0].book ? candidates[0].book : 'outside'
      try {
        return `<span class="word-block" data-candidates="${escape(
          JSON.stringify(candidates)
        )}" data-hover-hsk="${book}">
          <span class="word-block-pinyin">${word.pinyin}</span>
          <span class="word-block-simplified">${word.simplified}</span>
          <span class="word-block-traditional">${word.traditional}</span>
          <span class="word-block-definition">${word.definitions[0].text}</span>
        </span>`
      } catch {
        // catch errors
      }
    } else if (typeof textOrCandidates === 'string') {
      let text = textOrCandidates
      return `<span class="word-block"><span class="word-block-text">${text}</span></span>`
    }
  },

  replaceNodeWithHTML(oldNode, html) {
    $(oldNode).after(html + ' ')
    var newNode = oldNode.nextSibling
    $(oldNode).remove()
    return newNode
  },

  annotate(node) {
    let annotator = this
    if (node.nodeValue.replace(/\s/g, '').length > 0) {
      // Not just spaces!
      this.worker.postMessage(['annotate', [node.nodeValue]])
      this.worker.onmessage = function(event) {
        console.log(event.data)
        let [method, data] = event.data
        console.log(method, data)
        if (method === 'annotate') {
          var html = ''
          data.map(textOrCandidates => {
            html += annotator.wordBlockTemplate(textOrCandidates)
          })
          annotator.replaceNodeWithHTML(node, html)
        }
      }
    }
  },

  annotateIteratively(node, callback = function() {}) {
    if (node.nodeType === 3) {
      // textNode
      this.annotate(node)
    } else {
      let nodes = []
      for (let n of node.childNodes) {
        nodes.push(n)
      }
      for (let n of nodes) {
        this.annotateIteratively(n)
      }
    }
    callback()
  },

  annotateBySelector(selector, callback) {
    const annotator = this
    $(selector).each(function() {
      annotator.annotateIteratively(this)
    })
    callback()
  }
}
