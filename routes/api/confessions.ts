"use strict";

import express from 'express';
const router = express.Router();
import cors from "cors";

// lets us use process.env variables
require('dotenv').config();


const { OAuth2Client } = require('google-auth-library');

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

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

const firebaseConfig = {
    apiKey: "AIzaSyCYfLfdevWj0KH2M7uGObIZN2vqh-5S5qE",
    authDomain: "trojan-confessions-449cf.firebaseapp.com",
    databaseURL: "https://trojan-confessions-449cf-default-rtdb.firebaseio.com",
    projectId: "trojan-confessions-449cf",
    storageBucket: "trojan-confessions-449cf.appspot.com",
    messagingSenderId: "348759087285",
    appId: "1:348759087285:web:74630ddb7287bf65e9c6fc",
    measurementId: "G-LYKT725YKZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Getting all posts
router.get('/', (req, res) => {
    console.log('========================');
    console.log(`in GET(/api/confessions/)`);
    console.log('========================');

    let recentPostsRef = firebase.database().ref('submissions');

    recentPostsRef.limitToLast(10).once('value', snapshot => {
        if (snapshot.exists()){
            console.log('snapshot exists in ConfFeed!');

            const toSet : any[] = Object.values(snapshot.val()).reverse();

            return res.send(toSet);
        }
        else { 
            // null; 
            return res.status(404);
        }
    });
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

    console.log(`Beforea: ${isError}`)
    if (isError) {
        console.log('Got an error, gonna sendStatus404')
        return res.sendStatus(404)
    };

    console.log(`After: ${isError}`)

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

            subRef.push().set({
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
                }
            });

            posterRef.push().set({

                // to change
                hashedId: hashedId
            });

            return res.statusCode = 200;
        }
    }); 
});

// Update a post
router.post('/:_id', (req, res) => {

    // const filter = { _id: req.params._id }
    // const { title, content, author } = req.body;
    // const update = { title, content, author }

    // Post.findOneAndUpdate( 
    //     filter,
    //     update,
    //     (doc) => {
    //         res.json(doc);
    //     }
    // )
});

// Delete a post
router.delete('/:_id', (req, res) => {
    // Post.findByIdAndDelete( { _id: req.params._id },
    //     (err, docs) => {
    //         if (err) console.log(err)
    //         else console.log("deleted : ", docs, req.params._id)
    //     });
    // res.json({_id: req.params._id})
});

export default router;