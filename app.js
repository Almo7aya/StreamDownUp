/*global require, console*/
/*esnext: true*/

var http = require('http'),
    util = require('util'),
    fs   = require('fs'),
    url = 'http://127.0.0.1/player_streaming/outside/Movies/HBNiUn_nkbeFlT9Vu6ZOB2yVSk4TSWh7RtGTgqGSm44JGKk63wIM_CU2V3XU6U-ppE99n8F6RsMtWkuCZJHPeRM25YM7WQ5AjDq91Q9DKCGZR7ZBkwEu_lS8z1U_hkI05Qh4PN-Fc1-OKbiG5CoeoaM1HuJ4wRIfO1CrNJ7Ty_FV_In_o5VOBQvkB9fW9R3K';

var downStream = require('./lib/down-stream'),
    
    stream = new downStream(url, 'File.mp4');


stream.data();

/*var req = http.request(url, function (res) {
    
    'use strict';
    //print the status log
    console.log('Server Start Response');
    console.log(`statusCode => ${res.statusCode}`);
    console.log('Response Header \n %j', res.headers);

    //start write the stream in file
    var writeStream = fs.createWriteStream('Stream.mp4');
    
    //get the content
    console.log('Full size is => ' + res.headers['content-length']);
    var fullLength = res.headers['content-length'],
        liveLength = 0;
    
    res.on('data', function (chunk) {
        'use strict';
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
    console.log(`Error with request => ${error.message}`);
});
//end the http request
req.end();*/