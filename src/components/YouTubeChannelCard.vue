<template>
  <a :href="`#/youtube/channel/${channel.id}`" class="link-unstyled text-center">
    <img :src="channel.avatar" class="channel-avatar mb-4" alt />
    <div class="channel-body">
      <h6><Annotate>{{ channel.title }}</Annotate></h6>
      <div v-if="channel.description">{{ channel.description }}</div>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    channel: {
      type: Object
    }
  }
}
</script>


<style>
.channel-body {
  flex: 1;
}
.channel-avatar {
  border-radius: 100%;
  height: 4rem;
  display: inline-block;
}
</style>