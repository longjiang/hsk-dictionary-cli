import Helper from '@/lib/helper'

export default {
  sources: [
    {
      host: 'zh.wikisource.org',
      async getChapter(url) {
        let $chapterHTML = await Helper.scrape2(url)
        const bookURL =
          'https://zh.wikisource.org' +
          $chapterHTML
            .find(
              '#headerContainer > table:nth-child(2) table td b:first-of-type a'
            )
            .attr('href')
        let book = {
          title: $chapterHTML
            .find(
              '#headerContainer > table:nth-child(2) table td b:first-of-type a'
            )
            .text(),
          author: $chapterHTML
            .find('#headerContainer > table:first-child td:nth-child(3) a')
            .text(),
          thumbnail: '',
          chapters: []
        }
        $chapterHTML.find('.mw-editsection').remove()
        $chapterHTML.find('#headerContainer').remove()
        $chapterHTML.find('#toc').remove()
        let $bookHTML = await Helper.scrape2(bookURL)
        for (let li of $bookHTML.find(
          '.mw-parser-output ul:first-of-type li'
        )) {
          book.chapters.push({
            title: $(li).text(),
            url:
              'https://zh.wikisource.org' +
              $(li)
                .find('a')
                .attr('href')
          })
        }
        return {
          title: $chapterHTML
            .find('#firstHeading')
            .text()
            .trim(),
          content: $chapterHTML.find('.mw-parser-output').html(),
          book: book
        }
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
  getChapter(url) {
    const host = url.replace(/.*\/\/([^/]*).*/, '$1')
    const source = this.sources.find(source => source.host === host)
    return source.getChapter(url)
  }
}
