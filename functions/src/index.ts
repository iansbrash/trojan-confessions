'use strict';

import * as functions from "firebase-functions";
// import { ref } from "firebase-functions/lib/providers/database";
// import * as express from 'express';

// const app = express();

// app.get('/', (req, res) => res.status(200).send('Hey there!'));

/**             LOGIC FLOW:
 *  1. Posts are submitted for approval
 *  2. Posts are filtered and approved
 *      - Stored in a seperate database / path
 *  3. Upon being approved, function event listener is triggerd
 *      - Checks if approved.length >= 10
 *  4. Takes oldest 10 submissions, somehow gets their base64 data
 *      - Puppeteer needs the .jpg file to post
 *      - Make 10 requests to an endpoint on trojanconfessions.com/api/preview/theme?confession='asdasdasd'
 *      - Endpoint returns the image via res.sendFile or the binary/base64 data
 *      - Store these images in temp array
 *  5. Launch puppeteer
 *      - Post
 *  6. Delete submissions from approved
 *  7. Set delay of 30 minutes between function invocation
 */

// was triggered

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
// var constants = require( './constants.ts' );

const puppeteer = require('puppeteer');
var fs = require('fs');

import {
    latelysocialUsername,
    latelysocialPassword,
    latelysocialAccountId
} from './constants';

// Contants for logging in, etc
// var latelysocialUsername = constants.latelysocialUsername;
// var latelysocialPassword = constants.latelysocialPassword;
// var latelysocialAccountId = constants.latelysocialAccountId;

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

const makeLatelySocialPost = async (
    imageUrlArray : string[], 
    caption : string) => {

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
        await axios(config);
    }
    catch (e) {
        console.error("error making latelysocial post")
        console.error(e);
    }

    // make sure that res.data !=== 'error'
    // and that it === 'success'

    // console.log(res);
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
const getBase64Array = async (toPostArray : any) => {
    // headless: false for debugging
    // let options = {
    //     headless: true
    // };

    // populate with 10 strings of abse64
    let base64Array = [];

    
    const browser = await puppeteer.launch({
        args: ['--no-sandbox']
    });
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
        } = toPostArray[i];

        console.log(`
            content: ${content}, 
            hashedId: ${hashedId},
            tags: ${tags},
            theme: ${theme},
            timestamp: ${timestamp}
        `)

        await page.goto(`http://localhost:3000/preview/${theme}?confessionInput=${content}&location=${signature.location}&school=${signature.school}&fraternity=${signature.fraternity}&year=${signature.year}${tags.split(',').reduce((acc : any, curr : any) => acc + "&tags[]=" + curr)}
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


const uploadToLatelySocialDatabase = async (base64Array : string[]) => {

    let latelysocialUploadArray = [];

    for (let i = 0; i < base64Array.length; i++){

        var base64Data = base64Array[i].replace(/^data:image\/png;base64,/, "");

        console.log('about to write to out.png in iteration ' + i)
        try {
            await fs.promises.writeFile("out.png", base64Data, 'base64');
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
        await fs.promises.unlink("out.png", (err : Error) => {
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




export const onToPostCreate3 = functions.database.ref(
    '/toPost/{toPostId}'
).onCreate((snapshot, context) => {
    // const postId = context.params.postId;
    // console.log(`new postId: ${postId}`);
    console.log('shit is getting trigged 3');

    console.log(snapshot.val());


    if (snapshot.exists()){
        console.log('exists!');

        return snapshot.ref.parent!.once('value').then(async (datasnapshot) => {
            const numberOfChildren = datasnapshot.numChildren();
            console.log(numberOfChildren);

            console.log('before');
            // Object.keys(datasnapshot.val()).forEach(key => {
            //     console.log(datasnapshot.val()[key].content)
            // })

            console.log('starting entire upload process');
            var newArrayDataOfOjbect = Object.values(datasnapshot.val())
            const base64Array = await getBase64Array(newArrayDataOfOjbect);
            console.log(`base64Array.length: ${base64Array.length}`)
        
            const caption = 'from functions';
        
            const latelysocialUploadArray = await uploadToLatelySocialDatabase(base64Array);
        
            await makeLatelySocialPost(latelysocialUploadArray, caption);

            if (numberOfChildren >= 10){

                console.log('about to remove 10!');

                // this is where we post to latelysocial


                datasnapshot.ref.limitToFirst(10).ref.remove().then( () => {
                    console.log('remove successfulk')
                }).catch( e => {
                    console.log('removed failed')
                    console.error(e);
                })
            }
        });
    }

    return;
});