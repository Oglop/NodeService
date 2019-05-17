'use strict';

const fs = require('fs');
const validate = require('../lib/validate.js');

async function getMessage(link, obj, language, status, RespondToProvider){
    let lang = '';
    if(validate.isSupportedLanguage(language)){
        lang = language.toString().toLowerCase();
    }else{
        lang = 'en';
    }

    var message = '';
    let filePath = `./language/message_${lang}.json`;
    let languageText;
    fs.readFile(filePath, 'utf8', async (err, jsonstring) => {
        if(err){
            console.log("File read failed: ", err)
            return;
        }
        try{
            languageText = JSON.parse(jsonstring);
            switch(status){
                case 1:
                    console.log(languageText.status1)
                    var msg = languageText.status1 + link;
                    console.log(msg)
                    await RespondToProvider(msg, obj);
                    break;
                default:
                    message = 'default';
            }
        }
        catch(err){
            console.log('Error parsing JSON string:', err);
        }
    }).then(await RespondToProvider(msg, obj));
}

module.exports.getMessage = getMessage;