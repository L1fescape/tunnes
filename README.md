# Jamms

> Share tunes with your friends

Note: should be working, but features are still being added.

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
node server/web.js
```
