import Helper from '@/lib/helper'

export default {
  worker: undefined,
  load() {
    return new Promise(resolve => {
      // worker ready
      this.worker = new Worker('./workers/hskcedict-worker.js')
      this.worker.addEventListener('message', e => {
        if (e.data[1] === 'load' && e.data[2] === 'ready') {
          this.worker.postMessage([1, 'hskcedictMethods'])
        }
        if (e.data[1] === 'hskcedictMethods') {
          let HSKCEDICT = this.makeHSKCEDICTAvailable(e.data[2])
          resolve(HSKCEDICT)
        }
      })
    })
  },
  makeHSKCEDICTAvailable(methods) {
    let HSKCEDICT = {}
    for (let method of methods) {
      HSKCEDICT[method] = (callback, args = undefined) => {
        let id = Helper.uniqueId()
        let m1 = e => {
          if (e.data[0] === id && e.data[1] === method) {
            callback(e.data[2])
            this.worker.removeEventListener('message', m1)
          }
        }
        if (args !== undefined) {
          this.worker.postMessage([id, method, args])
          this.worker.addEventListener('message', m1)
        } else {
          this.worker.postMessage([id, method, []])
          this.worker.addEventListener('message', m1)
        }
      }
    }
    return HSKCEDICT
  }
}
