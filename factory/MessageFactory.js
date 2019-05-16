'use strict';

const fs = require('fs');
const validate = require('../lib/validate.js');
async function getMessage(link, region, language, status){
    let lang = '';
    if(await validate.isSupportedLanguage(language)){
        lang = language.toString().toLowerCase();
    }else{
        lang = 'en';
    }

    let message = '';
    let filePath = `./language/message_${lang}.json`;
    let languageText;
    fs.readFile(filePath, 'utf8', (err, jsonstring) => {
        if(err){
            console.log("File read failed: ", err)
            return;
        }
        try{
            languageText = JSON.parse(jsonstring);
            switch(status){
                case 1:
                    message = languageText.status1;
                    console.log(message);
                    break;
                default:
                    message = 'default';
            }
        }
        catch(err){
            console.log('Error parsing JSON string:', err);
        }
        return message;
    });
}

module.exports.getMessage = getMessage;