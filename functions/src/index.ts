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
const path = require('path');
const os = require('os');

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

interface CookieObject {
    [key: string]: string
}

const getLatelySocialHome = async () : Promise<CookieObject> => {

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
        throw "Error getting LatelySocial homepage"
    }

    const token = res.headers["set-cookie"][0].substring(6, 6 + 32);
    const general_sessions = res.headers["set-cookie"][1].substring(17, 17 + 32);

    // console.log(token);
    // console.log(general_sessions);

    const cookies = {
        token,
        general_sessions
    }

    return cookies;
}

const loginLatelySocial = async () : Promise<CookieObject> => {

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

    try {
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
    catch (err) {
        throw "Error logging in to LatelySocial"
    }
}

const makeLatelySocialPost = async (
    imageUrlArray : string[], 
    caption : string) : Promise<undefined> => {

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
        throw "Error making LatelySocial post"
        // console.error(e);
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
const puppeteerScreenshotAndSaveFile = async (toPostArray : any, browser : any, index : number) : Promise<undefined> => {

    const tempFilePath = path.join(os.tmpdir(), 'out.png');
    console.log(`__dirname:  ${__dirname}`)

    // const browser = await puppeteer.launch({
    //     args: ['--no-sandbox']
    // });

    const page = await browser.newPage();

    await page.setDefaultNavigationTimeout(0);

    // for (let i = 0; i < toPostArray.length; i++){
        const {
            content,
            // hashedId,
            tags,
            theme,
            // timestamp,
            signature,
            dark
        } = toPostArray[index];

        // console.log(`
        //     content: ${content}, 
        //     hashedId: ${hashedId},
        //     tags: ${tags},
        //     theme: ${theme},
        //     timestamp: ${timestamp}
        // `)

        const tcUrl = 'https://trojan-confessions-heroku.herokuapp.com';
        const toGoTourl = `${tcUrl}/preview/${theme}?dark=${dark}&confessionInput=${content}&location=${signature.location}&school=${signature.school}&fraternity=${signature.fraternity}&year=${signature.year}${tags.split(',').reduce((acc : any, curr : any) => acc + "&tags[]=" + curr)}`;
        console.log(toGoTourl)
        await page.goto(toGoTourl);

        await page.waitForSelector('#b64');
        const submission = await page.$("#submission");
        try {
            await submission.screenshot({path: tempFilePath});
        }
        catch(err) {
            console.error(err);
            throw "Could not screenshot to temp"
        }
    // }

        return;

}

// @ts-ignore
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

    await page.setDefaultNavigationTimeout(0);

    // should iterate 10 times regardless
    for (let i = 0; i < toPostArray.length; i++){
        const {
            content,
            hashedId,
            tags,
            theme,
            timestamp,
            signature,
            dark
        } = toPostArray[i];

        console.log(`
            content: ${content}, 
            hashedId: ${hashedId},
            tags: ${tags},
            theme: ${theme},
            timestamp: ${timestamp}
        `)

        const tcUrl = 'https://trojan-confessions-heroku.herokuapp.com';
        // const tcUrl = 'http://localhost:3000'

        await page.goto(`${tcUrl}/preview/${theme}?dark=${dark}&confessionInput=${content}&location=${signature.location}&school=${signature.school}&fraternity=${signature.fraternity}&year=${signature.year}${tags.split(',').reduce((acc : any, curr : any) => acc + "&tags[]=" + curr)}
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

const uploadToLatelySocialDatabaseViaScreenshot = async (toPostArray : any) => {

    let latelysocialUploadArray = [];

    const browser = await puppeteer.launch({
        args: ['--no-sandbox']
    });

    const tempFilePath = path.join(os.tmpdir(), 'out.png');

    for (let i = 0; i < toPostArray.length; i++){

        // var base64Data = base64Array[i].replace(/^data:image\/png;base64,/, "");

        console.log('about to write to out.png in iteration ' + i)
        try {
            // await fs.promises.writeFile(tempFilePath, base64Data, 'base64');
            await puppeteerScreenshotAndSaveFile(toPostArray, browser, i);
        }
        catch (e) {
            console.log(e);
            throw `Error writing to ${path.join(os.tmpdir(), 'out.png')}`;
        }
        
    
        console.log('about to create read stream');


        const readStream = fs.createReadStream(tempFilePath);
    
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
        try {
            const res = await axios(config);

            // push to array which we use to upload to insta
            latelysocialUploadArray.push(
                `https://dymwzetew9d5u.cloudfront.net/user182278/${res.data.link}`
            );
        }
        catch (err) {
            console.log(`Error uploading image #${i} to LatelySocial database`)
        }
    }

    // then delete out.png
    console.log(`now deleting ${tempFilePath}`)
    try {
        await fs.promises.unlink(tempFilePath, (err : Error) => {
            if (err) throw err;
            else console.log(`${tempFilePath} was deleted`);
        });
    }
    catch (e) {
        console.error(`error deleting ${tempFilePath}`)
        // console.error(e);
    }

    console.log('now closing brwoser')

    let pages = await browser.pages();
    await Promise.all(pages.map((page : any) =>page.close()));
    await browser.close();

    // console.log(latelysocialUploadArray);

    // then return the array
    return latelysocialUploadArray;
}

// @ts-ignore
const uploadToLatelySocialDatabase = async (base64Array : string[]) => {

    let latelysocialUploadArray = [];

    const tempFilePath = path.join(os.tmpdir(), 'out.png');

    for (let i = 0; i < base64Array.length; i++){

        var base64Data = base64Array[i].replace(/^data:image\/png;base64,/, "");

        console.log('about to write to out.png in iteration ' + i)
        try {
            await fs.promises.writeFile(tempFilePath, base64Data, 'base64');
        }
        catch (e) {
            console.error('error writing to out.png')
            // console.error(e);
        }
        
    
        console.log('about to create read stream');


        const readStream = fs.createReadStream(tempFilePath);
    
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
    console.log(`now deleting ${tempFilePath}`)
    try {
        await fs.promises.unlink(tempFilePath, (err : Error) => {
            if (err) throw err;
            else console.log(`${tempFilePath} was deleted`);
        });
    }
    catch (e) {
        console.error(`error deleting ${tempFilePath}`)
        console.error(e);
    }

    console.log(latelysocialUploadArray);

    // then return the array
    return latelysocialUploadArray;
}




export const onToPostCreate3 = functions.runWith({
    timeoutSeconds: 210,
    memory: '2GB'
}).database.ref(
    '/toPost/{toPostId}'
).onCreate((snapshot, context) => {
    // const postId = context.params.postId;
    // console.log(`new postId: ${postId}`);
    console.log(`onToPostCreate3 is getting executed`);

    // console.log(snapshot.val());


    if (snapshot.exists()){
        console.log('exists!');

        return snapshot.ref.parent!.once('value').then(async (datasnapshot) => {
            const numberOfChildren = datasnapshot.numChildren();
            console.log(numberOfChildren);

            console.log('before');
            // Object.keys(datasnapshot.val()).forEach(key => {
            //     console.log(datasnapshot.val()[key].content)
            // })

            

            if (numberOfChildren >= 10){

                console.log('about to remove 10!');

                console.log('starting entire upload process');
                try {

                    /** ORIGINAL FLOW */
                    // need to account for having more than 10 in queue
                    // var newArrayDataOfOjbect = Object.values(datasnapshot.val())
                    // const base64Array = await getBase64Array(newArrayDataOfOjbect);
                    // const caption = 'from functions from live web';
                    // const latelysocialUploadArray = await uploadToLatelySocialDatabase(base64Array);
                    // await makeLatelySocialPost(latelysocialUploadArray, caption);
                    /** ORIGINAL FLOW */

                     /** NEW FLOW */
                    // need to account for having more than 10 in queue
                    var newArrayDataOfOjbect = Object.values(datasnapshot.val())
                    // const base64Array = await getBase64Array(newArrayDataOfOjbect);
                    const caption = 'from functions from live web';
                    const latelysocialUploadArray = await uploadToLatelySocialDatabaseViaScreenshot(newArrayDataOfOjbect);
                    await makeLatelySocialPost(latelysocialUploadArray, caption);
                    /** NEW FLOW */

                    datasnapshot.ref.limitToFirst(10).ref.remove().then( () => {
                        console.log('remove successfulk')
                    }).catch( e => {
                        console.log('removed failed')
                        console.error(e);
                    })
                }
                catch (err) {
                    console.error('Problem during upload process')
                    console.error(err);
                }
            }
        });
    }

    return;
});