/*global require, console*/
/*esnext: true*/

var http       = require('http'),
    util       = require('util'),
    fs         = require('fs'),
    DownStream = require('./lib/down-stream'),
    OutStream  = require('./lib/out-stream');

var url = 'http://127.0.0.1/player_streaming/outside/Movies/d81xgm-nY8RygfSuWLKCzC8kvSzlXZv9xDq0vkxYOYQ8_RwlZxClIPnNy5cr_qc5DCnoouS7_EJTVt6EXIjM74DHIQjukdjawkC30s7Kl5jbR6jtnOdwfxUuKSppEic_yISnSvOhN_xJVlVDqVmcY1IeHTO2axlH_14giD9Vpi3b4qQXtm0xy3f1pPP5X9Fy';

var fileName = './temp/letItGo.mp4';


var OS = new OutStream(http);


var down = new DownStream('./temp/file.mp4');

down.start(url, function (err, streamFile) {
    'use strict';
    if (err) {
        console.log(err.message);
    }
    
    if (streamFile) {
        
        OS.createServer(streamFile, '/stream');
        OS.listen(3000);
        
    }
    
});