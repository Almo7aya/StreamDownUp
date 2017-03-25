/*global require, console*/
/*esnext: true*/

var http = require('http'),
    util = require('util'),
    fs   = require('fs'),
    downStream= require('./lib/down-stream');

var down = new downStream('./temp/file.mp4');


down.start('http://localhost:3000/movie.mp4', function (err, nameFile) {
    
    if (err) {
        console.log(err.message);
    }
    
    fs.unlink(nameFile, function () {
        
        console.log('File deleted');
        
    });
    
});

