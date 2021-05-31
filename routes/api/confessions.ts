"use strict";

import express from 'express';
const router = express.Router();
import cors from "cors";

// lets us use process.env variables
require('dotenv').config();


const { OAuth2Client } = require('google-auth-library');

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase";
import { GoogleAuth, GoogleAuthOptions } from 'google-auth-library';
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

    let approvedRef = firebase.database().ref('approved');

    // if we're infinite scrolling
    if (lastkey || lastkey !== ''){
        console.log(`lastkey is provided: ${lastkey}`)
        approvedRef.orderByChild('timestamp').startAt(lastkey).limitToFirst(20).once('value', snapshot => {
            if (snapshot.exists()){
                console.log('snapshot exists in ConfFeed!');
    
                const toSet : any[] = Object.values(snapshot.val()).reverse();
    
                let toRet = {};

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
        approvedRef.limitToLast(20).once('value', snapshot => {
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

// Adding a new submission
router.post('/', async (req, res) => {
    const { 
        content,
        // timestamp, Probably don't want this 
        // -- we can calculate server-side instead
        hashedid,
        tags,
        theme,
        // signature
        //auth ? JWT ?
        location,
        school,
        fraternity,
        year
    } = req.headers

    const id_token = req.headers.id_token;

    // console.log(signature);

    // how are we going to make sure this POST request
    // is from a USC email ?

    console.log('========================');
    console.log(`in POST(/api/confessions/)`);
    console.log(`content: ${content}`);
    console.log(`hashedid: ${hashedid}`);
    // console.log(`id_token: ${id_token}`);
    console.log('========================');

    const subRef = firebase.database().ref('submissions');
    const posterRef = firebase.database().ref('recentPosters');

    // need to find way to hash emails for
    // security
    // and cuz we cant store total email
    // cuz the @ messes it up
    // use JWT to auth in request
    try { 
        await onSignIn(id_token);
        console.log('in try catch for awaiut onSignIn')
    }
    catch (err) {
        console.log(`onSignIn error`)
        return res.status(404).send("Error: Invalid Google id_token")

    }

    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

    const client = new OAuth2Client(CLIENT_ID);

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: CLIENT_ID,  
            // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
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
        return res.sendStatus(404)
    };


    const userName = Date.now();

    posterRef.orderByChild("hashedId").equalTo(userName).once("value",snapshot => {
        if (snapshot.exists()){
            const userData = snapshot.val();
            console.log("exists!", userData);

            // 400 rate limit
            res.statusCode = 429;
            return res.send('Rate Limited: Please Wait Between Submissions');
        }
        else {

            const hashedId = new Date().toISOString();

            const newKey = subRef.push().key;

            
            subRef.child(newKey).set({
                content: content,
                timestamp: new Date().toISOString(),

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
                key: newKey
            });

            posterRef.push().set({

                // to change
                hashedId: hashedId
            });

            return res.status(200).send('post yes')
        }
    }); 
    

    return res.status(200);
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