var db = require('../db'),
  request = require('request'),
  url = require('url'),
  settings = require('../settings');
 
exports.findById = function(req, res) {
    var id = req.params.id;
    db.collection(settings.mongo.coll, function(err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
 
exports.findAll = function(req, res) {
    db.collection(settings.mongo.coll, function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.findByGenre = function(req, res) {
    var genre = req.params.genre;
    if (!genre){
      res.send({'error': 'Please provide a genre'}, 400);
      return;
    }
    genre = new RegExp(["^", genre, "$"].join(""),"i");
    db.collection(settings.mongo.coll, function(err, collection) {
        collection.find({'genre': genre}).toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.findAllGenres = function(req, res) {
    db.collection(settings.mongo.coll, function(err, collection) {
        collection.distinct('genre', function(err, items) {
            res.send(items);
        });
    });
};
 
exports.addSong = function(req, res) {
    var songurl = req.body.songurl;
    console.log(songurl);
    if (!songurl){
      res.send({'error': 'Please provide a url'}, 400);
      return;
    }
    if (songurl.indexOf('soundcloud') > -1){
      addSong_soundcloud(req, res, songurl);
    }
    else if (songurl.indexOf('youtube') > -1 || songurl.indexOf('youtu.be') > -1){
      addSong_youtube(req, res, songurl);
    }
    else {
      res.send({'error': 'Site not supported'}, 400);
    }
};


function addSong_soundcloud(req, res, url){
    var clientId = settings.soundcloud.client_id;
    request('http://api.soundcloud.com/resolve.json?url=' + url + '&client_id=' + clientId, function (error, response, body) {
      if (!error) {
        body = JSON.parse(body);
        console.log(body);
        var song = {
          songid : body.id,
          songurl : body.permalink_url,
          image : body.artwork_url,
          name : body.title,
          genre : body.genre,
          timestamp : new Date().getTime(),
          site : 'soundcloud'
        }; 
        console.log(song)
        db.collection(settings.mongo.coll, function(err, collection) {
            collection.insert(song, {safe:true}, function(err, result) {
                if (err) {
                    res.send({'error':'An error has occurred'});
                } else {
                    res.send(result[0]);
                }
            });
        });
      }
      else{
        console.log(error);
      }
    });
}

function addSong_youtube(req, res, songurl){
    var apiKey = settings.google.api_key,
      parsedUrl = url.parse(songurl, true),
      songid;

    if (!parsedUrl && !parsedUrl.host){
      res.send({'error':'There was an error parsing the YouTube url'});
      return;
    }
    
    switch (parsedUrl.host){
      case 'www.youtube.com':
      case 'youtube.com':
        songid = parsedUrl.query && parsedUrl.query.v ? parsedUrl.query.v : null;
        break;
      case 'youtu.be':
      case 'www.youtu.be':
        songid = parsedUrl.pathname.substr(1);
        break;
    }

    if (!songid){
      res.send({'error':'There was an error parsing the YouTube url'});
      return;
    }

    var requestUrl = "https://www.googleapis.com/youtube/v3/videos?id=" + songid + "&key=" + apiKey + "&part=snippet,statistics"
    request(requestUrl, function (error, response, body) {
      body = JSON.parse(body);
      var video = body.items && body.items.length ? body.items[0] : null;
      if (!error && video) {
        console.log(video);
        var song = {
          songid : video.id,
          songurl : "http://youtu.be/" + video.id,
          name : video.snippet.title,
          genre : null,
          image : video.snippet.thumbnails.high.url,
          timestamp : new Date().getTime(),
          site : 'youtube'
        }; 
        db.collection(settings.mongo.coll, function(err, collection) {
            collection.insert(song, {safe:true}, function(err, result) {
                if (err) {
                    res.send({'error':'An error has occurred'});
                } else {
                    res.send(result[0]);
                }
            });
        });
      }
      else{
        console.log(error);
      }
    });
}
