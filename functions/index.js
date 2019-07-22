/**
 * @file This file contains the google cloud functions.
 * BADGR docs: https://api.badgr.io/docs/v2/
 */

 

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const nodemailer = require('nodemailer');

admin.initializeApp();

// BADGR FUNCTIONALITY

/**
 * Creates the URL for the BADGR API
 * @param {string} path path extension
 * @returns full badgr URL
 */
function BADGR_PATH(path) {
    let base = "https://api.badgr.io";
    if (path === "o/token")
        return base + '/' + path;
    return base + "/v2/" + path;
}

/**
 * Fetch access token and creates header
 * @returns json object containing the Authorization header
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
        user: functions.config().mailer.email,  // Cloud variable
        pass: functions.config().mailer.pass    // Cloud variable
    }
});

/**
 * Sends email to issuer when participant subscribes to learning opportunity
 * @param {Object} data Input data for the email
 * Data needs:
 *  1. opportunityTitle: title of the opportunity
 *  2. participantName: name of the participant
 *  3. issuerEmail: email address of the issuer
 *  4. participantEmail: email address of the participant
 */
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

    return sendEmail(mailOptions)
});

/**
 * Sends email when someone subscribes to his quest
 * @param {Object} data Input data for the email
 * Data needs:
 *  1. takerName: name of the quest taker
 *  2. giverEmail: email of the quest giver
 *  3. questTitle: title of the quest
 *  4. giverName: name of the quest giver
 *  5. questId: ID of the quest
 */
exports.notifyQuestGiver = functions.https.onCall(data => {
    let takerName = data.takerName;
    let giverEmail = data.giverEmail;
    let questTitle = data.questTitle;
    let giverName = data.giverName;
    let questId = data.questId;

    let subject = "[QUEST] " + takerName + " kan je helpen";

    let html = "<p>Beste " + giverName + ", </p> <p>" + takerName + " kan je helpen met de quest '" + questTitle +
        "'.<br>Bekijk dit via de app of via de <a href=\"gentlestudent.gent/quests/" + questId + "\">webpagina</a>." +
        "<p>Met vriendelijke groet,</p>" +
        "<p>Team Gentlestudent</p>"

    let mailOptions = {
        from: "Gentlestudent <" + functions.config().mailer.email + ">",
        to: "freek.de.sagher21@gmail.com", // TODO swap out
        subject: subject,
        text: "",
        html: html
    }

    return sendMyMail(mailOptions);
});

/**
 * Sends email when quest taker is chosen by quest giver.
 * @param {Object}data Input data for the email
 * Data needs:
 *  1. giverName: name of the quest giver
 *  2. giverEmail: email of the quest giver
 *  3. takerName: name of the quest taker
 *  4. takerEmail: email of the quest taker
 *  5. questTitle: title of the quest 
 *  6. questId: id of the quest
 */
exports.notifyQuestTaker = functions.https.onCall(data => {
    let giverName = data.giverName;
    let giverEmail = data.giverEmail;
    let takerName = data.takerName;
    let takerEmail = data.takerEmail;
    let questTitle = data.questTitle;
    let questId = data.questId;

    let subject = "[QUEST] " + giverName + " heeft jou gekozen";

    let html = "<p>Beste " + takerName + ",</p>" +
        "<p>" + giverName + " heeft jou gekozen om hem/haar te helpen bij '" + questTitle + "'.</p>" +
        "<p>Neem contact op met hem/haar via " + giverEmail + ", breng de quest tot een goed einde</p>" +
        "<p>en verdien zo jouw token!</p><br>"
    "<p>Met vriendelijke groet,</p>" +
        "<p>Team Gentlestudent</p>";

    let mailOptions = {
        from: "Gentlestudent <" + functions.config().mailer.email + ">",
        to: "freek.de.sagher21@gmail.com", // TODO swap out
        subject: subject,
        text: "",
        html: html
    }

    return sendMyMail(mailOptions);
});

/**
 * Sends email when quest taker receives his token.
 * @param {Object} data Input data.
 * Data needs:
 *  1. giverName: name of the quest giver
 *  2. takerName: name of the quest taker
 *  3. takerEmail: email address of quest taker
 *  4. questTitle: title of the quest
 */
exports.notifyTokenReceived = functions.https.onCall(data => {
    let giverName = data.giverName;
    let takerName = data.takerName;
    let takerEmail = data.takerEmail;
    let questTitle = data.questTitle;

    let subject = "[QUEST] Token verdiend!";
    let html = "<p>Beste " + takerName + ",</p>" +
        "<p>Proficiat, je hebt succesvol de token behaald voor de quest '" + questTitle + "' van " + giverName + ".</p>" +
        "<p>Je kan deze bekijken in de mobiele applicatie. </p>" +
        "<br><p>Met vriendelijke groet,</p>"
        + "<p>Team Gentlestudent</p>";

    let mailOptions = {
        from: "Gentlestudent <" + functions.config().mailer.email + ">",
        to: "freek.de.sagher21@gmail.com", // TODO swap out
        subject: subject,
        text: "",
        html: html
    }

    return sendMyMail(mailOptions);
});

/**
 * Sends the actual email
 * @param {Object} mailOptions email options
 */
async function sendMyMail(mailOptions) {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        }
        console.log("Message sent!", info);
    })
}


