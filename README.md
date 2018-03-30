# react-music

# 配置stylus
安装
```bash
yarn add stylus stylus-loader
```
修改<code>webpack.config.dev.js</code>
```js
{
  test: /\.styl(us)?$/,
  use: [
    require.resolve('style-loader'), 
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
      }
    }, 
    {
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
        ident: 'postcss',
+       sourceMap: true,
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
          }),
        ],
      }
    },
+   require.resolve('stylus-loader')
  ]
}
```
这里要注意下<code>stylus-loader</code>要放在<code>postcss-loader</code>,否则在组件中引用<code>.styl(us)</code>无效,具体可查看官网说明。还要给postcss-loader的options加sourceMap，否则会出现警告
> postcss-loader: Use it after css-loader and style-loader, but before other preprocessor loaders like e.g sass|less|stylus-loader

修改<code>webpack.config.prod.js</code>
```js
{
  test: /\.styl(us)?$/,
  loader: ExtractTextPlugin.extract(
    Object.assign(
      {
        fallback: {
          loader: require.resolve('style-loader'),
          options: {
            hmr: false,
          },
        },
        use: [
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              minimize: true,
              sourceMap: shouldUseSourceMap,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
+             sourceMap: true,
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
+         require.resolve('stylus-loader')
        ],
      },
      extractTextPluginOptions
    )
  ),
  // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
},

```