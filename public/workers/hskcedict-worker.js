importScripts('../vendor/papaparse/papaparse.min.js')
importScripts('../js/hsk-cedict-service.js')

let ready = false

onmessage = function(e) {
  const id = e.data[0]
  const method = e.data[1]
  const args = e.data[2]
  if (method === 'hskcedictMethods') {
    this.postMessage([id, 'hskcedictMethods', Object.keys(HSKCEDICT)])
  } else {
    this.postMessage([id, method, HSKCEDICT[method](...args)])
  }
}

HSKCEDICT.load().then(() => {
  ready = true
  this.postMessage([1, 'load', 'ready'])
})
