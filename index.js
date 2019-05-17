'use strict';
/*

 */
const events = require('events');
const eventEmitter = new events.EventEmitter();
const http = require('http');
const port = process.env.PORT || 8080;

/**
 * 
 * @param {*} family 
 */
async function ValidateCard(family){
    

    return 1;
}

/**
 * 
 * @param {*} sender 
 */
async function LookupCard(sender)
{
    const lookup = require('./api/routes/lookup.js');
    console.log(sender);
    console.log('async function LookupFamilyCard(sender)');
    return sender;
}

/**
 * 
 * @param {*} family 
 */
async function GetEncryptedLink(family)
{
    const encryption = require('./lib/encryption.js');
    console.log(family);
    console.log('async function GetLink(family)');
    return `link: ${family}`;
}

/**
 * 
 * @param {*} region 
 * @param {*} status 
 */
async function GetResponseMessage(link, region, language, status)
{
    const languageFactory = require('./factory/messageFactory.js');
    const message = languageFactory.getMessage(link, region, language, status);
    return message;
    
}
/**
 * 
 * @param {*} link 
 * @param {*} sender 
 */
async function RespondToProvider(link, sender, message, obj)
{
    //{"id":"19334","sender":"12345678900","recipient":"70303","message":"I am a little teapot","conversation":"","time":"2009-02-14T00:31:30"} 
    const callback = require('./api/routes/callback.js');
    var data = {
        id: obj.id,
        sender: obj.sender,
        recipient: obj.recipient,
        message: message,
        conversation: "",
        time: Date.now().toISOString()
    }
   
    await callback.callbackToProvider(data);
    console.log('async function RespondToLekab(link, sender)');
}

/**
 * 
 */
const server = http.createServer(async (req, res) => {
    var obj ='';
    var url = require('url');
    var parsedUrl = url.parse(req.url, true);

    let params = parsedUrl.pathname.split('/');
    let region = params[1];
    let language = params[2];

    if(req.method == 'POST'){
        var processStart = Date.now();
        let body = '';
        req.on('data', async chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            obj = JSON.parse(body);
            console.log(obj);
            eventEmitter.emit('event', obj, region, language, processStart);
        });
        res.writeHead(200, {"Content-Type" : "text/plain"});
        res.end("Ok\n");
    }
});

/**
 * 
 */
eventEmitter.on('event', async function(obj, region, language, processStart){
    let link;
    let callbackObj = [{
        id: obj.id,
        sender: obj.sender,
        recipient: obj.recipient,
        message: obj.message,
        time: obj.time
    }];

    let sender = obj.sender;
    let family = await LookupCard(sender);
    let status = await ValidateCard(family);
    if(status === 1){/* 1 ok, 2 nok */
        link = await GetEncryptedLink(family);
    }
    
    let message = await GetResponseMessage(link, region, language, status);
    
    await RespondToProvider(link, sender, message, obj);


    console.log(`roundtrip took ${Date.now() - processStart} ms.`);
    console.log('---------------------------------------------------');

});


server.listen(port, () => {
    console.log(`listening on port ${port}`);
});





