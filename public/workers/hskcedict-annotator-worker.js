importScripts('../vendor/papaparse/papaparse.min.js')
importScripts('../js/hsk-cedict.js')
importScripts('../js/annotator-service.js')

let ready = false

onmessage = function(e) {
  const id = e.data[0]
  const method = e.data[1]
  const args = e.data[2]
  if (AnnotatorService[method]) {
    this.postMessage([id, method, AnnotatorService[method](...args)])
  } else if (HSKCEDICT[method]) {
    this.postMessage([id, method, HSKCEDICT[method](...args)])
  } else if (method === 'hskcedictMethods') {
    this.postMessage([id, 'hskcedictMethods', Object.keys(HSKCEDICT)])
  }
}

HSKCEDICT.load().then(() => {
  ready = true
  this.postMessage([1, 'load', 'ready'])
})
