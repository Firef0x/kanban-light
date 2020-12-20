/* eslint-disable global-require,import/no-dynamic-require */

const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const config = require('../../config/config');
const routes = require('./routes');

const app = express();
let compiler;

if (config.buildType !== 'production') {
  const webpack = require('webpack');
  const configType = 'dev';
  const wpConfig = require(`../../config/webpack.${configType}.js`);
  console.log(`Using webpack config: ${configType}`);

  compiler = webpack(wpConfig);
  console.log(`webpack: ${wpConfig.output.publicPath}`);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    quiet: false,
    publicPath: wpConfig.output.publicPath
  }))
    .use(require('webpack-hot-middleware')(compiler, {
      log: console.log,
      heartbeat: 10 * 1000
    }));
}

// Remove file size limit in Feathers
app.use(express.json({
  limit: '300mb'
}))
  .use(express.urlencoded({
    extended: true,
    limit: '300mb'
  }))
  .use(express.static(path.join(__dirname, '..', '..', 'public')));

// Remove X-Powered-By header
app.disable('x-powered-by');

// view engine setup
app.set('views', path.join(__dirname, '..', '..', 'views'));
app.set('view engine', 'hbs');

// Setting favicon
app.use(favicon(path.join(__dirname, '..', '..', 'public', 'favicon.ico')));

routes.init(app);

/* redirect to in-memory build of app
   i.e. proxy all routes to client
   must be initialized after routes and dev/hot middleware
 */
if (config.buildType !== 'production') {
  const configType = 'dev';
  const wpConfig = require(`../../config/webpack.${configType}.js`);
  app.use('*', (req, res, next) => {
    const filename = path.join(wpConfig.output.path, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    });
  });
}

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message || 'Error has occured',
    error: err
  });
});

module.exports = app;
