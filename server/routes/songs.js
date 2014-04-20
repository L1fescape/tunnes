var mongo = require('mongodb');
var request = require('request');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('jamdb', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'jamdb' database");
        db.collection('songs', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'songs' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});
 
exports.findById = function(req, res) {
    var id = req.params.id;
    db.collection('songs', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
 
exports.findAll = function(req, res) {
    db.collection('songs', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
 
exports.addSong = function(req, res) {
    var url = req.body.url;
    console.log(url);
    request("http://api.soundcloud.com/resolve.json?url=" + url + "&client_id=4d52f45b238ab32eb0078fff53ba2d92", function (error, response, body) {
      if (!error) {
        body = JSON.parse(body);
        console.log(body);
        var song = {
          songid : body.id,
          songurl : url,
          name : body.title,
          genre : body.genre,
          embed : "<iframe width=\"100%\" height=\"450\" scrolling=\"no\" frameborder=\"no\" src=\"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + body.id + "&amp;auto_play=false&amp;hide_related=false&amp;visual=true\"></iframe>"
        }; 
        console.log(song)
        db.collection('songs', function(err, collection) {
            collection.insert(song, {safe:true}, function(err, result) {
                if (err) {
                    res.send({'error':'An error has occurred'});
                } else {
                    res.send(result[0]);
                }
            });
        });
      }
    });
    /*
   */
}


var populateDB = function() {
 
    var songs = [
    {
        name: "Old un-aired Mix For Gilles Peterson's show",
        artist: "FaltyDL",
        genre: "Relax",
        url: "https://soundcloud.com/faltydl/old-unused-mix-for-gilles",
        embed: '<iframe width="100%" height="450" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/141891868&amp;auto_play=false&amp;hide_related=false&amp;visual=true"></iframe>'
    }];
 
    db.collection('songs', function(err, collection) {
        collection.insert(songs, {safe:true}, function(err, result) {});
    });
 
};
