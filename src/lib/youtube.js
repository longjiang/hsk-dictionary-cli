import $ from 'jquery'

// eslint-disable-next-line no-unused-vars
var onYouTubePlayerAPIReady = function() {
  // This needs to be in global scope as YouTube api will call it
  // This function is overwridden from the app.loadYouTubeiFrame() function
}

// eslint-disable-next-line no-unused-vars
var onPlayerReady = function(evt) {
  // Required by YouTube API
}

export default {
  removeYouTubeAPIVars: function() {
    if (window['YT']) {
      let vars = [
        'YT',
        'YTConfig',
        'onYTReady',
        'yt',
        'ytDomDomGetNextId',
        'ytEventsEventsListeners',
        'ytEventsEventsCounter'
      ]
      vars.forEach(function(key) {
        window[key] = undefined
      })
    }
  },

  loadYouTubeiFrame: function(youtube, starttime, elementId, lrc) {
    var player
    // $('.youtube iframe').remove();
    this.removeYouTubeAPIVars()
    window.onYouTubePlayerAPIReady = function() {
      // eslint-disable-next-line no-undef
      player = new YT.Player(elementId, {
        height: '390',
        width: '640',
        videoId: youtube,
        playerVars: {
          start: parseInt(starttime),
          autoplay: 1,
          controls: 1,
          showinfo: 0,
          playsinline: 1,
          rel: 0
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: function(playerStatus) {
            if (playerStatus == 1) {
              // Playing, update time
              lrc.timer.setCurrentTime(lrc, player.getCurrentTime())
              lrc.timer.play()
            }
            if (playerStatus == 2) {
              // Playing, update time
              lrc.timer.setCurrentTime(lrc, player.getCurrentTime())
              lrc.timer.pauase()
            }
          }
        }
      })
      lrc.youtubePlayer = player
    }
    $.getScript('//www.youtube.com/iframe_api')
  },

  seekYouTube: function(lrc, starttime) {
    var player = lrc.youtubePlayer
    player.seekTo(starttime)
  },

  cycleYouTube(lrc, index) {
    var $versions = $('#lrc-' + index + '-youtube')
    $versions.find('.youtube:first-child').appendTo($versions)
    lrc.currentYoutubeIndex += 1
    if (lrc.currentYoutubeIndex > lrc.youtube.length) {
      lrc.currentYoutubeIndex = lrc.currentYoutubeIndex - lrc.youtube.length
    }
    var $youtube = $versions.find('.youtube:first-child .youtube-screen')
    $youtube.click() // Load the iframe
  }
}
