/*global require, module*/
/* By Ali Almoahay */

var http    = require('http'),
    fs      = require('fs'),
    emitter = require('events').EventEmitter,
    util    = require('util');

//init the main constructer

var downStream = function () {
    'use strict';

    this.start = function (url, next) {
        
        console.log(name);
        
        next('Almohaya');
    };
    
    
};

util.inherits(downStream, emitter);

module.exports = downStream;