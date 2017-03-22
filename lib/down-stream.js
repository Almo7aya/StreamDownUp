/*global require*/
/* By Ali Almoahay */

var http    = require('http'),
    fs      = require('fs'),
    emitter = require('events').EventEmitter,
    util    = require('util');

//init the main constructer

var downStream = function (url, nameOfFile) {
    'use strict';
    
    var name;
    nameOfFile === 'undefined' ? name = 'Stream.mp4' : name = nameOfFile;
    
    var wS = fs.createWriteStream(name, 'base64', function (err) {
        
        if (err)
            throw err;
        //emit the event file created
        this.emit('fileCreated');
        
    });
    
    
    
    //http.createServer();
    
    
};

util.inherits(downStream, emitter);


module.exports = downStream;