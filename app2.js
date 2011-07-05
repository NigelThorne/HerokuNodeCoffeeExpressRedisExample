(function() {
  var RedisStore, app, express, redis, redis_url, rtg;
  express = require('express');
  RedisStore = require('connect-redis')(express);
  rtg = require("url").parse(process.env.REDISTOGO_URL);
  redis = require("redis").createClient(rtg.port, rtg.hostname);
  redis.auth(rtg.auth.split(":")[1]);
  app = express.createServer();
  app.use(express.static(__dirname + '/public'));
  app.use(express.cookieParser());
  redis_url = process.env.REDISTOGO_URL;
  app.use(express.session({
    secret: "Coffeebreak",
    store: new RedisStore(redis),
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
