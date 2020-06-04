const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const FROM_ADDRESS = functions.config().mailer.email;

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

const sendEmailVerification = (to, verificationLink) => {
  const content = `
    <h2>Welkom!</h2>

    <p>Om aan de slag te gaan, gelieve jouw account te activeren via deze link:</p>
    <a href="${verificationLink}">${verificationLink}</a>

    Als jij niet hebt gevraagd om dit adres te verifiëren, mag je deze mail negeren.

    Met vriendelijke groet
    Team Gentlestudent
  `;

  const mailOptions = {
    from: `Gentlestudent <${FROM_ADDRESS}>`,
    to,
    subject: 'Verifieer jouw Gentlestudent account',
    html: content
  };
  sendMail(mailOptions);
};

const sendPasswordResetEmail = () => {};

const sendEmailChangeConfirmation = () => {};

module.exports = {
  sendEmailVerification,
  sendPasswordResetEmail,
  sendEmailChangeConfirmation
};
