const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


// exports.functionTest = functions.https.onCall(async (data, context) => {
//     console.log("Trying to read data from firebase");
//     try {
//         const res = await admin.firestore().collection('BadgrAuth').doc('auth').get();
//         console.log("data: ", res.data());
//         let data = res.data();
//         console.log("Access token: ", data.accessToken);
//         return {
//             token: data.accessToken
//         };
//     }
//     catch (err) {
//         return console.log("Error happend :'(", err);
//     }
// });

function BADGR_PATH(path, ...extraPaths) {
    const base = "https://api.badgr.io";
    if (path === "o/token" || (path === 'o' && extraPaths[0] === 'token'))
        return base + "/o/token";
    for (let i = 0; i < extraPaths.length; i++) {
        base.append('/').append(extraPaths[i].toString());
    }
    return base
}

async function fetchAccessToken() {
    try {
        const res = await admin.firestore().collection('BadgrAuth').doc('auth').get();
        let data = res.data();
        return data.access_token;
    }
    catch (err) {
        return console.error(err);
    }
}

async function refreshToken() {
    let document = admin.firestore().collection('BadgrAuth').doc('auth');
    try {
        console.log("Trying to refresh access token");
        const fireDoc = document.get();
        let docData = fireDoc.data();
        let refreshToken = docData.refreshToken;
        let url = BADGR_PATH('o', 'token');
        let data = "grant_type=refresh_token&refresh_token=" + refreshToken.toString();

        let res = await axios.post(url, data);
        let newData = {
            accessToken: res.data.access_token,
            refreshToken: res.data.refresh_token
        }

        document.update(
            {
                accessToken: newData.accessToken,
                refreshToken: newData.refreshToken
            }
        ).then(res => {
            console.log("Successfully updated access token");
            return;
        })
        .catch(err => {
            throw err;
        });

    } catch (err) {
        return console.error(err);
    }
}

exports.functionTest = functions.https.onCall(async (data, context) => {
    try {
        let test = "username=freek.de.sagher21@gmail.com&password=summerofcode2019";
        console.log("fetching tokens");
        const res = await axios.post("https://api.badgr.io/" + 'o/token', test);
        console.log("Token time!", res.data);
        return {
            accessToken: res.data.access_token,
            expiration: res.data.expires_in,
            refreshToken: res.data.refresh_token
        };
    }
    catch (err) {
        return console.log("Error happened :'(", err);
    }

});

exports.createIssuer = functions.https.onCall(async (data) => {
    let url = BADGR_PATH("issuers");
    console.log("Trying to post data to ", url);
});


exports.createBadgeClass = functions.https.onCall(async (data) => {
    let entityID = data.entityID;
    let url = BADGR_PATH("issuers", entityID, "badgeclasses");
    console.log("Trying to post data to ", url);
});

exports.createAssertion = functions.https.onCall(async (data) => {
    let entityID = data.entityID;
    let url = BADGR_PATH("issuers", entityID, "assertions");
    console.log("trying to post data to ", url);
});