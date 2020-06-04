const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  secure: false,
  port: 587,
  tls: {
    ciphers: 'SSLv3'
  },
  auth: {
    user: functions.config().mailer.email,
    pass: functions.config().mailer.pass
  }
});

const sendMail = (mailOptions) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    }
    console.log('Message sent!', info);
  });
};
