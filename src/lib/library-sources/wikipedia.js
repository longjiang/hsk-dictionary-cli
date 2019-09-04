import Helper from '@/lib/helper'

export default {
  host: /.+\.wikipedia\.org/,
  name: 'Wikipedia',
  logo:
    'https://zh.wikipedia.org/static/images/project-logos/zhwiki-hans-2x.png',
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
    $bookHTML.find('.sisitem').remove()
    let chapters = []
    for (let a of $bookHTML.find('.mw-parser-output li a')) {
      chapters.push({
        title: $(a).text(),
        url: Helper.absoluteURL(url, decodeURIComponent($(a).attr('href')))
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
  async getBooklist(url) {
    let $html = await Helper.scrape2(url)
    $html
      .find('.mw-parser-output > p:first-child, #toc, .mw-editsection')
      .remove()
    let list = []
    for (let a of $html.find(
      '.mw-parser-output li a:first-of-type:not(.new)'
    )) {
      list.push({
        url: 'https://zh.wikisource.org' + $(a).attr('href'),
        title: $(a)
          .text()
          .trim()
      })
    }
    return list
  }
}
