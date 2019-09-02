import Helper from '@/lib/helper'

export default {
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
