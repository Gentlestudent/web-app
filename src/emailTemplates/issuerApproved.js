const subject = 'Aanvraag goedgekeurd';

function htmlBody(data) {
  return `
    <p>Hallo ${data.displayName},</p>

    <p>Je aanvraag om issuer te worden is goedgekeurd.</p>

    <p>Met vriendelijke groet,</p>

    <p>Team Gentlestudent</p>
  `;
}

function textBody(data) {
  return `
    Hallo ${data.displayName},

    Je aanvraag om issuer te worden is goedgekeurd.

    Met vriendelijke groet,

    Team Gentlestudent
  `;
}

export {
  subject,
  htmlBody,
  textBody
};
