import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/browse',
      name: 'browse',
      redirect: '/explore/levels'
    },
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
      props: true,
      meta: {
        title: 'Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'Following a standardized curriculum (HSK) and a practice-centered approach (with language partners), our video courses bring real learning results that equip students in the real Chinese-speaking world.'
          }
        ]
      }
    },
    {
      path: '/music/:method?/:args?',
      name: 'music',
      component: () => import('./views/Music.vue'),
      props: true,
      meta: {
        title: 'Music | Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Learn Chinese through music.'
          }
        ]
      }
    },
    {
      path: '/pinyin-squared/:method?/:args?',
      name: 'pinyin-squared',
      component: () => import('./views/PinyinSquared.vue'),
      props: true,
      meta: {
        title: 'Pinyin² | Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'A new, experimental way of writing Chinese phonetics with character-like blocks.'
          }
        ]
      }
    },
    {
      path: '/contact-us',
      name: 'contact',
      component: () => import('./views/Contact.vue'),
      props: true,
      meta: {
        title: 'Contact Us | Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Get in touch with us.'
          }
        ]
      }
    },
    {
      path: '/about-hsk-online-course',
      name: 'courses',
      component: () => import('./views/Courses.vue'),
      props: true,
      meta: {
        title: 'Online Courses | Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'Achieve fluent communication and outstanding HSK results. Engaging, comprehensive and structured Chinese courses at all HSK levels. Learning is hard work, but it should never be boring, so we designed our courses to be concise yet fun and engaging.'
          }
        ]
      }
    },
    {
      path: '/video-count',
      name: 'video-count',
      component: () => import('./views/VideoCount.vue'),
      props: true,
      meta: {
        title: 'Video Count | Chinese Zero To Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'See the latest stats on how many videos are there in our courses.'
          }
        ]
      }
    },
    {
      path: '/pricing/:args?',
      name: 'pricing',
      component: () => import('./views/Pricing.vue'),
      props: true,
      meta: {
        title: 'Pricing | Chinese Zero To Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'No subscription required. Pay once, own the courses forever. Wallet Friendly Pricing.'
          }
        ]
      }
    },
    {
      path: '/course-release-schedule',
      name: 'course-release-schedule',
      component: () => import('./views/ReleaseSchedule.vue'),
      props: true,
      meta: {
        title: 'Course Release Schedule | Chinese Zero To Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'We regularly update our courses. Here’s what we are planning on this year.'
          }
        ]
      }
    },
    {
      path: '/textbooks-workbooks',
      name: 'textbooks-workbooks',
      component: () => import('./views/Textbooks.vue'),
      props: true,
      meta: {
        title:
          'HSK Standard Course Textbooks and Workbooks | Chinese Zero To Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'We regularly update our courses. Here’s what we are planning on this year.'
          }
        ]
      }
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('./views/FAQ.vue'),
      props: true,
      meta: {
        title: 'Frequently Asked Questions | Chinese Zero To Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'We often hear these questions. Hopefully this page can answer yours.'
          }
        ]
      }
    },
    {
      path: '/affiliate-program',
      name: 'affiliate-program',
      component: () => import('./views/Affiliate.vue'),
      props: true,
      meta: {
        title: 'Affiliate Program | Chinese Zero To Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Help us get the word out!'
          }
        ]
      }
    },
    {
      path: '/hall-of-heroes',
      name: 'hall-of-heroes',
      component: () => import('./views/HallOfHeroes.vue'),
      props: true,
      meta: {
        title: 'Hall of Heroes | Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'In this page we showcase some of our students who have successfully passed the HSK exams after taking courses from us! Read their testimonials and reviews.'
          }
        ]
      }
    },
    {
      path: '/view/:method?/:arg?',
      name: 'dictionary',
      component: () => import('./views/Dictionary.vue'),
      props: true,
      meta: {
        title: 'Dictionary | Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'A visual Chinese dictionary with collocations, example, web images, and character breakdown.'
          }
        ]
      }
    },
    {
      path: '/phrase/:method?/:args?',
      name: 'phrase',
      component: () => import('./views/Phrase.vue'),
      props: true,
      meta: {
        title: 'Phrase | Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'See how Chinese phrases are used in real context..'
          }
        ]
      }
    },
    {
      path: '/idioms/:method?/:args?',
      name: 'idioms',
      component: () => import('./views/Idioms.vue'),
      props: true,
      meta: {
        title: 'Idioms | Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Learn Chinese idioms (成语 chéngyǔ).'
          }
        ]
      }
    },
    {
      path: '/separable/:method?/:args?',
      name: 'separable',
      component: () => import('./views/Separable.vue'),
      props: true,
      meta: {
        title: 'Separable Words | Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Chinese verbs that are separable (离合词 líhécí).'
          }
        ]
      }
    },
    {
      path: '/grammar',
      name: 'grammar',
      component: () => import('./views/Grammar.vue'),
      meta: {
        title: 'Grammar Cheatsheet | Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'The succint and comprehensive grammar chart, following the HSK Standard Course textbook.'
          }
        ]
      }
    },
    {
      path: '/grammar/view/:id',
      name: 'grammar',
      props: true,
      component: () => import('./views/GrammarView.vue'),
      meta: {
        title: 'Grammar Note | Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Check out this grammar point.'
          }
        ]
      }
    },
    {
      path: '/explore/levels',
      name: 'levels',
      component: () => import('./views/Levels.vue'),
      meta: {
        title: 'HSK Words by Level | Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Learn Chinese words by HSK levels (HSK 1 to HSK 6).'
          }
        ]
      }
    },
    {
      path: '/compare/:method/:args',
      name: 'compare',
      component: () => import('./views/Compare.vue'),
      meta: {
        title: 'Compare | Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Compare two words and see how they are used differently.'
          }
        ]
      }
    },
    {
      path: '/reader/:method?/:arg?',
      name: 'reader',
      component: () => import('./views/Reader.vue'),
      meta: {
        title: 'Reader | Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'Read Chinese text with pinyin annotation and save new words for review.'
          }
        ]
      }
    },
    {
      path: '/book/:method?/:args?',
      name: 'book',
      component: () => import('./views/BookChapter.vue'),
      props: true,
      meta: {
        title: 'Book Chapter | Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'Read free, open Chinese books with pinyin annotation and save new words for review.'
          }
        ]
      }
    },
    {
      path: '/library/:method?/:args?',
      name: 'library',
      component: () => import('./views/Library.vue'),
      props: true,
      meta: {
        title: 'Library | Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'Read free, open Chinese books with pinyin annotation and save new words for review.'
          }
        ]
      }
    },
    {
      path: '/youtube/view/:args?',
      name: 'youtube-view',
      component: () => import('./views/YouTubeView.vue'),
      props: true,
      meta: {
        title: 'YouTube Reader | Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Watch Chinese YouTube videos and study the subtitles.'
          }
        ]
      }
    },
    {
      path: '/youtube/browse/:args?',
      name: 'youtube-browse',
      component: () => import('./views/YouTubeBrowse.vue'),
      props: true,
      meta: {
        title: 'Study YouTube Subtitles | Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Watch Chinese YouTube videos and study the subtitles.'
          }
        ]
      }
    },
    {
      path: '/youtube/channel/:args?',
      name: 'youtube-channel',
      component: () => import('./views/YouTubeChannel.vue'),
      props: true,
      meta: {
        title: 'Study YouTube Subtitles | Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Watch Chinese YouTube videos and study the subtitles.'
          }
        ]
      }
    },
    {
      path: '/youtube/playlist/:args?',
      name: 'youtube-playlist',
      component: () => import('./views/YouTubePlaylist.vue'),
      props: true,
      meta: {
        title: 'Study YouTube Subtitles | Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Watch Chinese YouTube videos and study the subtitles.'
          }
        ]
      }
    },
    {
      path: '/articles',
      name: 'articles',
      redirect: '/articles/wiki/list'
    },
    {
      path: '/articles/wiki/:method?/:args?',
      name: 'articles-wiki',
      component: () => import('./views/Articles.vue'),
      meta: {
        title: 'Chinese Learning Wiki Articles | Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'Read Wiki articles about Chinese grammar and Chinese language.'
          }
        ]
      }
    },
    {
      path: '/community',
      name: 'community',
      redirect: '/community/list'
    },
    {
      path: '/community/:method?/:args?',
      name: 'community-reddit',
      component: () => import('./views/Community.vue'),
      props: true,
      meta: {
        title: 'Community | Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Connect with various Chinese-learning communities.'
          }
        ]
      }
    },
    {
      path: '/resources/:method?/:args?',
      name: 'resources',
      component: () => import('./views/Resources.vue'),
      props: true,
      meta: {
        title: 'Resources | Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'User voted Chinese-learning resources.'
          }
        ]
      }
    },
    {
      path: '/articles/reddit/:method?/:args?',
      name: 'articles-reddit',
      component: () => import('./views/Reddit.vue'),
      props: true,
      meta: {
        title: 'Reddit Posts | Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Read Reddit posts related to Chinese language.'
          }
        ]
      }
    },
    {
      path: '/learn/:method?/:args?',
      name: 'learn',
      component: () => import('./views/Learn.vue'),
      meta: {
        title: 'Learn | Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Learn words interactively by seeing how they are used.'
          }
        ]
      }
    },
    {
      path: '/saved-words',
      name: 'saved-words',
      component: () => import('./views/SavedWords.vue'),
      meta: {
        title: 'Saved Words | Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Study, manage, import, export the words you saved.'
          }
        ]
      }
    },
    {
      path: '/explore',
      name: 'explore',
      redirect: '/explore/levels'
    },
    {
      path: '/explore/roots/:arg?',
      name: 'explore-roots',
      component: () => import('./views/Roots.vue'),
      meta: {
        title: 'Roots | Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'Learn some common word-building patterns. For example: ～子（桌子、屋子、个子……）'
          }
        ]
      }
    },
    {
      path: '/explore/related/:arg?',
      name: 'explore-related',
      component: () => import('./views/Related.vue'),
      meta: {
        title: 'Related Words | Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'For any given word, find words related ot it.'
          }
        ]
      }
    },
    {
      path: '/explore/topics',
      name: 'explore-topics',
      component: () => import('./views/Topics.vue'),
      meta: {
        title: 'Words by Topic | Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Explore new Chinese words by topics'
          }
        ]
      }
    },
    {
      path: '/pinyin-list',
      name: 'pinyin',
      component: () => import('./views/PinyinList.vue'),
      meta: {
        title: 'Pinyin List | Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'Get a list of pinyin transcriptions for the list of words you provide.'
          }
        ]
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./views/Settings.vue'),
      meta: {
        title: 'Settings | Chinese Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'Change preferences: turn pinyin on or off, use simplified or traditional characters'
          }
        ]
      }
    }
  ]
})
