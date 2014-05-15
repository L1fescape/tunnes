var 

  // expressjs
  express = require('express'),
  app = express(),

  // http server
  http = require('http'),
  httpServer = http.createServer(app),

  // import routes
  songs = require('./routes/songs');


// configure the server
app.configure(function() {
  // static pages and content. app dir is in a parent level directory, so we need
  // to reference that
  var dir = __dirname.split("/");
  dir.pop();
  app.use(express.static(dir.join("/") + "/dist"));
  // used for reading post body variables
  app.use(express.bodyParser());
});


// options for all routes
app.options("*", function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, sessionID');
  res.end();
});


// routes
app.get('/songs', songs.findAll);
app.get('/songs/:id', songs.findById);
app.post('/songs', songs.addSong);




// run http server
httpServer.listen(4000);
console.log("Listening on port", 4000);
