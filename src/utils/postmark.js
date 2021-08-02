import { emailVerification } from '../../../emailTemplates';

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
  return client.sendEmail({
    From: 'noreply@appsaloon.be',
    To: to,
    Subject: emailVerification.subject,
    HtmlBody: emailVerification.htmlBody({
      displayName,
      verificationLink
    }),
    TextBody: emailVerification.textBody({
      displayName,
      verificationLink
    }),
    MessageStream: 'outbound'
  });
}

export { getPostmarkClient, sendEmailVerification };
