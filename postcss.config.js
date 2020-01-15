const path = require('path');

const { DIST_DIR } = require('./config/filepath');

module.exports = ({ env }) => {
  const isProd = env === 'production';

  return {
    plugins: {
      'postcss-preset-env': {
        stage: 4,
      },
      'postcss-import': {},
      'postcss-hash': {
        algorithm: 'sha256',
        trim: 20,
        name: ({ dir, name, hash, ext }) => {
          return path.join(dir, isProd ? `${hash}.${name}${ext}` : `${name}${ext}`);
        },
        manifest: path.resolve(DIST_DIR, 'manifest.css.json'),
      },
      cssnano: isProd ? {} : false,
    },
  };
};
