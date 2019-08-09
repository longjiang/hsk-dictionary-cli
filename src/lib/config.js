// const dictionaryServer = 'http://hsk-server.local:8888/'
// const dictionaryServer = 'http://hsk-dictionary:8888/'
const dictionaryServer = 'https://www.chinesezerotohero.com/hsk-dictionary/'

export default {
  server: dictionaryServer,
  sketchEngineProxy: dictionaryServer + 'sketch-engine-proxy.php',
  proxy: dictionaryServer + 'proxy.php',
  scrape: dictionaryServer + 'scrape.php',
  listPhotos: dictionaryServer + 'list-photos.php',
  savePhoto: dictionaryServer + 'save-photo.php',
  imageUrl: dictionaryServer + 'img/words/',
  animatedSvgUrl: dictionaryServer + 'data/svgs/'
}
