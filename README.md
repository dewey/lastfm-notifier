# lastfm-notifier

Quick and dirty script to notify me if someone left a shout on a specific Last.fm event page. This could be useful if you are waiting for someone to sell their tickets.

# Usage

1. Clone directory

2. Run `npm install` to install the dependencies. 

3. Use `pm2` / `screen` / `nodeamon` or something similar to keep the script running in the background.


## Debug mode

If you want to run in `debug` mode:

`NODE_ENV=debug LASTFM_EVENTID=xxx LASTFM_API=xxx PUSHOVER_USER=xxx PUSHOVER_TOKEN=xxx node app.js`

otherwise just set `NODE_ENV` to `production`.

## Event ID

The `LASTFM_EVENTID` is the id from the event's permalink. For example:

`http://www.last.fm/festival/3902279+Hellfest+2015`, Event ID is `3902279`).

## Screenshot

<img src="https://img.notmyhostna.me/b5a24345774d5d6e7b09ebc076c69f5875a707e2.png" height=250px>