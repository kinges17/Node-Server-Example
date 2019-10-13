'use strict';

require('dotenv').config();

var request = require('request');
var Promise = require('promise');
var logger = require('../../logging/logger');

const clientId = process.env.ORCID_APP_ID;
const clientSecret = process.env.ORCID_APP_PASS;

const publicEndpoint = 'https://pub.orcid.org/';


/******************************************************************************/
/***********             ENTRY POINT FOR MASTER SERVER              ***********/ 
/******************************************************************************/
function orcidRedirect(request, originalResponse) {
    // for public data requests, only need the orcid id of the user
    var orcidIdReq = readRequest(request);

    // set orcid id if not provided to test functionality
    if (orcidIdReq == null) {
        console.log('ORCID: No orcid id provided.');
        logger.log(Date.now(), true, 'ORCID', 'No orcid id included in request', 'No request made');
    }

    // make the api call to read public data
    requestPublicData(orcidIdReq).then((publicData) => {
        console.log('ORCID: Data: ' + publicData);
        logger.log(Date.now(), false, 'ORCID', orcidIdReq, publicData);

        originalResponse.writeHead(200, {'Content-Type': 'application/json'});
        originalResponse.write(publicData);
        originalResponse.end();
    },
    (error) => {
        console.log('ORCID: Error: ' + error);
        logger.log(Date.now(), true, 'ORCID', orcidIdReq, error);

        originalResponse.write('Could not retrieve data.');
        originalResponse.end();
    });
}
module.exports.orcidRedirect = orcidRedirect;
/******************************************************************************/


// read input orcid id from the request body
function readRequest(request) {

    if (request.method == 'GET') {
        console.log('ORCID: Received GET.');

        let resource = request.url;

        // remove preceding 'orcid' from redirect
        if (resource != null) { 
            resource = resource.substr(1);
            var resSplits = resource.split('/');
            resSplits.shift();

            // concatenate back the resource request
            resource = resSplits.join('/');
        }
        return resource;
    }
    else { console.log('ORCID: Non-GET requests not handled for orcid api.'); }
    return null;
}


// communicate with orcid api to obtain user's public data
function requestPublicData(resource) {

    // generate the url from orcid's endpoint and the resource requested
    var options = {
        url: publicEndpoint + resource,
        method: 'GET',
        headers: {'Accept': 'application/json'},
    };

    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                resolve(body);
            }
            else {
                console.log("ORCID: Error: " + body);
                reject(body);
            }
        });
    });
}
