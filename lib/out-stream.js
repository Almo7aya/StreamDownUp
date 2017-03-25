/*global require, console, module*/

//Written By Ali Almohaya 25/3/2017
//require the main modules
var fs       = require('fs'),
    path     = require('path');



//the main constructer

var OutStream = function (http) {
    'use strict';
    // set the server scope varable
    var server;
    // create server
    this.createServer = function (filePath, routePath) {
        
        server = http.createServer(function (req, res) {
            
            if (req.url === routePath) {

                var realNameWithPath = path.resolve(filePath);
                //get the stat of the file 
                fs.stat(realNameWithPath, function (err, stat) {

                    if (err) {
                        //if the status code == ENOENT // NOT FOUND
                        if (err.code === 'ENOENT') {
                            //file Not Found
                            return res.writeHead(404);
                        }
                        //If uknown err stop the res and send the err
                        res.end(err);
                    }
                    
                    //init the varables
                    var total  = stat.size,
                        range  = req.headers.range,
                        stream = fs.createReadStream(realNameWithPath);

                     
                    if (!range) {
                        //if range not found
                        //send success message
                        res.writeHead(200, {
                            "Content-Length": total,
                            "Accept-Ranegs": "bytes",
                            "Content-Type": "video/mp4"
                        });
                        //start stream
                        return stream.pipe(res);
                    }

                    //get the infos from the request headers
                    var position  = range.replace(/bytes=/, '').split('-'),
                        //get the start point from the request headers
                        start     = parseInt(position[0], 10),
                        //get the end point from the request headers if end not exsist set it as the total
                        end       = position[1] ? parseInt(position[1], 10) : total - 1,
                        //set the chunkSize the full length - the passed size
                        chunkSize = (end - start) + 1;
                    

                    // Start write the response header fildes
                    // Partial Content
                    res.writeHead(206, {

                        "Content-Range": "bytes " + start + "-" + end + "/" + total, //bytes 17694720-116925384/116925385
                        "Accept-Ranegs": "bytes",
                        "Content-Length": chunkSize,
                        "Content-Type": "video/mp4", // note that have to change for every deffrent extend
                        "Transfer-Encoding": "chunked"

                    });
                    
                    //
                    // TODO:FIX The server stop when range start get grater the end range 
                    //

                    //start The streaming Form the target file
                    stream = fs.createReadStream(realNameWithPath, {
                        start: start,
                        end: end
                    }).on('open', function () { //on the stream open and get data
                        stream.pipe(res);//pipe the data to the res
                    }).on('error', function (err) { //on the stream gets an err
                        console.log(err.message);
                        res.pipe(err);//pipe the err to the res
                    });

                });
            }
            
    //=========
        });
        
    };
    
    // listen
    this.listen = function (port) {
        //start listen at the port
        server.listen(port, function () {
            
            console.log('Server is running');
            
        });
    };
    
    
////////////////
};

module.exports = OutStream;