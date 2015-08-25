var path = require('path');
var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.use(loopback.favicon());
app.use(loopback.compress());

boot(app, __dirname);

app.use(loopback.static(path.resolve(__dirname, '../client')));

var index_path = path.resolve(__dirname, '../client/index.html');
app.get('*', function (req, res) { res.sendFile(index_path); });

app.start = function() {
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

if (require.main === module) {
  app.start();
}
