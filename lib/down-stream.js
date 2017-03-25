/*global require, module, console,esnext*/
/* By Ali Almoahay */

var http    = require('http'),
    fs      = require('fs');

//init the main constructer

var DownStream = function (outFile) {
    'use strict';
    
    this.start = function (url, next) {
        'use strict';
        //fix the localhost err
        if (url.match(/localhost/ig)) {
            url = url.replace(/localhost/ig, '127.0.0.1');
        }
        
        //start the request
        var req = http.request(url, function (res) {

            //print the status log
            console.log('Server Start Response');
            console.log(`statusCode => ${res.statusCode}`);
            console.log('Response Header \n %j', res.headers);

            //start write the stream in file
            var writeStream = fs.createWriteStream(outFile);

            //get the content
            console.log('Full size is => ' + res.headers['content-length']);
            var fullLength = res.headers['content-length'],
                liveLength = 0;
            
            res.once('data', function () {
                
                next(null, outFile);
                
            });
            
            res.on('data', function (chunk) {
                
                //on incoming data write it in the file
                writeStream.write(chunk);

                //get The downloaded size
                liveLength += chunk.length;

                //the precent of download 
                var pre = Math.floor((liveLength / fullLength) * 100);

                process.stdout.clearLine();
                process.stdout.cursorTo(0);
                process.stdout.write(`${pre} %`);
                
        });
    
            res.on('end', function () {
                'use strict';
                //print success msg
                console.log('File is Downloaded');
                
            });
    
        });

        // on any error print err message
        req.on('error', function (error) {
            'use strict';
            next(error, null);
        });
        //end the http request
        req.end();
        
    };
    
    
};

module.exports = DownStream;