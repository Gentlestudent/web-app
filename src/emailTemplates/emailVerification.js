const subject = 'Verifieer jouw Gentlestudent account';

function htmlBody(data) {
  return `
    <p>Hallo ${data.displayName},</p>

    <p>Om aan de slag te gaan, gelieve jouw account te activeren via deze link:<br>
    <a href="${data.verificationLink}">${data.verificationLink}</a></p>

    <p>Als jij niet hebt gevraagd om dit adres te verifiëren, mag je deze mail negeren.</p>

    <p>Met vriendelijke groet,</p>

    <p>Team Gentlestudent</p>
  `;
}

function textBody(data) {
  return `
    Hallo ${data.displayName},

    Om aan de slag te gaan, gelieve jouw account te activeren via deze link: ${data.verificationLink}

    Als jij niet hebt gevraagd om dit adres te verifiëren, mag je deze mail negeren.

    Met vriendelijke groet,

    Team Gentlestudent
  `;
}

export {
  subject,
  htmlBody,
  textBody
};
