// const dictionaryServer = 'http://hsk-server.local:8888/'
const dictionaryServer = 'https://server.chinesezerotohero.com/'

const lrcServer = 'https://lyrics-search.chinesezerotohero.com/'

export default {
  server: dictionaryServer,
  sketchEngineProxy: dictionaryServer + 'sketch-engine-proxy.php',
  proxy: dictionaryServer + 'proxy.php',
  scrape: dictionaryServer + 'scrape.php',
  imageProxy: dictionaryServer + 'image.php',
  listPhotos: dictionaryServer + 'list-photos.php',
  savePhoto: dictionaryServer + 'save-photo.php',
  imageUrl: dictionaryServer + 'img/words/',
  animatedSvgUrl: dictionaryServer + 'data/svgs/',
  lrcSearch: lrcServer + 'lrc/search/',
  wiki: 'https://directus.chinesezerotohero.com/_/'
}
