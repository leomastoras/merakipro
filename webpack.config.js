const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    entry: './src/index.js',

    output: {
      path: path.resolve(__dirname, 'docs'),
      filename: isProd ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
      assetModuleFilename: 'assets/[name].[contenthash:8][ext]',
      clean: true,
      publicPath: '',
    },

    devtool: isProd ? false : 'eval-cheap-module-source-map',

    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          type: 'asset/resource',
          generator: { filename: 'img/[name].[hash:8][ext]' },
        },
        {
          test: /\.(woff2?|ttf|otf|eot)$/i,
          type: 'asset/resource',
          generator: { filename: 'css/[name].[hash:8][ext]' },
          /* loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[contenthash:8].[ext]',
              outputPath: '/css/assets/'
            }*/
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
        inject: 'body',
        minify: isProd && {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          minifyCSS: true,
          minifyJS: true,
        },
      }),

      // Make $/jQuery globally available without explicit imports
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),

      // Extract CSS into its own file in production
      ...(isProd
        ? [new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css',
          })]
        : []),

      // Copy static assets that webpack doesn't bundle
      new CopyPlugin({
        patterns: [
          { from: 'img', to: 'img', noErrorOnMissing: true },
          { from: 'manifest.webmanifest', to: 'manifest.webmanifest', noErrorOnMissing: true },
          { from: 'js/sw.js', to: 'js/sw.js', noErrorOnMissing: true },
        ],
      }),
    ],

    optimization: {
      minimize: isProd,
      minimizer: [
        new TerserPlugin({
          terserOptions: { format: { comments: false } },
          extractComments: false,
        }),
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
            priority: 10,
          },
        },
      },
    },

    devServer: {
      static: { directory: path.join(__dirname, 'docs') },
      port: 5173,
      hot: true,
      open: true,
      compress: true,
      historyApiFallback: true,
      client: { overlay: { errors: true, warnings: false } },
    },

    performance: {
      hints: isProd ? 'warning' : false,
      maxAssetSize: 512 * 1024,
      maxEntrypointSize: 600 * 1024,
    },
  };
};
