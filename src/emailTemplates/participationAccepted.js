const subject = 'Inschrijving geaccepteerd';

function htmlBody(data) {
  return `
    <p>Hallo ${data.displayName},</p>

    <p>Je inschrijving bij leerkans '${data.opportunityTitle}' is geaccepteerd.</p>

    <p>Je kan de leerkans op de gentlestudent website <a href="${data.opportunityLink}">hier bekijken</a>.</p>

    <p>Met vriendelijke groet,</p>

    <p>Team Gentlestudent</p>
  `;
}

function textBody(data) {
  return `
    Hallo ${data.displayName},

    Je inschrijving bij leerkans '${data.opportunityTitle}' is geaccepteerd.

    Je kan de leerkans op de gentlestudent website bekijken via deze url: ${data.opportunityLink}.

    Met vriendelijke groet,

    Team Gentlestudent
  `;
}

export {
  subject,
  htmlBody,
  textBody
};
