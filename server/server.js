var loopback = require('loopback');
var app = module.exports = loopback();

app.use(loopback.token({ model: app.models.accessToken }));

var boot = require('loopback-boot');

// request pre-processing middleware
app.use(loopback.compress());


// -- Add your pre-processing middleware here --

// boot scripts mount components like REST API
boot(app, __dirname);

// -- Mount static files here--
// All static middleware should be registered at the end, as all requests
// passing the static middleware are hitting the file system
// Example:
var path = require('path');
app.use(loopback.static(path.resolve(__dirname, '../client')));
app.use(loopback.static(path.resolve(__dirname, '../common')));

// Requests that get this far won't be handled
// by any middleware. Convert them into a 404 error
// that will be handled later down the chain.
// app.use(loopback.urlNotFound());

// The ultimate error handler.
// app.use(loopback.errorHandler());

app.use(loopback.json());
app.use(loopback.urlencoded());

  app.get('/logged', function (req, res) {
    res.send(true);
  });

  // app.post('/login', function(req, res) {
  //   var email = req.body.email;
  //   var password = req.body.password;

  //   console.log(email, password);
  //   app.models.User.login({
  //     email: email,
  //     password: password
  //   }, 'user', function (err, token) {
  //     if (err) {
  //       console.error(err);
  //       res.send(err);
  //       return;
  //     }

  //     token = token.toJSON();
  //     console.log('TOKEN', token);
  //     res.send({
  //       username: token.user.username,
  //       accessToken: token.id
  //     });
  //   });
  // });

  // app.get('/logout', function(req, res) {
  //   var AccessToken = app.models.AccessToken;
  //   var token = new AccessToken({id: req.query.access_token});
  //   token.destroy();
  //   res.send(true);
  // });

app.index_file_path = path.resolve(__dirname, '../client/index.html');
app.get('*', function (req, res) { res.sendFile(app.index_file_path); });

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
