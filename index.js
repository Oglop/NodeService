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
    
}
/**
 * 
 * @param {*} link 
 * @param {*} sender 
 */
async function RespondToLekab(link, sender, message)
{
    console.log('async function RespondToLekab(link, sender)');
}



const server = http.createServer(async (req, res) => {
    var obj ='';
    console.log('1');
    if(req.method == 'POST'){
        var processStart = Date.now();
        let body = '';
        console.log('2');
        req.on('data', async chunk => {
            console.log('3');
            body += chunk.toString();
        });
        req.on('end', async () => {
            console.log('5');
            obj = JSON.parse(body);
            console.log(obj);
            eventEmitter.emit('event', obj, processStart);
        });
        console.log('4');
        res.writeHead(200, {"Content-Type" : "text/plain"});
        res.end("Ok\n");
    }
});

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
});


server.listen(port, () => {
    console.log(`listening on port ${port}`);
});





