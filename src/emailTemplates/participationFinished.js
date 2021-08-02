const subject = 'Leerkans voltooid';

function htmlBody(data) {
  return `
    <p>Hallo ${data.displayName},</p>

    <p>Je taken bij leerkans <a href="${data.opportunityLink}">${data.opportunityTitle}</a> zijn voltooid.</p>

    <p>Je kan je nieuwe badge <a href="${data.profileLink}">hier bekijken</a>.</p>

    <p>Met vriendelijke groet,</p>

    <p>Team Gentlestudent</p>
  `;
}

function textBody(data) {
  return `
    Hallo ${data.displayName},

    Je taken bij leerkans ${data.opportunityTitle} zijn voltooid.

    Je kan je nieuwe badge bekijken via deze url: ${data.profileLink}.

    Met vriendelijke groet,

    Team Gentlestudent
  `;
}

export {
  subject,
  htmlBody,
  textBody
};
