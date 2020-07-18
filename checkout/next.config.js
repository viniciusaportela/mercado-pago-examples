const withImage = require('next-images');
const withCSS = require('@zeit/next-css');

module.exports = withCSS(withImage({
  webpack: (config, { isServer }) => {

    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  }
}));