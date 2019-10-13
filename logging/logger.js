var fs = require('fs');

// log the time, error status, request and response
function logToFile(time, errorStatus, api, request, response) {

    // convert the time parameter from milliseconds to a date and time
    var date = new Date(time);
    var newRequest = date.toString() + "," + api + ',' + request + ",";

    if (errorStatus) { newRequest += "ERROR,"; }
    else {newRequest += "VALID,"; }

    newRequest += response + '\n';

    // write the new request to file
    fs.appendFile('logging/logs.csv', newRequest, (error) => {
        if (error) {
            console.log("Error occured while logging request: " + error);
        }
        else { console.log("Debug: Wrote to file.") }
    });
}

// export logging functionality
module.exports.log = logToFile;
