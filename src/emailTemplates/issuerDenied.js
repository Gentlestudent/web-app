const subject = 'Aanvraag afgekeurd';

function htmlBody(data) {
  return `
    <p>Hallo ${data.displayName},</p>

    <p>Je aanvraag om issuer te worden is afgekeurd.</p>

    <p>Met vriendelijke groet,</p>

    <p>Team Gentlestudent</p>
  `;
}

function textBody(data) {
  return `
    Hallo ${data.displayName},

    Je aanvraag om issuer te worden is afgekeurd.

    Met vriendelijke groet,

    Team Gentlestudent
  `;
}

export {
  subject,
  htmlBody,
  textBody
};
