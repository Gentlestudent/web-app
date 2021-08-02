const subject = 'Leerkans goedgekeurd';

function htmlBody(data) {
  return `
    <p>Hallo ${data.displayName},</p>

    <p>Je leerkans '${data.opportunityTitle}' is goedgekeurd.</p>

    <p>Je kan je leerkans op de gentlestudent website <a href="${data.opportunityLink}">hier bekijken</a>.</p>

    <p>Met vriendelijke groet,</p>

    <p>Team Gentlestudent</p>
  `;
}

function textBody(data) {
  return `
    Hallo ${data.displayName},

    Je leerkans '${data.opportunityTitle}' is goedgekeurd.

    Je kan je leerkans op de gentlestudent website bekijken via deze url: ${data.opportunityLink}.

    Met vriendelijke groet,

    Team Gentlestudent
  `;
}

export {
  subject,
  htmlBody,
  textBody
};
