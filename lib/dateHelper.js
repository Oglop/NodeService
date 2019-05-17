'use strict';

async function getDateAsString(){
    try{
        //2019-05-17T07:58:32.824Z
        let dateNOW = new Date();
        let temp = dateNOW.toISOString();
        let dateString = temp.substring(0, 22);
        return dateString;
    }
    catch(error){

    }
    return '';
}

module.exports.getDateAsString = getDateAsString;