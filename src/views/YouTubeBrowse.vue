<template>
  <div class="youtube-browse container mt-5 mb-5 main">
    <div class="row">
      <div class="col-sm-12">
        <h1 class="mb-5 text-center">Study YouTube Subtitles</h1>
        <YouTubeNav class="mb-4" />
        <div class="jumbotron bg-light pt-4 pb-3 mt-3 mb-3">
          <h4>
            Study
            <em>any</em> YouTube video that has Chinese closed captions
          </h4>
          <hr />
          <ol>
            <li>
              Go to YouTube, search a Chinese word. For example
              <b>纪录片</b>.
            </li>
            <li>
              Click on
              <b>Filter</b>, and choose
              <b>Subtitls/CC.</b>
            </li>
            <li>
              Open a video that interests you. <br /><small
                ><b>Note:</b> Many have closed captions, but they are in
                <em>English.</em> You need to look for <em>Chinese</em> closed
                captions. These are hard to find. If you cannot find any, look
                in the suggested channels listed on this page.</small
              >
            </li>
            <li>
              Copy the video's URL, paste it into the box above, and press
              <b>Enter</b>
              or click
              <b>Study.</b>
            </li>
          </ol>
        </div>

        <h4 class="mt-5 mb-5">
          A collection of YouTube channels with subtitles
        </h4>
        <ul class="list-unstyled p-0">
          <li v-for="channel in channels" class="rounded shadow p-4 mb-4">
            <a
              :href="`${channel.url}`"
              class="link-unstyled channel"
              target="_blank"
            >
              <img :src="channel.avatar" class="channel-avatar" alt />
              <div class="channel-body">
                <h6>{{ channel.title }}</h6>
                <div>{{ channel.description }}</div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import YouTubeNav from '@/components/YouTubeNav'
export default {
  components: {
    YouTubeNav
  },
  data() {
    return {
      channels: [
        {
          url:
            'https://www.youtube.com/channel/UCKFB_rVEFEF3l-onQGvGx1A/videos',
          title: '一席',
          description: "It's like TED, but in China.",
          avatar:
            'https://yt3.ggpht.com/a/AGF-l78U7HhXeKuoOP7SPBlSGU57rheuHFjumzhODw=s288-c-k-c0xffffffff-no-rj-mo'
        },
        {
          url:
            'https://www.youtube.com/channel/UCYfJG6cGfW84FVLuy7semEg/videos',
          title: 'Guan Video观视频工作室',
          description:
            "Look for videos with 'CC', and make sure the subtitles are in Chinese.",
          avatar:
            'https://yt3.ggpht.com/a/AGF-l79IPiVAXo3qD2cie7JPJL6B_PJ1Di3NfBp95Q=s288-c-k-c0xffffffff-no-rj-mo'
        },
        {
          url: 'https://www.youtube.com/user/TEDxTaipei/videos',
          title: 'TEDxTaipei',
          description:
            "Look for videos with 'CC', and make sure the subtitles are in Chinese.",
          avatar:
            'https://yt3.ggpht.com/a/AGF-l7-7ljVO1FOH9LVcmmT9tI2tA6SeCNoONsU94A=s176-c-k-c0xffffffff-no-rj-mo'
        },
        {
          url:
            'https://www.youtube.com/channel/UC24Dmp_2aHn_XKOBrR21DGA/videos',
          title: 'Learn Chinese Slowly',
          description: '快乐汉语 (Happy Chinese) with subtitles.',
          avatar:
            'https://yt3.ggpht.com/a/AGF-l7-2aMAAukOnWKuaEtBR4Aiou2AyxbE8bn8GVA=s288-c-k-c0xffffffff-no-rj-mo'
        }
      ]
    }
  }
}
</script>

<style>
.channel {
  display: flex;
  align-items: center;
  overflow: hidden;
}
.channel-body {
  flex: 1;
}
.channel-avatar {
  border-radius: 100%;
  height: 4rem;
  float: left;
  margin-right: 1rem;
}
</style>
