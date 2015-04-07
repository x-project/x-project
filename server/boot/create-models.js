var db = {};
db.Author = require('../../data/author.json');
db.Post = require('../../data/post.json');
db.Tag = require('../../data/tag.json');

module.exports = function enableAuthentication(server) {

  Object.keys(db).forEach(function (model) {
    db[model].forEach(function (data) {
      server.models[model].create(data);
    });
  });

};
