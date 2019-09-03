import Helper from '@/lib/helper'

export default {
  sources: [
    {
      host: 'zh.wikisource.org',
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
        let $bookHTML = await Helper.scrape2(url.replace(/[^/]*$/, ''))
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
        chapter.book = book
        return chapter
      }
    }
  ],
  source(url) {
    const host = url.replace(/.*\/\/([^/]*).*/, '$1')
    const source = this.sources.find(source => source.host === host)
    return source
  },
  getBook(url) {
    return this.source(url).getBook(url)
  },
  getChapter(url) {
    return this.source(url).getChapter(url)
  },
  getBooklist(url) {
    return this.source(url).getBooklist(url)
  }
}
