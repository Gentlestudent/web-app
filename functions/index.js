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

/**
 * Creates an issuer on the linked Badgr account.
 * @param data required data for this function:
 *  1. issuerData:
 *      1. url: url of the issuer (required)
 *      2. name: name of the issuer (required)
 *      3. email: verified badgr email address (required)
 *      4. description: description of the issuer (optional)
 * @returns Promise containing:
 *  1. status: the status of the request to badgr
 *  2. message: a descriptive message of what happened
 *  3. createdIssuer: data of the created issuer
 */
exports.createIssuer = functions.https.onCall(async (data) => {
    let url = BADGR_PATH("issuers");
    let issuerData = data.issuerData;

    if (issuerData === null || issuerData === undefined)
        throw new functions.https.HttpsError("invalid-argument", "createIssuer function requires issuer data as argument");

    if (issuerData.url === undefined || issuerData.url === null || issuerData.url === "")
        throw new functions.https.HttpsError("invalid-argument", "createIssuer function requires valid issuer url")

    if (issuerData.name === undefined || issuerData.name === null || issuerData.name === "")
        throw new functions.https.HttpsError("invalid-argument", "createIssuer function requires valid issuer name");

    if (issuerData.email === undefined || issuerData.email === null || issuerData.email === "")
        throw new functions.https.HttpsError("invalid-argument", "createIssuer function requires verified email address");

    return getHeader().then(async (res) => {
        let header = res.header;
        console.log("Fetched header", header);
        console.log("Posting", issuerData, "to", url);
        const res2 = await axios.post(url, issuerData, header);

        switch (res2.status) {
            case 201:
                console.log("Created issuer\nAPI response:", res2);
                return {
                    status: res2.status,
                    message: "Created Badgr Issuer!!",
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
    console.log("Got data", data);
    let issuerID = data.issuerID;
    let badgeData = data.badgeData;
    let url = BADGR_PATH("badgeclasses");

    if (issuerID === null || issuerID === undefined)
        throw new functions.https.HttpsError("invalid-argument", "createBadgeClass needs issuerID as argument");
    if (badgeData === null || badgeData === undefined)
        throw new functions.https.HttpsError("invalid-argument", "createBadgeClass needs badgeData as argument");

    return getHeader().then(async (res) => {
        let header = res.header;
        console.log("Fetched header", header);
        console.log("Posting", badgeData, "to", url);
        const res2 = await axios.post(url, badgeData, header);

        switch (res2.status) {
            case 201:
                console.log("Created badgeclass\nAPI response:", res2);
                return {
                    status: res2.status,
                    message: "Created badge class!!",
                    createdBadgeClass: res2.data.result[0]
                };
            case 400:
                throw new functions.https.HttpsError("invalid-argument", "Badgr could not validate the badge class");
            case 403:
                throw new functions.https.HttpsError("permission-denied", "Access token expired, try refreshing it");
            default:
                throw new functions.https.HttpsError("unknown", "Failed to create badge class");
        }
    }).catch(err => {
        console.error("An error occurred :'(", err);
        throw new functions.https.HttpsError("aborted", "An error occured while trying to add new badge class...", err);
    });
});

exports.createAssertion = functions.https.onCall(async (data) => {
    console.log("Got data", data);

    let badgeID = data.badgeID;
    let assertionData = data.assertionData;
    let url = BADGR_PATH("badgeclasses/" + badgeID + "/assertions");

    return getHeader().then(async (res) => {
        let header = res.header;
        console.log("Fetched header", header);
        console.log("Posting", assertionData, "to", url);
        const res2 = await axios.post(url, assertionData, header);

        switch (res2.status) {
            case 201:
                console.log("Created assertion\nAPI response:", res2);
                return {
                    status: res2.status,
                    message: "Created assertion!!",
                    createdAssertion: res2.data.result[0]
                };
            case 400:
                throw new functions.https.HttpsError("invalid-argument", "Badgr could not validate the assertion");
            case 403:
                throw new functions.https.HttpsError("permission-denied", "Access token expired, try refreshing it");
            default:
                throw new functions.https.HttpsError("unknown", "Failed to create assertion");
        }
    }).catch(err => {
        console.error("An error occurred :'(", err);
        throw new functions.https.HttpsError("aborted", "An error occured while trying to add new assertion" + err.toString());
    });
});