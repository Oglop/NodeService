'use strict';
/*
{"id":"19334","sender":"12345678900","recipient":"70303","message":"I am a little teapot","conversation":"","time":"2009-02-14T00:31:30"} 
*/
const request = require('request');
const url = 'https://provider-dot-testproject-239016.appspot.com/';

async function callbackToProvider(obj){
    
    request({
        url: url,
        method: "POST",
        json: true,
        body: obj
    }, function (error, response, body){
        if(!error && response.statusCode == 200){
            return response.statusCode
        }
        else{
            response.statusCode
        }
    });

}

module.exports.callbackToProvider = callbackToProvider;




