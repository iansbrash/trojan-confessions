"use strict";

import express from 'express';
const router = express.Router();
import cors from "cors";
import jwt from 'jsonwebtoken';


import axios from 'axios';

// lets us use process.env variables
require('dotenv').config();

const { OAuth2Client } = require('google-auth-library');

router.use(cors());

const generateAccessToken = (username : string) => {
    return jwt.sign({id: username}, process.env.TOKEN_SECRET, { expiresIn: '1h' });
}

router.post('/', async (req, res) => {

    console.log('in post');

    const {
        id_token
    } = req.headers;

    // first get info of token
    const tokeninfo : any = await axios(
        {
            method: 'post',
            url: `https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`,
        }
    );

    const tokenEmail = tokeninfo.data.email;

    console.log(`tokenEmail: ${tokenEmail}`);

    // make sure email matches first
    if (tokenEmail != 'brash@usc.edu'){
        return res.status(404);
    }

    // verify token's authenticity
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

    try {
        await verify();
    }
    catch (e) {
        return res.send(404);
    }

    // now we know we're clear to generate a JWT
    const authToken = generateAccessToken(tokenEmail);

    

    return res.status(200).send(authToken);
})


router.post('/auth/', (req, res) => {
    const {
        jwt_token
    } = req.headers;

    console.log(`in /auth/, jwt_token: ${jwt_token}`);
    console.log(`typeof jwt_token: ${typeof jwt_token}`)

    if (jwt_token == null) return res.sendStatus(401)

    jwt.verify(jwt_token as string, process.env.TOKEN_SECRET, (err: any, user: any) => {
        
        console.log(err)

        if (err) return res.sendStatus(403)

        // req.user = user
    })

    return res.sendStatus(200);
})




export default router;
