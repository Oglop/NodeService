'use strict'
const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {

    res('');
    const sender = req.body.sender;
    let family = await LookupFamilyCard(sender);
    let link = await GetEncryptedLink(family);
    let message = await GetResponseMessage();
    RespondToLekab(link, sender);
    //getbarcode


});


async function LookupFamilyCard(sender)
{
    console.log('async function LookupFamilyCard(sender)');
    return '';
}

async function GetEncryptedLink(family)
{
    console.log('async function GetLink(family)');
    return '';
}

async function GetResponseMessage(region, status)
{
    
}

async function RespondToLekab(link, sender)
{
    console.log('async function RespondToLekab(link, sender)');
}

