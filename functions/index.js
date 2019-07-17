/**
 * @file This file contains the google cloud functions.
 * BADGR docs: https://api.badgr.io/docs/v2/
 */


const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const nodemailer = require('nodemailer');

admin.initializeApp();

/**
 * Creates the URL for the BADGR API
 * @param {string} path 
 */
function BADGR_PATH(path) {
    let base = "https://api.badgr.io";
    if (path === "o/token")
        return base + '/' + path;
    return base + "/v2/" + path;
}

/**
 * Gets the header from the firestore and return it
 */
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

/**
 * Refreshes the BADGR API access token
 */
exports.refreshToken = functions.https.onCall(async () => {
    let document = admin.firestore().collection('BadgrAuth').doc('auth');
    try {
        console.log("Trying to refresh access token");
        const fireDoc = await document.get();
        let docData = fireDoc.data();
        let refreshToken = docData.refreshToken;
        let url = BADGR_PATH('o/token');
        let data = "grant_type=refresh_token&refresh_token=" + refreshToken.toString();

        console.log("Posting", data, "to", url);

        let res = await axios.post(url, data);
        console.log("Got data from badgr", res.data);
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
            console.log("Successfully updated access token to", newData.accessToken, "result:", res);
            return newData.accessToken;
        })
            .catch(err => {
                throw err;
            });

    } catch (err) {
        return console.error(err);
    }

    return true;
});



/**
 * Creates an issuer on the linked Badgr account.
 * @param {Object} data required data for this function:
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
        switch (err.response.status) {
            case 401:
                throw new functions.https.HttpsError("permission-denied", "Access token expired, try refreshing it");
            default:
                console.error("An error happened :'(", err);
                throw new functions.https.HttpsError("aborted", "an error occurred while trying to add new issuer...", err)
        }
    });
});

/**
 * Creates a badge class on the linked Badgr account.
 * @param {Object} data Badge class required data:
 *  1. issuerID: BADGR ID of the issuer
 *  2. badgeData: data that describes the badge class
 */
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
        switch (err.response.status) {
            case 401:
                throw new functions.https.HttpsError("permission-denied", "Access token expired, try refreshing it");
            default:
                console.error("An error happened :'(", err);
                throw new functions.https.HttpsError("aborted", "an error occurred while trying to add new badgeclass...", err)
        }
    });
});

/**
 * Creates an assertion on the linked Badgr account.
 * @param {Object} data Assertion required data:
 *  1. badgeID: Badgr ID of the badge
 *  2. assertionData: data used to create a valid badge class
 */
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
        switch (err.response.status) {
            case 401:
                throw new functions.https.HttpsError("permission-denied", "Access token expired, try refreshing it");
            default:
                console.error("An error happened :'(", err);
                throw new functions.https.HttpsError("aborted", "an error occurred while trying to add new assertion...", err)
        }
    });
});



// EMAIL FUNCTIONALITY


/**
 * Create a transporter to send the email
 */
let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: functions.config().mailer.email,
        pass: functions.config().mailer.pass
    }
});



exports.notifyIssuer = functions.https.onCall((data) => {

    let opportunityTitle = data.opportunityTitle;
    let participantName = data.participantName;
    let issuerEmail = data.issuerEmail;
    let participantEmail = data.participantEmail;

    let subject = 'Inschrijving voor leerkans: ' + opportunityTitle;
    let html = '<p>Dag partner van Gentlestudent,</p>' +
        '<p>Er heeft zich zopas iemand ingeschreven voor de leerkans: "' + opportunityTitle + '"</p>' +
        '<p>De gegevens van deze persoon zijn: </p>' +
        '<p> - Naam: ' + participantName + '</p>' +
        '<p> - E-mailadres: ' + participantEmail + '</p>' +
        '<p>Met vriendelijke groet,</p>' +
        '<p>Team Gentlestudent</p>';


    let mailOptions = {
        from: "Gentlestudent <" + functions.config().mailer.email + ">",
        to: "freek.de.sagher21@gmail.com", // TODO swap out
        subject: subject,
        text: "",
        html: html
    }

    return sendNotifyIssuerEmail(mailOptions)
});


async function sendNotifyIssuerEmail(mailOptions) {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        }
        console.log("Message sent!", info);
    })
}