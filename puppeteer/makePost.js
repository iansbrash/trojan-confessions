/**
 *           NOTE: Not an exposed express endpoint
 *  -Eventually will be on Firebase Functions server
 *  -Sends request to latelysocial to make a carosel post
 *  -Need to somehow generate a image url to each picture
 *      -Imgur API?
 */

 "use strict";
var axios = require('axios');
var qs = require('qs');
var FormData = require('form-data');
var constants = require( './constants.js' );
const puppeteer = require('puppeteer');
var fs = require('fs');

// For testing
var imagebase64 = require('./imagebase64');

// Contants for logging in, etc
var samplebase64 = imagebase64.samplebase64;
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
    console.log(`in makingLatelySocialPost`);
    console.log(`caption: ${caption}`)
    console.log(`imageUrlArray.length: ${imageUrlArray.length}`)

    var data = qs.stringify({
        'account[]': latelysocialAccountId,
        'caption': caption ? caption : 'Confessions.',
        'carouselUserTagData': '',
        'comment': '',
        'media': imageUrlArray,
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
            'Cookie': 'general_sessions=' + cookies.general_sessions + '; token=' + cookies.token + '; mid=' + cookies.mid
        },
        data : data
    };

    try {
        const res = await axios(config);
    }
    catch (e) {
        console.error("error making latelysocial post")
        console.error(error);
    }

    // make sure that res.data !=== 'error'
    // and that it === 'success'

    console.log(res);
    return;
}


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
        `);

        const tcUrl = 'https://trojan-confessions-heroku.herokuapp.com';
        // const tcUrl = 'http://localhost:3000'

        await page.goto(`${tcUrl}/preview/${theme}?confessionInput=${content}&location=${signature.location}&school=${signature.school}&fraternity=${signature.fraternity}&year=${signature.year}${tags.split(',').reduce((acc, curr) => acc + "&tags[]=" + curr)}
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
            data.append('image', base64Array[i].replace(/^data:image\/png;base64,/, ""));
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
    
        // upload image
        const res = await axios(config);

        // push to array which we use to upload to insta
        latelysocialUploadArray.push(
            `https://dymwzetew9d5u.cloudfront.net/user182278/${res.data.link}`
        );
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
    console.log('starting entire upload process');

    const base64Array = await getBase64Array(testToPostArray);
    console.log(`base64Array.length: ${base64Array.length}`)

    const caption = 'full stack';

    const latelysocialUploadArray = await uploadToLatelySocialDatabase(base64Array);

    await makeLatelySocialPost(latelysocialUploadArray, caption);
})();