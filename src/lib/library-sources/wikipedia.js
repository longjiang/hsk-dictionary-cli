import Helper from '@/lib/helper'

export default {
  host: /.+\.wikipedia\.org/,
  name: 'Wikipedia',
  example: 'https://zh.wikipedia.org/wiki/%E7%86%B1%E5%B8%B6%E6%B0%A3%E6%97%8B',
  logo:
    'https://zh.wikipedia.org/static/images/project-logos/zhwiki-hans-2x.png',
  async getChapter(url) {
    let $chapterHTML = await Helper.scrape2(url)
    $chapterHTML.find('.mw-parser-output > table:first-of-type').remove()
    $chapterHTML.find('.mw-editsection').remove()
    $chapterHTML.find('#headerContainer').remove()
    $chapterHTML.find('#toc').remove()
    $chapterHTML
      .find('*')
      .contents()
      .each(function() {
        if (this.nodeType === Node.COMMENT_NODE) {
          $(this).remove()
        }
      })
    let langs = []
    for (let a of $chapterHTML.find('#p-lang li a')) {
      langs.push({
        title: `${$(a).attr('title')} (${$(a).text()})`,
        url: $(a).attr('href')
      })
    }
    let title = $chapterHTML
      .find('#firstHeading')
      .text()
      .trim()
    for (let a of $chapterHTML.find('.mw-parser-output a')) {
      $(a).attr(
        'href',
        Helper.absoluteURL(url, decodeURIComponent($(a).attr('href')))
      )
    }
    return {
      title: title,
      content: $chapterHTML.find('.mw-parser-output').html(),
      book: {
        title: title,
        chapters: langs
      }
    }
  },
  async getBook(url) {
    let $bookHTML = await Helper.scrape2(url)
    let chapters = []
    for (let a of $bookHTML.find('#mw-pages li a')) {
      chapters.push({
        title: $(a).attr('title'),
        url: Helper.absoluteURL(url, decodeURIComponent($(a).attr('href')))
      })
    }
    return {
      url: url,
      title: $bookHTML.find('#firstHeading').text(),
      chapters
    }
  },
  async getBooklist(url) {
    let $html = await Helper.scrape2(url)
    let list = []
    for (let a of $html.find('#mw-content-text a')) {
      list.push({
        url: 'https://zh.wikipedia.org' + $(a).attr('href'),
        title: $(a)
          .text()
          .trim()
      })
    }
    return list
  }
}
