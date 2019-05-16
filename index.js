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


    return true;
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
    const encryption = require('./api/routes/encryption.js');
    console.log(family);
    console.log('async function GetLink(family)');
    return `link: ${family}`;
}

/**
 * 
 * @param {*} region 
 * @param {*} status 
 */
async function GetResponseMessage(link, status, obj)
{
    const language = require('./factory/MessageFactory.js');
    
}
/**
 * 
 * @param {*} link 
 * @param {*} sender 
 */
async function RespondToLekab(link, sender, message)
{
    const callback = require('./api/routes/callback.js');

    console.log('async function RespondToLekab(link, sender)');
}

/**
 * 
 */
const server = http.createServer(async (req, res) => {
    var obj ='';
    if(req.method == 'POST'){
        var processStart = Date.now();
        let body = '';
        req.on('data', async chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            obj = JSON.parse(body);
            console.log(obj);
            eventEmitter.emit('event', obj, processStart);
        });
        res.writeHead(200, {"Content-Type" : "text/plain"});
        res.end("Ok\n");
    }
});

/**
 * 
 */
eventEmitter.on('event', async function(obj, processStart){
    let link;
    const pub = [{
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
    
    let message = await GetResponseMessage(link, status, obj);
    await RespondToLekab(link, sender, message);

    console.log(`roundtrip took ${Date.now() - processStart} ms.`);
    console.log('---------------------------------------------------');

});


server.listen(port, () => {
    console.log(`listening on port ${port}`);
});





