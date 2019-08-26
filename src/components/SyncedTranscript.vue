<template>
  <div>
    <Annotate
      tag="div"
      :class="{
        lyrics: true,
        'mb-4': true,
        collapsed: collapse,
        matched: lrc.matchedLines && lrc.matchedLines.length > 0
      }"
      :id="'lyrics-' + lrcIndex"
      data-collapse-target
    >
      <div
        class="lyrics-title"
        v-html="lrc.artist + '《' + lrc.title + '》'"
      ></div>
      <hr />
      <div
        v-for="(line, lineIndex) in lrc.content.filter(
          line => !LRC.rejectLine(line.line)
        )"
        :key="lineIndex"
        :class="{
          'lyrics-line': true,
          matched: lrc.matchedLines && lrc.matchedLines.includes(lineIndex),
          'matched-context': LRC.inContext(lineIndex, 2, lrc),
          'lyrics-line-current':
            parseFloat(line.starttime) < currentTime &&
            currentTime <
              parseFloat(
                lrc.content[Math.min(lrc.content.length - 1, lineIndex + 1)]
                  .starttime
              )
        }"
        v-on:click="seekYouTube(line.starttime)"
        v-html="
          entry
            ? Helper.highlight(line.line, entry.simplified, entry.hsk)
            : line.line
        "
      ></div>
    </Annotate>
    <ShowMoreButton v-if="collapse" :data-bg-hsk="entry ? entry.hsk : 'outside'"
      >Show More</ShowMoreButton
    >
  </div>
</template>

<script>
export default {}
</script>

<style></style>
