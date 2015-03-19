// (function () {

var app = document.getElementById('app');

var open = function (page_name) {
  return function (context) {
    var params = context.params;
    var property;
    var element = document.createElement(page_name);
    for (property in params) {
      if (isNaN(property)) {
        element.setAttribute(property, params[property]);
      }
    }
    context.element = element;
    console.log(element);
    while (app.firstChild) app.removeChild(app.firstChild);
    app.appendChild(element);
    scroll(0,0);
  };
};

var on_change = function (event) {
  var url = event.detail;
  page.show(url);
};

app.addEventListener('click link', on_change);

var start = function () {
  page('/', open('page-home'));

  page('/admin/login', open('page-login'));
  
  page('/admin/users', open('page-users'));

  page('/admin/users/create', open('page-user-edit'));
  
  page('/admin/users/:user_id', open('page-user'));
  
  page('/admin/collections', open('page-collections'));
  
  page('/admin/collections/:collection', open('page-collection'));
  
  page('/admin/collections/:collection/:model_id/edit', open('page-model-edit'));

  page('/blog', open('page-posts'));
  
  page('/blog/posts/:post_id', open('page-post'));
  
  page();
  
  console.log('Welcome to X-PROJECT!');
};

start();

// })();