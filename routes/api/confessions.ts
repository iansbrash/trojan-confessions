"use strict";

import express from 'express';
const router = express.Router();
import cors from "cors";

import themes from './resources/themes';

// lets us use process.env variables
require('dotenv').config();

import funhash from './resources/hash';


const { OAuth2Client } = require('google-auth-library');

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase";

import {
    LocationArray,
    SchoolArray,
    GreekLifeArray,
    GraduationYearArray
} from './signatures';

import { GoogleAuth, GoogleAuthOptions } from 'google-auth-library';
import { nextTick } from 'node:process';
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"



router.use(cors());


// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
// const firebaseConfig = {
//     apiKey: "AIzaSyC1FKqaFxaK8EVE5L4qk-do6jveU1gnCek",
//     authDomain: "trojan-confessions-fb.firebaseapp.com",
//     projectId: "trojan-confessions-fb",
//     storageBucket: "trojan-confessions-fb.appspot.com",
//     messagingSenderId: "1028464703772",
//     appId: "1:1028464703772:web:648d7c2ee8c5d7b595e2d9",
//     measurementId: "G-KLEB16W0BE"
// };


// Getting all posts
router.get('/', (req, res) => {
    console.log('========================');
    console.log(`in GET(/api/confessions/)`);
    console.log('========================');

    const lastkey : any = req.headers.lastkey;
    const amount : any = req.headers.amount;

    const parsedAmount : number = parseInt(amount);

    /**
     * 
     * 
{
  "rules": {    
        "submissions": {
          ".read": "auth.uid != null",
          ".write": "auth.uid != null"
        },
        "toPost": {
          ".read": "auth.uid == 'cJO6p8OCdpQHVyWDQy1TuJoD1a83'",
          ".write": "auth.uid == 'cJO6p8OCdpQHVyWDQy1TuJoD1a83'"
        },
        "approved": {
          ".read": true,
          ".write": "auth.uid == 'cJO6p8OCdpQHVyWDQy1TuJoD1a83'"
        },
          "recentPosters": {
            ".read": true,
            ".write": true
          }
    }
}
     * 
     */

    

    let approvedRef = firebase.database().ref('approved');

    // if we're infinite scrolling
    if (lastkey || lastkey !== ''){
        console.log(`lastkey is provided: ${lastkey}`)
        //.startAfter(lastkey).limitToLast(20)
        approvedRef.orderByKey().endAt(lastkey).limitToLast(
            parsedAmount
        ).once('value', snapshot => {
            if (snapshot.exists()){
                console.log('snapshot exists in ConfFeed!');
    
                // if we have reached the end
                if (Object.keys(snapshot.val()).length < parsedAmount){
                    console.log('hasMore: settting to false')
                    res.set('hasMore', 'false');
                }
                else {
                    res.set('hasMore', 'true');
                }

                return res.status(200).send(snapshot.val());
            }
            else { 
                // null; 
                console.log('err')
                return res.status(404);
            }
        })
    }
    else {
        approvedRef.limitToLast(
            parsedAmount
        ).once('value', snapshot => {
            if (snapshot.exists()){
                console.log('snapshot exists in ConfFeed!');
    
                const toSet : any[] = Object.values(snapshot.val()).reverse();
    
    
                return res.status(200).send(snapshot.val());
            }
            else { 
                // null; 
                return res.status(404);
            }
        });
    }

    return;
});

// https://stackoverflow.com/questions/7449588/why-does-decodeuricomponent-lock-up-my-browser
// we send over encoded submission (cuz emojis) then decode it here and push to firebase
function decodeURIComponentSafe(s : string) {
    if (!s) {
        return s;
    }
    return decodeURIComponent(s.replace(/%(?![\da-f][\da-f]+)/gi, '%25'));
}

// Adding a new submission
router.post('/', async (req : express.Request, res : express.Response, next : express.NextFunction) => {
    const { 
        // timestamp, Probably don't want this 
        // -- we can calculate server-side instead
        hashedid,
        tags,
        // signature
        //auth ? JWT ?
        location,
        school,
        fraternity,
        year,
        dark,
    } = req.headers;

    const theme : string = req.headers.theme as string;
    const id_token : string = req.headers.id_token as string;
    const content : string = req.headers.content as string;

    console.log('========================');
    console.log(`in POST(/api/confessions/)`);
    console.log(`content: ${content}`);
    console.log(`decoded content: ${decodeURIComponentSafe(content)}`);
    console.log(`hashedid: ${hashedid}`);
    console.log('========================');

    let sanitizeError = '';

    // First we sanatize the parameters (make sure under 200 characters, valid signature, etc)
    if (content.length > 200) {
        return res.status(400).send("Content length is over 200")
    }

    // Validate location, school, fraternity, year, theme
    let mapArr : string[] = [location, school as string, fraternity as string, year as string, theme];
    let mapArr2 : string[] = ['location', 'school', 'fraternity', 'year', 'theme'];
    [
        LocationArray, SchoolArray, GreekLifeArray, GraduationYearArray, themes
    ].every((arr : string[], index : number) => {
        if (!arr.includes(mapArr[index]) && mapArr[index] !== '') {
            sanitizeError = `${mapArr2[index]} "${mapArr[index]}" is not valid`;
            return false;
        }
        return true;
    })

    if (sanitizeError !== '') return res.status(400).send(sanitizeError);

    mapArr = undefined;
    mapArr2 = undefined;

    // validate dark
    if (!['true', 'false'].includes(dark as string)) {
        return res.status(400).send("dark needs to be true or false");
    }

    // validate tags
    // tags are formatted in a single string like tag1,tag2,tag3
    if (tags as string !== ''){
        (tags as string).split(',').every(tag =>  {
            if (tag === '') {
                sanitizeError = "tags cannot be empty";
                return false;
            }
            else if (!tag.match(/^[a-z0-9]+$/i)){
                sanitizeError = "tags need to be non alphanumeric";
                return false;
            }
            
            return true;
        }) 
    }

    // check for tag errors
    if (sanitizeError !== '') return res.status(400).send(sanitizeError);

    // use set constructor to find duplicates
    if (new Set((tags as string).split(',')).size !== ((tags as string).split(',')).length ) {
        return res.status(400).send("tags cannot have duplicates")
    }

    const subRef = firebase.database().ref('submissions');

    // need to find way to hash emails for
    // security
    // and cuz we cant store total email
    // cuz the @ messes it up
    // use JWT to auth in request

// usc email
//"105157534195143583292"
//"105157534195143583292"
//"107309920700098275368"

// personal email

    // Firebase AUTH shit. Gonna leave it be for now
    // try { 
    //     await onSignIn(id_token);
    //     console.log('in try catch for awaiut onSignIn')
    // }
    // catch (err) {
    //     console.log(`onSignIn error`)
    //     return res.status(404).send("Error: Invalid Google id_token")

    // }

    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

    const client = new OAuth2Client(CLIENT_ID);

    let gPayload : any;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: CLIENT_ID,  
            // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();

        // console.log('payload')
        // console.log(payload)

        gPayload = payload;

        const userid = payload['sub'];
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
    }

    var isError = false;

    try {
        await verify();
    }
    catch (e) {
        isError = true;
        console.log('in catch: ' + isError)
    }

    if (isError) {
        console.log('Got an error, gonna sendStatus404')
        return res.status(400).send("invalid google session")
    };


    // const userName = Date.now();
    const hashedId = funhash(gPayload.sub) + gPayload.sub.substring(2, 6);
    const posterRef = firebase.database().ref('recentPosters');

    let toRetStatus : string;
    let toRetNumber : number;
    let snapExists = false;

    await posterRef.orderByChild("hashedId").equalTo(hashedId).once("value", snapshot => {
        console.log(`snapshot.exists(): ${snapshot.exists()}`)

        if (snapshot.exists() as Boolean){
            snapExists = true;
            const userData = snapshot.val();
            console.log("exists!", userData);

            toRetStatus = 'Rate Limited: Please Wait Between Submissions';
            toRetNumber = 429;
        }
    }); 

    if (snapExists){
        return res.status(toRetNumber).end(toRetStatus)
    }

    const newKey = subRef.push().key;
    const timestamp = new Date().toISOString();
    console.log(`hashedId: ${hashedId}`)
    subRef.child(newKey).set({
        content: decodeURIComponentSafe(content),
        timestamp: timestamp,

        // to change
        // hashedId : userName,
        hashedId: hashedid,
        tags: tags,
        theme: theme,
        signature: {
            location,
            school,
            fraternity,
            year
        },
        key: newKey,
        dark: dark
    });

    posterRef.push().set({

        // to change
        hashedId: hashedId,
        timestamp: timestamp
    });

    toRetStatus = 'Successfully submitted content';
    toRetNumber = 200;

    // console.log('about to send 200')
    // return res.status(200).end('Successfully submitted content')
    // next();

    return res.status(toRetNumber).end(toRetStatus)

});

async function onSignIn(id_token : any) {
    console.log(`in onSignIn`);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(async (firebaseUser) => {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!isUserEqual(id_token, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
            var credential = firebase.auth.GoogleAuthProvider.credential(id_token);

            // Sign in with credential from the Google user.
            try {
                await firebase.auth().signInWithCredential(credential)
                console.log('after awauit in onSignIn')
            }
            catch (error) {
                console.log('error');
                console.log(error);
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var cred = error.credential;
                // ...
            }
            
        } else {
            console.log('User already signed-in Firebase.');
        }
    });
}

async function isUserEqual(id_token : string, firebaseUser : any) {
    if (firebaseUser) {
        var providerData = await firebaseUser.providerData;
        for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === id_token ) {
            // We don't need to reauth the Firebase connection.
            return true;
        }
        }
    }
    return false;
}

export default router;