define(['jquery', 'events', 'utils/cookies'], function($, Events, Cookies) {
  var songs = [];

  var request = function(endpoint, type, dfd, data, isHttps) {
      var data = data || {},
        host = window.location.host,
        isHttps = isHttps || false,
        url = ((isHttps) ? "https://" : "http://") + host + "/" + endpoint,
        headers = {};

      $.ajax({
        url: url,
        headers: headers,
        type: type,
        data: data,
        dataType: 'json',
      })
      .done(function(data, textStatus, jqXHR) {
        if (textStatus === "success") {
          if (data){
            dfd.resolve(data);
          } else {
            console.log("Service Failure in " + url);

            dfd.reject({
              'data': data,
              'jqXHR': jqXHR,
              'textStatus': textStatus,
            });
          }
        }
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
        var errorObj = {}
        try {
          errorObj = JSON.parse(jqXHR.responseText);
        } catch (e) {
          console.warn('Server returned with unexpected results');
        }

        console.warn('errorObj', errorObj);
        dfd.reject(errorObj);
      });
    };

  return {
    getSongs: function() {
      var dfd = $.Deferred(),
        promise = dfd.promise();

      request('songs', 'GET', dfd);

      promise.done(function(data) {
        if (!data) {
          return false;
        }
        
        songs = data;

        Events.trigger('songs:get', data);
      });

      promise.fail(function(data) {
        Events.trigger('user:update:fail', data);
      });

      return promise;
    },
    addSong: function(url) {
      var dfd = $.Deferred(),
        promise = dfd.promise();

      var data = {
        url: url
      };

      request('songs', 'POST', dfd, data);

      promise.done(function(data) {
        if (!data) {
          return false;
        }

        Events.trigger('songs:add', data);
      });

      promise.fail(function(data) {
        Events.trigger('user:update:fail', data);
      });

      return promise;
    },
  };
});
