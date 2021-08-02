const withOptimizedImages = require('next-optimized-images');

module.exports = withOptimizedImages({
  distDir: 'next',
  experimental: {
    sprFlushToDisk: false
  }
});
