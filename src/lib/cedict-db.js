//
// for (let row of data) {
//   this.objectStore.add(row)
// }

export default {
  dbName: 'czh_dictionary',
  tableName: 'cedict',
  db: undefined,
  objectStore: undefined,
  index: {
    simplified: undefined
  },
  init(callback) {
    this.prepEnv()
    this.prepDB(() => {
      callback()
    })
  },
  load(data, callback) {
    for (let row of data) {
      this.objectStore.add(row)
    }
    callback()
  },
  prepEnv() {
    try {
      //prefixes of implementation that we want to test
      window.indexedDB =
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB

      //prefixes of window.IDB objects
      window.IDBTransaction =
        window.IDBTransaction ||
        window.webkitIDBTransaction ||
        window.msIDBTransaction
      window.IDBKeyRange =
        window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

      if (!window.indexedDB) {
        window.alert(
          "Your browser doesn't support a stable version of IndexedDB."
        )
      }
    } catch (err) {
      console.log(err)
    }
  },
  prepDB(callback) {
    var request = window.indexedDB.open(this.dbName, 1)

    request.onerror = event => {
      //
    }

    request.onsuccess = event => {
      this.db = request.result
      this.objectStore = this.db
        .transaction([this.tableName], 'readwrite')
        .objectStore(this.tableName)
      this.index.simplified = this.objectStore.index('simplified')
      callback()
    }

    request.onupgradeneeded = event => {
      this.db = event.target.result
      this.objectStore = this.db.createObjectStore(this.tableName, {
        keyPath: 'identifier'
      })
      this.objectStore.createIndex('simplified', 'simplified')

      //callback()
    }
  },

  add(row) {
    var request = this.db
      .transaction([this.tableName], 'readwrite')
      .objectStore(this.tableName)
      .add(row)
    request.onsuccess = function(event) {
      // successful adding
    }

    request.onerror = function(event) {
      // errors
    }
  },

  delete(identifier) {
    var request = this.db
      .transaction([this.tableName], 'readwrite')
      .objectStore(this.tableName)
      .delete(identifier)

    request.onsuccess = function(event) {
      // success
    }
  }
}
