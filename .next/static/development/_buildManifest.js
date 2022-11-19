self.__BUILD_MANIFEST = {
  __rewrites: { beforeFiles: [], afterFiles: [], fallback: [] },
  '/_error': ['static\u002Fchunks\u002Fpages\u002F_error.js'],
  '/block/[hash]': ['static\u002Fchunks\u002Fpages\u002Fblock\u002F[hash].js'],
  sortedPages: ['\u002F_app', '\u002F_error', '\u002Fblock\u002F[hash]'],
};
self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB();
