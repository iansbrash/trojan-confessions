import express from "express";
// import cors from "cors";

import confessions from './routes/api/confessions';
import preview from './routes/api/preview';
import admin from './routes/api/admin';
import firebase from "firebase";
import path from 'path';

// app
const app = express();

// body parser
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); 


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

// // Add headers
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
 
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     // res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

// cross origin resources sharing
// enable in prod, can't use rn because localhost:3000/5000
// app.use(cors());

// router
app.use('/api/confessions', confessions);

// router 2
app.use('/api/preview', preview);

// router 3
app.use('/api/admin', admin);

if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));
}

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})



// was 3000
// const port = 5000;
const PORT = process.env.PORT || 5000;


// app.get("/", (req, res) => {
//     res.send("Hello world Fuck thjis!");
// });

// app.get("/api/", (req, res) => {
//     res.send("Hello world!");
// });

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});