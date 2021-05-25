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
var constants = require( './constants.js' );
var imagebase64 = require('./imagebase64');
const puppeteer = require('puppeteer');
var fs = require('fs');


const { Readable } = require("stream")

const readable = Readable.from(["input string"])

var samplebase64 = imagebase64.samplebase64;

var stringtostream = require('string-to-stream')
// var intoStream = require('into-stream');
// import intoStream from 'into-stream';

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

const makeLatelySocialPost = async (imageUrlArray, caption) => {

    // cookies contains:
    // token, general_sessions, mid
    const cookies = await loginLatelySocial();

    // usctrojanconfessions

    /** CAROSEL POST SPECIFICATIONS */
    // const caption = 'tessssst';
    
    const media = [
        // 'https://dymwzetew9d5u.cloudfront.net/user182278/16212916316774.png',
        // 'https://dymwzetew9d5u.cloudfront.net/user182278/16212916379406.png',
        // 'https://i.imgur.com/zRQGgNx.jpg',
        // 'https://i.imgur.com/lsgicGv.jpeg',
        // 'https://i.imgur.com/mPnRn0g.png'
        // below is created by us thru reqs
        'https://dymwzetew9d5u.cloudfront.net/user182278/16219582433279.png'

    ]

    let media2 = [
        'https://dymwzetew9d5u.cloudfront.net/user182278/16212916316774.png'
    ]

    // for (let i = 0; i < imgurUrlArray.length; i++){
    //     media2.push(imgurUrlArray[i]);
    // }
    // const media = imgurUrlArray;
    /** CAROSEL POST SPECIFICATIONS */

    console.log('in mLSP...')
    // console.log(imgurUrlArray);

    console.log('Starting makeLatelySocialPost');

    var data = qs.stringify({
        'account[]': latelysocialAccountId,
        'caption': caption ? caption : 'NEED TO CHANGE THIS',
        'carouselUserTagData': '',
        'comment': '',
        'media': imageUrlArray,
        // 'media[]': 'https://i.imgur.com/aszWQ1L.png',
        // 'media[]': 'https://i.imgur.com/P970j0r.png',
        // 'repeat_end': '17/05/2021 05:46 PM',
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


/**
 * {
 *      content: "asd",
 *      hashedId: "asd",
 *      tags: "test,test2,test3",
 *      theme: "imessage",
 *      timestamp: "2021-05-19T...",
 *      signature: {
 *          fraternity: "",
 *          location: "",
 *          school: "",
 *          year: ""
 *      }
 * }
 */
const getBase64Array = async (toPostArray) => {
    // headless: false for debugging
    let options = {
        headless: false
    };

    // populate with 10 strings of abse64
    let base64Array = [];

    
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();

    // should iterate 10 times regardless
    for (let i = 0; i < toPostArray.length; i++){
        const {
            content,
            hashedId,
            tags,
            theme,
            timestamp,
            signature
        } = toPostArray[i]

        console.log(`
            content: ${content}, 
            hashedId: ${hashedId},
            tags: ${tags},
            theme: ${theme},
            timestamp: ${timestamp}
        `)

        await page.goto(`http://localhost:3000/preview/${theme}?confessionInput=${content}&location=${signature.location}&school=${signature.school}&fraternity=${signature.fraternity}&year=${signature.year}${tags.split(',').reduce((acc, curr) => acc + "&tags[]=" + curr)}
        `);
        //&tags[]=one&tags[]=2

        await page.waitForSelector('#b64');
        const element = await page.$("#b64");



        const text = await (await element.getProperty('textContent')).jsonValue();

        base64Array.push(text);
    }

    
    // console.log(text);

    await browser.close();

    return base64Array;
};

const postToImgur = async (base64Array) => {

    let imgurUrlArray = [];

    for (let i = 0; i < base64Array.length; i++){
        try {
            var data = new FormData();

            //23 for jpeg 22 for png
            data.append('image', base64Array[i].substring(22));
            data.append('type', 'base64');

            const res = await axios({
                method: 'post',
                url: 'https://api.imgur.com/3/upload',
                headers: {
                    Authorization: `Client-ID ${imgurClientId}`,
                    ...data.getHeaders()
                },
                data: data
            });

            console.log("HERE's the link (hopefully)");
            console.log(res.data.data.link) // this works!!!!

            imgurUrlArray.push(res.data.data.link);
        }
        catch (e) {
           console.error(e);
        }
        
    }

   return imgurUrlArray;
}

const uploadToLatelySocialDatabase = async (base64Array) => {

    // var base64Data = req.rawBody.replace(/^data:image\/png;base64,/, "");

    let latelysocialUploadArray = [];

    for (let i = 0; i < base64Array.length; i++){

        var base64Data = base64Array[i].replace(/^data:image\/png;base64,/, "");

        console.log('about to write to out.png in iteration ' + i)
        try {
            const res1 = await fs.promises.writeFile("out.png", base64Data, 'base64');
        }
        catch (e) {
            console.error('error writing to out.png')
            console.error(e);
        }
        
    
        console.log('about to create read stream');
        const readStream = fs.createReadStream('out.png');
    
        var data = new FormData();
        data.append('files[]', readStream);
        data.append('token', '14b22ac28ff5b8fc7a4312e8f5217540');
        data.append('user', '182278');
    
    
        var config = {
            method: 'post',
            url: 'https://app.scheduleinstagrampostsfree.com/uploadvideo/welcome/lately/',
            headers: { 
                ... data.getHeaders()
            },
            data : data
        };
    
        // const res = await axios(config);

        // latelysocialUploadArray.push(
        //     `https://dymwzetew9d5u.cloudfront.net/user182278/${res.data.link}`
        // );
    }

    // then delete out.png
    console.log('now deleting out.png')
    try {
        const res2 = await fs.promises.unlink("out.png", err => {
            if (err) throw err;
            else console.log('out.png was deleted');
        });
    }
    catch (e) {
        console.error('error deleting out.png')
        console.error(e);
    }

    console.log(latelysocialUploadArray);

    // then return the array
    return latelysocialUploadArray;
}


const testToPostArray = [
    {
        content: "test to post array",
        hashedId: "123",
        tags: "what,the,fuck,is,we,doin",
        theme: "imessage",
        timestamp: "nah",
        signature: {
            location: "Gateway",
            school: "Price",
            fraternity: "SigNu",
            year: "Junior"
        }
    },
    {
        content: "test to post array 3123123123123123",
        hashedId: "1234",
        tags: "in",
        theme: "zoom",
        timestamp: "ok",
        signature: {
            location: "ok",
            school: "will",
            fraternity: "asd",
            year: "haha"
        }
    },
    {
        content: "this shit better fuek en work",
        hashedId: "122222223",
        tags: "what",
        theme: "tinder",
        timestamp: "aaaaaa",
        signature: {
            location: "Gateaaaaaaway",
            school: "Pricaaaae",
            fraternity: "SigaaaaNu",
            year: "Junaaaaaaaaaior"
        }
    }
];



(async () => {
    console.log('starting');

    const base64Array = await getBase64Array(testToPostArray);
    console.log(`base64Array.length: ${base64Array.length}`)
    console.log(base64Array[0]);
    // return;
    // const imgurUrlArray = await postToImgur(base64Array);
    // console.log(`imgurUrlArray.length: ${imgurUrlArray.length}`)

    const caption = 'wowwwwww';

    const latelysocialUploadArray = await uploadToLatelySocialDatabase(base64Array);

    await makeLatelySocialPost(latelysocialUploadArray, caption);
})();