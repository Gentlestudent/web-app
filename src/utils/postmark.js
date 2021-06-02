const getPostmarkClient = (() => {
  let client;

  return async () => {
    if (!client) {
      const postmark = await import('postmark'); // can't import it at the top of the file for some reason, or maybe I'm just stupid
      client = new postmark.ServerClient(process.env.POSTMARK_TOKEN);
    }
    return client;
  };
})();

async function sendEmailVerification({ to, displayName, verificationLink }) {
  const client = await getPostmarkClient();

  const HtmlBody = `
    <p>Hallo ${displayName},</p>

    <p>Om aan de slag te gaan, gelieve jouw account te activeren via deze link:<br>
    <a href="${verificationLink}">${verificationLink}</a></p>

    <p>Als jij niet hebt gevraagd om dit adres te verifiëren, mag je deze mail negeren.</p>

    <p>Met vriendelijke groet,</p>

    <p>Team Gentlestudent</p>
  `;

  const TextBody = `
    Hallo ${displayName},

    Om aan de slag te gaan, gelieve jouw account te activeren via deze link: ${verificationLink}

    Als jij niet hebt gevraagd om dit adres te verifiëren, mag je deze mail negeren.

    Met vriendelijke groet,

    Team Gentlestudent
  `;

  return client.sendEmail({
    From: 'noreply@appsaloon.be',
    To: to,
    Subject: 'Verifieer jouw Gentlestudent account',
    HtmlBody,
    TextBody,
    MessageStream: 'outbound'
  });
}

export { sendEmailVerification };
