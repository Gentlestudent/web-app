const functions = require('firebase-functions');
import axios from 'axios'


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.functionTest = functions.https.onCall((data, context) => {
    console.log("Called functionTest");
    return {
        text: "Testing cloud functions"
    }
});