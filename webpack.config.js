const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const { SRC_DIR, DIST_DIR, PUBLIC_DIR } = require('./config/filepath');

/** @type {(...args: any) => import('webpack').Configuration} */
const generateConfig = (_, { mode }) => {
  const isProd = mode === 'production';

  return {
    mode,
    entry: path.resolve(SRC_DIR, 'main.tsx'),
    output: {
      path: DIST_DIR,
      filename: isProd ? '[chunkhash].[name].js' : '[name].js',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: path.resolve(SRC_DIR, 'template.ejs'),
        cssManifest: isProd
          ? require(path.resolve(DIST_DIR, 'manifest.css.json'))
          : ['registry.css'].reduce((obj, name) => ({ ...obj, [name]: name }), {}),
      }),
      new CopyPlugin([{ from: PUBLIC_DIR, to: DIST_DIR }]),
    ],
    devServer: {
      host: '0.0.0.0',
      port: 8000,
      contentBase: [DIST_DIR, PUBLIC_DIR],
      hot: false,
      inline: false,
      historyApiFallback: true,
    },
  };
};

module.exports = generateConfig;
