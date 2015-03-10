var app = document.getElementById('app');

app.logged;

var open = function (page_name, must_logged) {
  return function (context) {
    console.log(app.logged);
    if (must_logged && !app.logged) {
      page('/login');
      return;
    }
    var params = context.params;
    var property;
    var element = document.createElement(page_name);
    for (property in params) {
      if (isNaN(property)) {
        element.setAttribute(property, params[property]);
      }
    }
    context.element = element;
    while (app.firstChild) app.removeChild(app.firstChild);
    app.appendChild(element);
    element.must_logged = must_logged;
    scroll(0,0);
  };
};

var on_change = function (event) {
  var url = event.detail;
  page.show(url);
};

var on_logged = function (event) {
  var accessToken = event.detail;
  console.log(accessToken);
  app.accessToken = accessToken;
  app.logged = !!accessToken;
  localStorage.setItem('accessToken', accessToken);
};

app.addEventListener('click link', on_change);

app.addEventListener('logged', on_logged);

var start = function () {
  page('/', open('page-home', false));
  page('/login', open('page-login', false));
  page('/models', open('page-schema-list', true));
  page('/models/Users', open('page-users-list', true));
  page('/models/:model', open('page-instance-list', true));
  page('/create-user', open('page-user-edit', true));
  page('/item/:model/:Id', open('page-instance-edit', true));
  page('/item/:model', open('page-instance-edit', true));
  page('/blog', open('page-blog', false));
  page('/post/:Id', open('page-post', false));
  page();
  console.log('Welcome to X-PROJECT!');
};

var logout = function () {
  localStorage.removeItem('accessToken');
};

start();