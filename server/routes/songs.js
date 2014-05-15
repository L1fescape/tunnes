var mongo = require('mongodb');
var request = require('request');
var settings = require('../settings');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server(settings.mongo.host, settings.mongo.port, {auto_reconnect: true});
db = new Db(settings.mongo.db, server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to", settings.mongo.db, "database");
        db.collection(settings.mongo.coll, {strict:true}, function(err, collection) {
            if (err) {
                console.log("The", settings.mongo.coll, "collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});
 
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
 
exports.addSong = function(req, res) {
    var url = req.body.songurl;
    console.log(url);
    if (!url){
      res.send({'error': 'Please provide a url'}, 400);
      return;
    }
    if (url.indexOf("soundcloud") > -1){
      addSong_soundcloud(req, res, url);
    }
    else {
      res.send({'error': 'Site not supported'}, 400);
    }
};


function addSong_soundcloud(req, res, url){
    var clientId = settings.soundcloud.client_id;
    request("http://api.soundcloud.com/resolve.json?url=" + url + "&client_id=" + clientId, function (error, response, body) {
      if (!error) {
        body = JSON.parse(body);
        var song = {
          songid : body.id,
          songurl : url,
          name : body.title,
          genre : body.genre,
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


var populateDB = function() {
 
    var songs = [
    {
        name: "Old un-aired Mix For Gilles Peterson's show",
        songid: 141891868,
        artist: "FaltyDL",
        genre: "Relax",
        url: "https://soundcloud.com/faltydl/old-unused-mix-for-gilles",
        site: "soundcloud"
    }];
 
    db.collection(settings.mongo.coll, function(err, collection) {
        collection.insert(songs, {safe:true}, function(err, result) {});
    });
 
};
