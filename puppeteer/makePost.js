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
var FormData = require('form-data');


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
        'email': 'usctrojanconfessions@gmail.com',
        'password': 'R95DcAWV!LmvX6Q',
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
    const account = '180e251757aaeb5093cf7c38ce1c5c7a';

    /** CAROSEL POST SPECIFICATIONS */
    const caption = 'post from makePost.js';

    const media = [
        'https://dymwzetew9d5u.cloudfront.net/user182278/16212916316774.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI2NJXER2W4C4FYVA%2F20210517%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210517T224712Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1200&X-Amz-Signature=9174d7dc9483a8b224636f7eb961d2c806db1e142b67bd3f61c9a753dbb6139c',
        'https://dymwzetew9d5u.cloudfront.net/user182278/16212916379406.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI2NJXER2W4C4FYVA%2F20210517%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210517T224718Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1200&X-Amz-Signature=9fe3423083020cc696ef8f11590f01576643d3663af62c906bce008009aa0071'
    ]
    /** CAROSEL POST SPECIFICATIONS */

    console.log('Starting makeLatelySocialPost');

    var data = qs.stringify({
        'account[]': account,
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



    console.log(res);

    


    return;
}

makeLatelySocialPost();
 