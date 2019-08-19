<template>
  <div class="container mb-5">
    <div class="row">
      <div class="col-sm-12">
        <h1 class="text-center mt-5 mb-5">Hall of Heroes</h1>
        <p class="lead">
          Every “hero” was a “zero” at some point.
        </p>
        <p>
          With hard work and continuous effort learning the Mandarin language,
          many have improved tremendously. In this page we showcase some of our
          students that have successfully passed the HSK exams after taking
          courses from us!
        </p>
        <HeroesList category="featured" />
      </div>
    </div>
  </div>
</template>

<script>
import HeroesList from '@/components/HeroesList'

export default {
  components: {
    HeroesList
  }
}
</script>

<style></style>
