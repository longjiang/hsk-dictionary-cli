import Helper from '@/lib/helper'

export default {
  sources: [
    {
      host: 'zh.wikisource.org',
      name: 'Wikisource',
      async getBook(url) {
        let $bookHTML = await Helper.scrape2(url)
        $bookHTML.find('.sisitem').remove()
        let chapters = []
        for (let li of $bookHTML.find(
          '.mw-parser-output ul:first-of-type li'
        )) {
          chapters.push({
            title: $(li).text(),
            url:
              'https://zh.wikisource.org' +
              $(li)
                .find('a')
                .attr('href')
          })
        }
        let as = $bookHTML.find(
          '#headerContainer > table:first-child td:nth-child(3) a'
        )
        return {
          url: url,
          title: $bookHTML.find('#firstHeading').text(),
          author: $(as[as.length - 1]).text(),
          thumbnail: '',
          chapters
        }
      },
      async getChapter(url) {
        let $chapterHTML = await Helper.scrape2(url)
        let as = $chapterHTML.find(
          '#headerContainer > table:first-child td:nth-child(3) a'
        )
        let book = {
          title: $chapterHTML.find('.subpages a').text(),
          author: $(as[as.length - 1]).text(),
          thumbnail: '',
          chapters: []
        }
        $chapterHTML.find('.mw-editsection').remove()
        $chapterHTML.find('#headerContainer').remove()
        $chapterHTML.find('#toc').remove()
        const bookPath = $chapterHTML.find('.subpages a').attr('href')
        if (bookPath) {
          const bookURL = 'https://zh.wikisource.org' + bookPath
          book = await this.getBook(bookURL)
          book.url = bookURL
        }
        return {
          title: $chapterHTML
            .find('#firstHeading')
            .text()
            .trim(),
          content: $chapterHTML.find('.mw-parser-output').html(),
          book: book
        }
      },
      async getBooklist(url) {
        let $html = await Helper.scrape2(url)
        $html.find('#toc, .mw-editsection').remove()
        let list = []
        for (let a of $html.find('.mw-parser-output a')) {
          list.push({
            url: 'https://zh.wikisource.org' + $(a).attr('href'),
            title: $(a)
              .text()
              .trim()
          })
        }
        return list
      }
    },
    {
      host: 'www.luoxia.com',
      name: 'Luoxia 落霞小说',
      async getBook(url) {
        let $bookHTML = await Helper.scrape2(url)
        let book = {
          title: $bookHTML
            .find('.book-describe h1')
            .text()
            .trim(),
          author: $bookHTML
            .find('.book-describe h1 + p')
            .text()
            .trim()
            .replace('作者：', ''),
          thumbnail: $bookHTML.find('.book-img img').attr('src'),
          chapters: []
        }
        for (let a of $bookHTML.find('.book-list a')) {
          book.chapters.push({
            title: $(a).attr('title'),
            url: $(a).attr('href')
          })
        }
        return book
      },
      async getChapter(url) {
        let $chapterHTML = await Helper.scrape2(url)
        let chapter = {
          title: $chapterHTML
            .find('#nr_title')
            .text()
            .trim(),
          content: $chapterHTML.find('#nr1').html()
        }
        this.chapters = []
        let bookURL = url.replace(/[^/]*$/, '')
        chapter.book = await this.getBook(bookURL)
        return chapter
      },
      async getBooklist(url) {
        let $html = await Helper.scrape2(url)
        let list = []
        for (let li of $html.find('.pop-book2')) {
          list.push({
            url:
              $(li)
                .find('a')
                .attr('href'),
            title: $(li)
              .find('a')
              .attr('title'),
            thumbnail: $(li)
              .find('img')
              .attr('src')
          })
        }
        return list
      }
    }
  ],
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
