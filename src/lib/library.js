import ShuchengNet from '@/lib/library-sources/51shucheng-net'
import ShuchengCom from '@/lib/library-sources/51shucheng-com'
import Wikisource from '@/lib/library-sources/wikisource'
import Luoxia from '@/lib/library-sources/luoxia'
import WOL from '@/lib/library-sources/wol'

export default {
  sources: [ShuchengNet, ShuchengCom, Wikisource, Luoxia, WOL],
  source(url) {
    const host = url.replace(/.*\/\/([^/]*).*/, '$1')
    const source = this.sources.find(source => source.host === host)
    return source
  },
  getBook(url) {
    return this.source(url) ? this.source(url).getBook(url) : false
  },
  getChapter(url) {
    return this.source(url) ? this.source(url).getChapter(url) : false
  },
  getBooklist(url) {
    return this.source(url) ? this.source(url).getBooklist(url) : false
  }
}
