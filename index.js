'use strict';
/*

 */
const languageFactory = require('./factory/messageFactory.js');
const lookup = require('./api/routes/lookup.js');
const encryption = require('./lib/encryption.js');
const callback = require('./api/routes/callback.js');
const dateHelper = require('./lib/dateHelper.js');
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
    return '123456789456123';
}

/**
 * 
 * @param {*} family 
 */
async function GetEncryptedLink(family)
{

    console.log(family);
    console.log('async function GetLink(family)');
    return `https://testproject-239016.appspot.com/?familyid=${family}`;
}

/**
 * 
 * @param {*} region 
 * @param {*} status 
 */
async function GetResponseMessage(link, obj, language, status, RespondToProvider)
{
    console.log('await languageFactory.getMessage(link, obj, language, status, RespondToProvider);');
    await languageFactory.getMessage(link, obj, language, status, RespondToProvider);
}
/**
 * 
 * @param {*} message 
 * @param {*} obj 
 */
async function RespondToProvider(message, obj)
{
    const dateString = await dateHelper.getDateAsString();
    var data = {
        id: obj.id,
        sender: obj.sender,
        recipient: obj.recipient,
        message: message,
        conversation: "",
        time: dateString
    }

    var status = await callback.callbackToProvider(data);
    console.log(`provider status was: ${status}.`)
    console.log('async function RespondToProvider(message, obj)');
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

    let sender = obj.sender;
    let family = await LookupCard(sender);
    let status = await ValidateCard(family);
    if(status === 1){/* 1 ok, 2 nok */
        link = await GetEncryptedLink(family);
        console.log(link);
    }
    await GetResponseMessage(link, obj, language, status, RespondToProvider);
    //RespondToProvider(link, sender, message, obj);
    
    console.log(`roundtrip took ${Date.now() - processStart} ms.`);
    console.log('---------------------------------------------------');

});


server.listen(port, () => {
    console.log(`listening on port ${port}`);
});





