importScripts('../vendor/papaparse/papaparse.min.js')
importScripts('../js/hsk-cedict.js')
importScripts('../js/annotator-service.js')

let ready = false

onmessage = function(e) {
  const id = e.data[0]
  const method = e.data[1]
  const args = e.data[2]
  this.postMessage([id, method, AnnotatorService[method](...args)])
}

HSKCEDICT.load().then(() => {
  ready = true
  this.postMessage([1, 'load', 'ready'])
})
