/**
 *           NOTE: Not an exposed express endpoint
 *  -Eventually will be on Firebase Functions server
 *  -Sends request to latelysocial to make a carosel post
 *  -Need to somehow generate a image url to each picture
 *      -Imgur API?
 */

 "use strict";

// import axios from 'axios';
var axios = require('axios');
var qs = require('qs');
var constants = require( './constants.js' );
const puppeteer = require('puppeteer');

var latelysocialUsername = constants.latelysocialUsername;
var latelysocialPassword = constants.latelysocialPassword;
var latelysocialAccountId = constants.latelysocialAccountId;
var imgurClientId = constants.imgurClientId;


// returns a req object... or the only important parts
const getLatelySocialHome = async () => {

    console.log(`Starting getLatelySocialHome`);

    const options = {
        method: 'get',
        url: 'https://latelysocial.com/'
    }

    let res;

    try {
        res = await axios(options);
        console.log(res.headers['set-cookie']);
    }
    catch (e) {
        throw console.error(e);
    }

    const token = res.headers["set-cookie"][0].substring(6, 6 + 32);
    const general_sessions = res.headers["set-cookie"][1].substring(17, 17 + 32);

    console.log(token);
    console.log(general_sessions);

    const cookies = {
        token,
        general_sessions
    }

    return cookies;
}

const loginLatelySocial = async () => {

    const cookies = await getLatelySocialHome();

    console.log(`Starting loginLatelySocial`);

    console.log(cookies);

    var data = qs.stringify({
        'email': latelysocialUsername,
        'password': latelysocialPassword,
        'remember': 'on',
        'token': cookies.token 
    });
    var config = {
        method: 'post',
        url: 'https://latelysocial.com/auth/ajax_login',
        headers: { 
            // 'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"', 
            // 'Accept': 'application/json, text/javascript, */*; q=0.01', 
            // 'DNT': '1', 
            // 'X-Requested-With': 'XMLHttpRequest', 
            // 'sec-ch-ua-mobile': '?0', 
            // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36', 
            // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 
            'Cookie': 'general_sessions=' + cookies.general_sessions + '; token=' + cookies.token
        },
        data : data
    };

    const res = await axios(config);

    console.log(res.headers["set-cookie"])

    const mid = res.headers["set-cookie"][1].substring(4, 4 + 222);
    console.log(mid);

    const cookies2 = {
        token: cookies.token,
        general_sessions: cookies.general_sessions,
        mid
    }

    return cookies2;
}

const makeLatelySocialPost = async () => {

    // cookies contains:
    // token, general_sessions, mid
    const cookies = await loginLatelySocial();

    // usctrojanconfessions

    /** CAROSEL POST SPECIFICATIONS */
    const caption = 'fuck blake';
    const media = [
        'https://dymwzetew9d5u.cloudfront.net/user182278/16212916316774.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI2NJXER2W4C4FYVA%2F20210517%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210517T224712Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1200&X-Amz-Signature=9174d7dc9483a8b224636f7eb961d2c806db1e142b67bd3f61c9a753dbb6139c',
        'https://dymwzetew9d5u.cloudfront.net/user182278/16212916379406.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI2NJXER2W4C4FYVA%2F20210517%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210517T224718Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1200&X-Amz-Signature=9fe3423083020cc696ef8f11590f01576643d3663af62c906bce008009aa0071',
        'https://i.imgur.com/zRQGgNx.jpg'
    ]
    /** CAROSEL POST SPECIFICATIONS */

    console.log('Starting makeLatelySocialPost');

    var data = qs.stringify({
        'account[]': latelysocialAccountId,
        'caption': caption,
        'carouselUserTagData': '',
        'comment': '',
        'media': media,
        'repeat_end': '17/05/2021 05:46 PM',
        'repeat_every': '0',
        'thumbnailTimestamp': '',
        'title': '',
        'token': cookies.token,
        'type': 'carousel',
        'url': '',
        'userTagData': '',
        'videoUserTag': '' 
    });

    var config = {
        method: 'post',
        url: 'https://latelysocial.com/instagram/post/ajax_post',
        headers: { 
            // 'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"', 
            // 'Accept': 'application/json, text/javascript, */*; q=0.01', 
            // 'DNT': '1', 
            // 'X-Requested-With': 'XMLHttpRequest', 
            // 'sec-ch-ua-mobile': '?0', 
            // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36', 
            // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 
            'Cookie': 'general_sessions=' + cookies.general_sessions + '; token=' + cookies.token + '; mid=' + cookies.mid
        },
        data : data
    };

    const res = await axios(config);

    // make sure that res.data !=== 'error'
    // and that it === 'success'



    console.log(res);

    


    return;
}

// substr 26 for base64 form htmltoimage
// https://stackoverflow.com/questions/49131516/how-to-copy-text-from-browser-clipboard-using-puppeteer-in-nodejs

const getBase64Array = async () => {
    let options = {
        headless: false
      };
    
    
        const browser = await puppeteer.launch(options);
        const page = await browser.newPage();
    
    
        let imageArray = [];
    
        await page.goto('http://localhost:3000/preview/imessage?confessionInput=asd&location=tusc&school=viterbi&fraternity=sigmaballs&year=freshman&tags[]=one&tags[]=2');
    
    
        // const element = await page.$("#b64");
        // const text = await page.evaluate(element => element.textContent, element);
        

        // const element = await page.$("#b64");

        await page.waitForSelector('#b64');

        const element = await page.$("#b64");


        const text = await (await element.getProperty('textContent')).jsonValue();
        console.log(text);
    
    
        // await page.waitForSelector('#b64');
        // // const element = await page.$('#b64');

        // var copyText = document.querySelector('#b64');
        // copyText.select();
        // // document.execCommand("Copy");
        // // return copyText.value;
        // console.log(copyText.value);

        // element.select();
        // document.execCommand("Copy");

        // console.log(element.value)
    
    
        // await element.screenshot({
        //   path: 'puppeteer/theme.png',
        //   // type: "png"
        // });
    
        // const base64 = await element.screenshot({
        //     encoding: "base64"
        // });
    
        // console.log(base64);
    
        await browser.close();
};//();

const postToImgur = async (base64Array) => {

   for (let i = 0; i < base64Array.length; i++){
        const response = await axios.post('https://api.imgur.com/3/upload', 
        {
            //image is in base64 format
            image: base64Array[i],
            type: 'base64', 
            //name: 'API Test',
            //title: 'Plz',
            //description: 'Pocket Closet'
        },
        {
            headers: {
                Authorization: `Client-ID ${imgurClientId}`
        }

        });
        // console.log(response)
        console.log("HERE's the link (hopefully)");
        console.log(response.data.data.link) // this works!!!!
   }

    
}



// makeLatelySocialPost();

getBase64Array();
 