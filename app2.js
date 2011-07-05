(function() {
  var RedisStore, app, express, red_hash, redis_url;
  express = require('express');
  RedisStore = require('connect-redis')(express);
  app = express.createServer();
  app.use(express.static(__dirname + '/public'));
  app.use(express.cookieParser());
  redis_url = process.env.REDISTOGO_URL;
  red_hash = {
    url: redis_url
  };
  express.logger('************* ' + redis_url);
  app.use(express.session({
    secret: "Coffeebreak",
    store: new RedisStore({
      url: redis_url
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
  app.listen(process.env.PORT || 3000);
}).call(this);
