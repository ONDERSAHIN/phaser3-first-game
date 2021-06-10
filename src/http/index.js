var cache = {}

function importAll (r) {
  r.keys().forEach(key => cache[key] = r(key))
}

export default {
  registerListeners () {
    importAll(require.context('./event/listeners/', false, /\.js$/))
  },
  registerStatusListeners () {
    importAll(require.context('./response/', false, /\.js$/))
    importAll(require.context('./response/status/listeners', false, /\.js$/))
    importAll(require.context('./response/status/app/errors', false, /\.js$/))
  },
}
