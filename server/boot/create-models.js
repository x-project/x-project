var db = {};
db.Employee = require('../../data/employee.json');
db.Person = require('../../data/person.json');
db.Poi = require('../../data/poi.json');
db.Post = require('../../data/post.json');
db.Person = require('../../data/person.json');
db.Project = require('../../data/project.json');

module.exports = function enableAuthentication(server) {

  Object.keys(db).forEach(function (model) {
    db[model].forEach(function (data) {
      server.models[model].create(data);
    });
  });

};
