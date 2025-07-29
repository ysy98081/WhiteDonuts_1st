const path = require('path');

module.exports = {
  entry: {
    app: './js/video.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './js/video.js',
  },
};
