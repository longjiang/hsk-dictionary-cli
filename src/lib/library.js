import Shucheng from '@/lib/library-sources/51shucheng'
import Wikisource from '@/lib/library-sources/wikisource'
import Wikipedia from '@/lib/library-sources/wikipedia'
import Luoxia from '@/lib/library-sources/luoxia'
import WOL from '@/lib/library-sources/wol'

export default {
  sources: [Shucheng, Wikisource, Luoxia, Wikipedia, WOL],
  source(url) {
    const host = url.replace(/.*\/\/([^/]*).*/, '$1')
    const source = this.sources.find(source => host.match(source.host))
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
