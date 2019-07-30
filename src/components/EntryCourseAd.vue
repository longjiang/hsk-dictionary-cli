<template>
  <div>
    <!-- ANCHOR img/anchors/learn-this.png -->
    <div
      class="container-fluid learn-this-bar"
      v-cloak
      v-if="entry.book !== 'outside'"
    >
      <div class="container">
        <div class="row">
          <div class="col-sm-12 text-center">
            <a
              :href="
                `https://courses.chinesezerotohero.com/p/hsk-${
                  entry.book
                }-course`
              "
            >
              <img
                :src="`img/courses/hsk${entry.book}.jpg`"
                class="course-cover"
              />
            </a>
            <br />
            Learn how to use “{{ entry.simplified }}” in
            <b>
              Lesson {{ entry.lesson }}
              <span v-if="entry.book < 5">, Text {{ entry.dialog }}</span>
            </b>
            of our
            <a
              href="https://courses.chinesezerotohero.com/"
              class="video-course"
              >HSK {{ entry.book }} Video Course</a
            >
          </div>
        </div>
      </div>
    </div>

    <!-- ANCHOR img/anchors/learn-this.png -->
    <div
      class="container-fluid learn-this-bar"
      v-cloak
      v-if="entry.book === 'outside'"
    >
      <div class="container">
        <div class="row">
          <div class="col-sm-12 text-center">
            <a href="https://chinesezerotohero.teachable.com/p/path-to-fluency">
              <img src="img/courses/fluency.jpg" class="course-cover" />
            </a>
            <br />Learn how to progress <em>beyond the HSK</em> toward fluency
            with our
            <a
              href="https://chinesezerotohero.teachable.com/p/path-to-fluency"
              class="video-course"
              >Path to Fluency Video Course</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['entry'],
  data() {
    return {}
  }
}
</script>
