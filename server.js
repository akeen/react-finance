// const webpack = require('webpack')
// const WebpackDevServer = require('webpack-dev-server')
// const config = require('./webpack-dev-config')

// new WebpackDevServer(webpack(config), {
//   publicPath: config.output.publicPath,
//   hot: true,
//   historyApiFallback: true,
//   // It suppress error shown in console, so it has to be set to false.
//   quiet: false,
//   // It suppress everything except error, so it has to be set to false as well
//   // to see success build.
//   noInfo: false,
//   stats: {
//     // Config for minimal console.log mess.
//     assets: false,
//     colors: true,
//     version: false,
//     hash: false,
//     timings: false,
//     chunks: false,
//     chunkModules: false,
//   },
//   disableHostCheck: true,
// }).listen(8888, 'localhost', (err) => {
//   if (err) {
//     console.error(err)
//   }
//   console.info('Listening at localhost:8888')
// })

// HMR官方文档 https://webpack.js.org/guides/hot-module-replacement/#enabling-hmr

const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const config = require('./webpack-dev-config')

const port = 8868
// 接口api https://webpack.js.org/configuration/dev-server/
const options = {
  historyApiFallback: true,
  contentBase: './dist',
  host: 'localhost',
  port,
  hot: true,
  stats: 'errors-only',
}

WebpackDevServer.addDevServerEntrypoints(config, options)
const compiler = webpack(config)
const server = new WebpackDevServer(compiler, options)

server.listen(port, 'localhost', (err) => {
  if (err) { console.error(err); return }
  console.info(`dev server listening on port 127.0.0.1:${port}`)
})
