# Tunnes

> Share tunes with your friends

_Note:_ should be working, but features are still being added.

## Installation

```
make install
```

## Configuration

Copy `server/settings.js.example` into `server/settings.js`, add [Google API key](https://developers.google.com/youtube/v3/) and [SoundCloud API key](https://developers.soundcloud.com/), and configure and start mongodb.

## Build

```
make
```

## Run

```
make server
```

_Note:_ this will act as both an api server and a web server. You can use any webserver you want, just have it serve the `/dist` folder.

## Todo

- Custom, global player that controls state of widgets on the page
- Loading indicator
- Playlists
- Mobile
- Wrap soundcloud and youtube widget api's in shim
