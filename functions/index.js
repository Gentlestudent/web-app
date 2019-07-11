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

function BADGR_PATH(path) {
    let base = "https://api.badgr.io";
    if (path === "o/token")
        return base + path;
    return base + "/v2/" + path;
}

async function getHeader() {
    try {
        const res = await admin.firestore().collection('BadgrAuth').doc('auth').get();
        let data = res.data();
        return {
            header: { headers: { Authorization: "Bearer " + data.accessToken } }
        }
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
        let data = "grant_type=refresh_token&²refresh_token=" + refreshToken.toString();

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
            return newData.accessToken;
        })
            .catch(err => {
                throw err;
            });

    } catch (err) {
        return console.error(err);
    }

    return true;
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
    let issuerData = data.issuerData;

    if (issuerData === null || issuerData === undefined)
        throw new functions.https.HttpsError("invalid-argument", "createIssuer function requires issuer data as argument");

    if (issuerData.url === undefined || issuerData.url === null || issuerData.url === "")
        throw new functions.https.HttpsError("invalid-argument", "createIssuer function requires valid issuer url")

    if (issuerData.name === undefined || issuerData.name === null || issuerData === "")
        throw new functions.https.HttpsError("invalid-argument", "createIssuer function requires valid issuer name");

    return getHeader().then(async (res) => {
        let header = res.header;
        console.log("Fetched header", header);
        console.log("Posting", issuerData, "to", url);
        const res2 = await axios.post(url, issuerData, header);

        switch (res2.status) {
            case 201:
                console.log("Created issuer API response:", res2);
                console.log("Data?", res2.data);
                return {
                    status: res2.status,
                    message: res2.message,
                    createdIssuer: res2.data.result[0]
                }
            case 400:
                throw new functions.https.HttpsError("invalid-argument", "Badgr could not validate the issuer");
            case 403:
                throw new functions.https.HttpsError("permission-denied", "Access token expired, try refreshing it");
            default:
                throw new functions.https.HttpsError("unknown", "Failed to create badgr issuer");
        }
    }).catch(err => {
        console.error("An error happened :'(", err);
        throw new functions.https.HttpsError("aborted", "an error occurred while trying to add new issuer...", err);
    });
});


exports.createBadgeClass = functions.https.onCall(async (data) => {
    let entityID = data.entityID;
    let url = BADGR_PATH("issuers/" + entityID + "/badgeclasses");
    console.log("Trying to post data to ", url);
});

exports.createAssertion = functions.https.onCall(async (data) => {
    let entityID = data.entityID;
    let url = BADGR_PATH("issuers/" + entityID + "/assertions");
    console.log("trying to post data to ", url);
});