'use strict';

import * as functions from "firebase-functions";
import * as express from 'express';

const app = express();

app.get('/', (req, res) => res.status(200).send('Hey there!'));

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
 * 
 * 
 * 
 * 
 * 
 */






exports.app = functions.https.onRequest(app);



// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
