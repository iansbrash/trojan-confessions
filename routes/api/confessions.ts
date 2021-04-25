"use strict";

import express from 'express';
const router = express.Router();
import cors from "cors";

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// router.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

router.use(cors());


// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
    apiKey: "AIzaSyC1FKqaFxaK8EVE5L4qk-do6jveU1gnCek",
    authDomain: "trojan-confessions-fb.firebaseapp.com",
    projectId: "trojan-confessions-fb",
    storageBucket: "trojan-confessions-fb.appspot.com",
    messagingSenderId: "1028464703772",
    appId: "1:1028464703772:web:648d7c2ee8c5d7b595e2d9",
    measurementId: "G-KLEB16W0BE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Getting all posts
router.get('/', (req, res) => {
    // Post.find().then(posts => {
    //     res.json(posts);
    // })
})

// Adding a new submission
router.post('/', (req, res) => {

    const { 
        submission,
        hashedId,
        //auth ? JWT ?
    } = req.headers

    console.log(`Submission: ${submission}, hashedId: ${hashedId}`)

    console.log('wgot asd')

    const subRef = firebase.database().ref('submissions');
    const posterRef = firebase.database().ref('recentPosters');


    // need to find way to hash emails for
    // security
    // and cuz we cant store total email
    // cuz the @ messes it up


    // res.set('Access-Control-Allow-Origin', '*');

    const userName = Date.now();


    posterRef.orderByChild("hashedId").equalTo(userName).once("value",snapshot => {
        if (snapshot.exists()){
            const userData = snapshot.val();
            console.log("exists!", userData);

            // 400 rate limit
            res.statusCode = 429;
            res.send('Rate Limited: Please Wait Between Submissions');
        }
        else {
            subRef.push().set({
                submission,
                timestamp: new Date().toISOString(),

                // to change
                hashedId : userName
            });

            posterRef.push().set({

                // to change
                hashedId: userName
            });

            res.statusCode = 200;
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