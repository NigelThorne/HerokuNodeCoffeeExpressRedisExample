(function() {
  var RedisStore, app, express, uri;
  express = require('express');
  RedisStore = require('connect-redis')(express);
  uri = URI.parse(ENV["REDISTOGO_URL"]);
  app = express.createServer();
  app.use(express.static(__dirname + '/public'));
  app.use(express.cookieParser());
  app.use(express.session({
    secret: "Coffeebreak",
    store: new RedisStore({
      host: uri.host,
      port: uri.port,
      password: uri.password
    }),
    cookie: {
      maxAge: 60000
    }
  }));
  app.set('view engine', 'jade');
  app.get('/', function(request, response) {
    request.session.views++;
    return response.render('index', {
      title: request.session.views + ': Express with Coffee and sessions'
    });
  });
  app.listen(3000);
}).call(this);
