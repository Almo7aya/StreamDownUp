/*global require*/
/* By Ali Almoahay */

var http    = require('http'),
    fs      = require('fs'),
    emitter = require('events').EventEmitter,
    util    = require('util');

//init the main constructer

var downStream = function (url, nameOfFile) {
    'use strict';
    
    /* set the  events */
    
    
    
    
    
    
    var name;
    nameOfFile === 'undefined' ? name = 'Stream.mp4' : name = nameOfFile;
    
    var wS = fs.createWriteStream(name, 'base64');

    wS && this.emit('file');

    //start the http request 
    var req = http.request(url, function (res) {
        
        res.once('data', function(data) {
            
            this.emit('dataStart');
            console.log('data start');
            
        });
        
        res.on('data', function(data) {
            
            wS.write(data);
            
        });
        
        
        res.on('end', function(data) {
            
            console.log('end file transform');
            
        });
        
    });
    
    
    req.on('error', function (err) {
        console.log(`Error with reques => ${err.message}`);
        fs.unlink(name);
    });

    
    //end the http request
    req.end();
    ///////////////
    
    
    
};


util.inherits(downStream, emitter);

module.exports = downStream;