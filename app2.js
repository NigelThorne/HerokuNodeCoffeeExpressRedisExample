(function() {
  var RedisStore, app, express;
  express = require('express');
  RedisStore = require('connect-redis')(express);
  app = express.createServer();
  app.use(express.static(__dirname + '/public'));
  app.use(express.cookieParser());
  app.use(express.session({
    secret: "Coffeebreak",
    store: new RedisStore,
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
  console.log("Express22 server listening on port %d", app.address().port);
}).call(this);
