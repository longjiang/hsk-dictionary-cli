importScripts('../vendor/papaparse/papaparse.min.js')
importScripts('../js/hsk-cedict.js')
importScripts('../js/annotator-service.js')

HSKCEDICT.load(() => {
  this.postMessage(['load', 'ready'])
  onmessage = function(e) {
    const method = e.data[0]
    const args = e.data[1]
    if (AnnotatorService[method]) {
      this.postMessage([method, AnnotatorService[method](...args)])
    } else if (HSKCEDICT[method]) {
      this.postMessage([method, HSKCEDICT[method](...args)])
    } else if (method === 'hskcedictMethods') {
      this.postMessage(['hskcedictMethods', Object.keys(HSKCEDICT)])
    }
  }
})
