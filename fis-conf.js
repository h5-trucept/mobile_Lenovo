fis.match('*.css', {
  useHash: false, //default is `true`
  optimizer: fis.plugin('clean-css', {
  })
});
fis.match('*.js', {
  useHash: false, // default is true
  optimizer: fis.plugin('uglify-js', {
  })
});