<template>
  <div>
    <div class="row">
    <div class="col-sm-6 col-md-4 mb-5" v-for="hero in heroes" >
      <Hero :hero="hero" />
    </div>

    </div>
  </div>
</template>

<script>
import Config from '@/lib/config'
import Hero from '@/components/Hero'

export default {
  components: {
    Hero
  },
  props: {
    category: {
      type: String
    }
  },
  data() {
    return {
      heroes: []
    }
  },
  mounted() {
    this.get()
  },
  methods: {
    get() {
      $.getJSON(`${Config.wiki}items/heroes?fields=*,avatar.*`, response => {
        this.heroes = response.data.map(hero => {
          hero.url = `#/hall-of-heroes/view/${hero.id},${encodeURIComponent(
            hero.name
          )}`
          return hero
        })
      })
    }
  }
}
</script>

<style></style>
