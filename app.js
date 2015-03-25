var push = require( 'pushover-notifications' );
var request = require('request');
var CronJob = require('cron').CronJob;

var lastfmEventID = process.env['LASTFM_EVENTID'];
var lastfmApiKey = process.env['LASTFM_API'];
var storedShouts;

var p = new push( {
    user: process.env['PUSHOVER_USER'],
    token: process.env['PUSHOVER_TOKEN'],
});

var msg = {
    message: "There's a new shout on Last.fm!",
    title: "Hellfest Notifier",
    sound: "magic",
    priority: 1
};

function debug(message) {
    if(process.env['NODE_ENV'] == "debug") {
        console.log(message);
    }
}

new CronJob('0 20 * * *', function(){
    request('http://ws.audioscrobbler.com/2.0/?method=event.getshouts&event=' + lastfmEventID + '&api_key=' + lastfmApiKey + '&format=json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var numberOfShouts = JSON.parse(body);

            // Store JSON object if we run this for the first time        
            if(typeof storedShouts == "undefined") {
                storedShouts = JSON.parse(body);
                debug("Storing JSON on first run");
            }

            if(numberOfShouts.shouts['@attr'].total == storedShouts.shouts['@attr'].total) {
                debug("No changes. [" + numberOfShouts.shouts['@attr'].total + "]");
            } else {
                debug("Total number of shouts changed: " + storedShouts.shouts['@attr'].total + " -> " + numberOfShouts.shouts['@attr'].total);
                p.send( msg, function( err, result ) {
                    if ( err ) {
                        throw err;
                    }
                    debug( result );
                });
            }
        }
    })
}, null, true, "Europe/Vienna");
