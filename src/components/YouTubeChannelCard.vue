<template>
  <a :href="`#/youtube/channel/${channel.id}`" class="link-unstyled channel">
    <img :src="channel.avatar" class="channel-avatar" alt />
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
.channel {
  display: flex;
  align-items: top;
  overflow: hidden;
}
.channel-body {
  flex: 1;
  display: flex;
  align-items: center;
}
.channel-avatar {
  border-radius: 100%;
  height: 4rem;
  float: left;
  margin-right: 1rem;
}
</style>