<template>
  <div>
    <div
      class="jumbotron-fluid p-5 bg-white mb-0"
      style="overflow: hidden; position: relative"
    >
      <div class="container">
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-sm-12 col-md-6">
            <YouTubeVideo
              youtube="5tCCX95G2vg"
              class="shadow"
              style="z-index: 2"
            />
          </div>
          <div class="col-md-3"></div>
        </div>
      </div>
      <img
        src="img/ken-standing.png"
        alt="Ken"
        class="photo-ken d-none d-md-block"
      />
      <img
        src="img/jon-sitting.png"
        alt="Jon"
        class="photo-jon d-none d-md-block"
      />
    </div>
    <div
      class="jumbotron-fluid bg-dark p-5 text-light mb-0 courses"
      style="position: relative"
    >
      <div class="container text-center" style="z-index: 2; position: relative;">
        <h3 class="mb-4">Online Chinese Courses at All Levels</h3>
        <p>
          We provide online Chinese courses at all levels, from
          <a href="http://chinesezerotohero.teachable.com" style="color: white; font-weight: bold;">HSK 1 to HSK 6</a>.
        </p>
        <p>
          If you don't know what HSK is, check this
          <a
            href="https://en.wikipedia.org/wiki/Hanyu_Shuiping_Kaoshi"
            target="_blank"
             style="color: white; font-weight: bold;"
            >Wikipedia article</a
          >.
        </p>
        <a
          href="https://chinesezerotohero.teachable.com/"
          class="btn btn-danger mt-3 mb-2"
          >Browse All Courses</a
        >
      </div>
      <img src="/img/ultimate-bundle.jpg" alt="" class="img-background" style="opacity: 0.2"/>
    </div>
    <div class="jumbotron-fluid mb-0 pb-0 pt-0">
      <div class="container">
        <h3 class="pb-5 pt-5 text-center">Get Our Latest Content</h3>
        <div class="row">
          <div class="col-md-6 col-lg-4 mb-5">
            <h5 class="mb-4 text-center">YouTube</h5>
            <a
              href="https://www.youtube.com/chinesezerotohero"
              class="text-center"
            >
              <span class="media">
                <img src="img/logo-zh-zth-circle.png" style="width: 4rem" />
                <div class="media-body">
                  youtube.com/<b>chinesezerotohero</b>
                </div>
              </span>
            </a>
            <p>
              We regularly post Chinese-learning videos to YouTube. We also
              provide frequent announcements regarding new course feature,
              promotional events, and such. In the comment area, you can also
              connect with other learners.
            </p>
            <p>
              Because we post a lot of content that is not found in our courses,
              we recommend that you follow us even if you've already bought all
              of our courses.
            </p>
          </div>
          <div class="col-md-6 col-lg-4 mb-5">
            <h5 class="mb-4 text-center">Reddit</h5>
            <a
              href="https://www.reddit.com/user/chinesezerotohero"
              class="text-center"
            >
              <span class="media">
                <img src="img/logo-zh-zth-circle.png" style="width: 4rem" />
                <div class="media-body">
                  reddit.com/u/<b>ChineseZeroToHero</b>
                </div>
              </span>
            </a>
            <p>
              Jon is
              <a href="https://www.reddit.com/user/chinesezerotohero"
                >u/ChineseZeroToHero</a
              >
              on Reddit. He regularly posts Chinese-learning resources and
              observations about Chinese language and grammar at
              r/ChineseLanguage.
            </p>
            <p>
              We encourage you to follow Jon at
              <a href="https://www.reddit.com/user/chinesezerotohero"
                >u/ChineseZeroToHero</a
              >, and also monitor
              <a href="https://www.reddit.com/r/ChineseLanguage/"
                >r/ChineseLanguage</a
              >
              for the latest Chinese-learning content from across the web.
            </p>
          </div>
          <div class="col-md-6 col-lg-4 mb-5">
            <h5 class="mb-4 text-center">Instagram</h5>
            <a
              href="https://www.instagram.com/chinesezerotohero/"
              class="text-center"
            >
              <span class="media">
                <img src="img/logo-zh-zth-circle.png" style="width: 4rem" />
                <div class="media-body">
                  instagram.com/<b>chinesezerotohero</b>
                </div>
              </span>
            </a>
            <p>
              We regularly post "word of the day" images and grammar poster
              images. Get your daily dose of Chinese by following our Instagram
              account.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import YouTubeVideo from '@/components/YouTubeVideo'
export default {
  components: {
    YouTubeVideo
  }
}
</script>

<style>
.photo-jon,
.photo-ken {
  position: absolute;
  bottom: 0;
}
.photo-jon {
  height: 70%;
  right: 0;
}
.photo-ken {
  height: 90%;
  left: 0;
}

.img-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
