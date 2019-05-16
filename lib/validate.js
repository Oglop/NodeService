'use strict';
/**
 * 
 * @param {*} language 
 */
async function isSupportedLanguage(language){
    try{
        if(language === null){ return false;}
        const supportedLanguages = [
            "en",
            "se"
        ]
        if(supportedLanguages.indexOf(language) > -1){
            return true;
        }
    }
    catch(err){
        console.log(err);
    }
    return false;
}


module.exports.isSupportedLanguage = isSupportedLanguage;

