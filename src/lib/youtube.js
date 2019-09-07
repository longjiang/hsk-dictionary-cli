import Config from '@/lib/config'
import Helper from '@/lib/helper'

export default {
  limit: location.hash.replace('#', ''), // #perpage/page
  getLrcsWithoutYouTube(youtubeVue) {
    let url = Config.lrcServer + 'lrc/listnoyoutube/'
    if (this.limit) {
      url = url + this.limit
    }
    $.getJSON(url, function(result) {
      youtubeVue.lrcs = result
    })
  },
  thumbnail(id) {
    return `//img.youtube.com/vi/${id}/hqdefault.jpg`
  },
  searchYouTubeByProxy(searchTerm, callback) {
    $.ajax(
      Config.lrcServer +
        'proxy.php?' +
        'https://www.youtube.com/results?search_query=' +
        searchTerm.replace(/ /g, '+')
    ).done(function(response) {
      var videoIds = []
      // We use 'ownerDocument' so we don't load the images and scripts!
      // https://stackoverflow.com/questions/15113910/jquery-parse-html-without-loading-images
      var ownerDocument = document.implementation.createHTMLDocument('virtual')
      let $html = $(response, ownerDocument)
      $html.find('.item-section li .yt-uix-tile-link').each(function() {
        if (
          !$(this)
            .attr('href')
            .includes('/channel/') &&
          !$(this)
            .attr('href')
            .includes('/user/')
        ) {
          videoIds.push(
            $(this)
              .attr('href')
              .replace('/watch?v=', '')
              .replace(/&list=.*/, '')
          )
        }
      })
      callback(videoIds)
    })
  },
  search(text, callback, subs = false, cacheLife = -1) {
    let subsQueryVar = subs ? '&sp=EgIoAQ%253D%253D' : ''
    Helper.scrape2(
      `https://www.youtube.com/results?search_query=${text.replace(
        / /g,
        '+'
      )}${subsQueryVar}`,
      cacheLife
    ).then($html => {
      let videos = []
      for (let item of $html.find('.yt-lockup-content')) {
        if (
          !$(item)
            .find('.yt-uix-sessionlink')
            .attr('href')
            .includes('/channel/') &&
          !$(item)
            .find('.yt-uix-sessionlink')
            .attr('href')
            .includes('/user/')
        ) {
          let badge = $(item).find('.yt-badge')[0]
          let id = $(item)
            .find('.yt-uix-sessionlink')
            .attr('href')
            .replace('/watch?v=', '')
          let youtube = {
            id: id,
            cc: false,
            title: $(item)
              .find('.yt-uix-sessionlink')
              .attr('title'),
            thumbnail: this.thumbnail(id),
            url: 'https://www.youtube.com/watch?v=' + id
          }
          if (badge && badge.innerText === 'CC') {
            youtube.cc = true
          }
          videos.push(youtube)
        }
      }
      callback(videos)
    })
  },
  playlist(playlistID, callback, cacheLife = -1) {
    Helper.scrape2(
      `https://www.youtube.com/playlist?list=${playlistID}`,
      cacheLife
    ).then($html => {
      let playlist = {
        id: playlistID,
        title: $html
          .find('.pl-header-title')
          .text()
          .trim(),
        videos: []
      }
      for (let item of $html.find('.pl-video.yt-uix-tile')) {
        // console.log(script)
        let id = $(item).attr('data-video-id')
        let video = {
          title: $(item).attr('data-title'),
          id: id,
          thumbnail: this.thumbnail(id)
        }
        playlist.videos.push(video)
      }
      callback(playlist)
    })
  },
  channel(channelID, callback, cacheLife = -1) {
    // channelURL: https://www.youtube.com/user/TEDxTaipei https://www.youtube.com/channel/UCKFB_rVEFEF3l-onQGvGx1A
    Helper.scrape2(
      `https://www.youtube.com/channel/${channelID}/videos`,
      cacheLife
    ).then($html => {
      let channel = {
        id: channelID,
        title: $html.find('.branded-page-header-title-link').attr('title'),
        videos: []
      }
      for (let item of $html.find('.yt-lockup-content')) {
        let badge = $(item).find('.yt-badge')[0]
        let id = $(item)
          .find('.yt-uix-sessionlink')
          .attr('href')
          .replace('/watch?v=', '')
        let youtube = {
          id: id,
          cc: false,
          title: $(item)
            .find('.yt-uix-sessionlink')
            .attr('title'),
          thumbnail: this.thumbnail(id),
          url: 'https://www.youtube.com/watch?v=' + id
        }
        if (badge && badge.innerText === 'CC') {
          youtube.cc = true
        }
        channel.videos.push(youtube)
      }
      callback(channel)
    })
  },
  mapChannelPlaylistsData(item) {
    return {
      id: item.id,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.standard.url,
      count: item.contentDetails.itemCount,
      data: item
    }
  },
  channelPlayListsByAPI(channelID, cacheLife = -1) {
    return new Promise(resolve => {
      $.getJSON(
        `https://server.chinesezerotohero.com/youtube-playlist.php?channel=${channelID}&cache_life=${cacheLife}`
      ).then(response => {
        let playlists = []
        if (response.data.items) {
          playlists = response.data.items.map(this.mapChannelPlaylistsData)
        }
        let nextPageToken = response.data.nextPageToken
        if (nextPageToken) {
          $.getJSON(
            `https://server.chinesezerotohero.com/youtube-playlist.php?channel=${channelID}&page_token=${nextPageToken}&cache_life=${cacheLife}`
          ).then(response => {
            if (response.data.items) {
              playlists = playlists.concat(
                response.data.items.map(this.mapChannelPlaylistsData)
              )
              resolve(playlists)
            }
          })
        } else {
          resolve(playlists)
        }
      })
    })
  },
  channelPlaylists(channelID, callback, cacheLife = -1) {
    // channelURL: https://www.youtube.com/user/TEDxTaipei https://www.youtube.com/channel/UCKFB_rVEFEF3l-onQGvGx1A
    Helper.scrape2(
      `https://www.youtube.com/channel/${channelID}/playlists`,
      cacheLife
    ).then($html => {
      let playlists = []
      for (let item of $html.find('.yt-shelf-grid-item')) {
        let playlist = {
          id: $(item)
            .find('.yt-uix-tile-link')
            .attr('href')
            .replace(/.*list=(.*)/, '$1'),
          title: $(item)
            .find('.yt-uix-tile-link')
            .text()
            .trim(),
          thumbnail:
            $(item)
              .find('[data-ytimg]')
              .attr('data-thumb') ||
            $(item)
              .find('[data-ytimg]')
              .attr('src'),
          count: $(item)
            .find('.formatted-video-count-label b')
            .text()
        }
        playlists.push(playlist)
      }
      callback(playlists)
    })
  }
}
