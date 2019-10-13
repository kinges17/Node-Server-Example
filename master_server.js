'use strict';

require('dotenv').config();
var https = require('https');
var fs = require('fs');

// import logger and orcid api request handler
const logger = require('./logging/logger');
const orcid = require('./apis/orcid/orcidAPI');

// defining cert for https server
const certOptions = {
	key: fs.readFileSync('ssl/key.pem'),
	cert: fs.readFileSync('ssl/cert.pem')
};

// server configurations
const port = process.env.PORT;
// const hostname = os.hostname();
const hostname = process.env.HOST;
const serverLocation = `https://${hostname}:${port}`;

// starting server
const server = https.createServer(certOptions).listen(port, hostname, function() {
	console.log('Server is starting at ' + serverLocation + '...');
});


// error handling
server.on('error', (error) => {
    console.error('Error in master server: ' + error);
    logger.log(Date.now(), true, 'Master server error', error);
});


// process the request and redirect to orcid
server.on('request', (request, response) => {
    
    // remove preceding '/'
    var req = request.url.substr(1);
    var reqSplits = req.split('/');
    var service = reqSplits[0];

    // redirect orcid requests
    if (service == 'orcid') {
        console.log('Received orcid request. Redirecting...');
        orcid.orcidRedirect(request, response);
    }

    // ignore favicon requests
    else if (service == 'favicon.ico') {
        console.log('Favicon request ignored.');
    }

    // log other requests
    else {
        console.log('Received noncoforming request: ' + request.url);
        response.write('Resource not found.');
        response.end();
        logger.log(Date.now(), true, 'Non-conforming request', request.url);
    }
});
