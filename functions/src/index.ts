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




// export const onToPostCreate = functions.database.ref(
//     '/toPost'
// ).onCreate((snapshot, context) => {
//     // const postId = context.params.postId;
//     // console.log(`new postId: ${postId}`);
//     console.log('shit is getting trigged 1');
//     return snapshot.ref.update({test: 'xddd'})

//     // const data = snapshot.val();


// });

// export const onToPostCreate2 = functions.database.ref(
//     '/toPost/'
// ).onCreate((snapshot, context) => {
//     // const postId = context.params.postId;
//     // console.log(`new postId: ${postId}`);
//     console.log('shit is getting trigged 2');
//     return snapshot.ref.update({test: 'xddd'})

//     // const data = snapshot.val();


// });


// was triggered
export const onToPostCreate3 = functions.database.ref(
    '/toPost/{toPostId}'
).onCreate((snapshot, context) => {
    // const postId = context.params.postId;
    // console.log(`new postId: ${postId}`);
    console.log('shit is getting trigged 3');

    console.log(snapshot.val());


    if (snapshot.exists()){
        console.log('exists!');

        return snapshot.ref.parent!.once('value').then((datasnapshot) => {
            const numberOfChildren = datasnapshot.numChildren();
            console.log(numberOfChildren);

            if (numberOfChildren >= 10){
                console.log('about to remove 10!');
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
    
    // if (snapshot.exists()){
    //     console.log(snapshot);
    //     console.log(`Number: ${snapshot.getRef().getParent()}`)

    // }
    

    // return snapshot.ref.update({test: 'xddd'})


    // const data = snapshot.val();

    // return event.data.ref.parent.once("value", (snapshot) => {
    //     const count = snapshot.numChildren();
    //     return event.data.ref.update({ count });
    //   });


});


// was triggered
// export const onToPostCreate4 = functions.database.ref(
//     '/toPost/{toPostId}'
// ).onCreate((snapshot, context) => {
//     // const postId = context.params.postId;
//     // console.log(`new postId: ${postId}`);
//     console.log('shit is getting trigged 4');
//     return snapshot.ref.update({test: 'xddd'})

//     // const data = snapshot.val();


// });


// was triggered
// export const onToPostCreate5 = functions.database.ref(
//     '/toPost/{toPostId}/'
// ).onCreate((snapshot, context) => {
//     // const postId = context.params.postId;
//     // console.log(`new postId: ${postId}`);
//     console.log('shit is getting trigged 5');

//     // const data = snapshot.val();
//     return snapshot.ref.update({test: 'xddd'})



// });

// export const onToPostCreate6 = functions.database.ref(
//     '/'
// ).onCreate((snapshot, context) => {
//     // const postId = context.params.postId;
//     // console.log(`new postId: ${postId}`);
//     console.log('shit is getting trigged 6');

//     return snapshot.ref.update({test: 'xddd'})

//     // const data = snapshot.val();


// });



// exports.app = functions.https.onRequest(app);



// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
