import { Participation, Opportunity, User } from '../../../sql/sqlClient';
import { errorCodes, frontendUrl } from '../../../constants';
import { createApiErrorMessage } from '../../../utils';
import { verifyToken } from '../../../utils/middleware';
import { getPostmarkClient } from '../../../utils/postmark';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await verifyToken(req, res);
    const { authenticated } = req.auth;

    if (!authenticated) {
      return res.status(401).end();
    }

    const id = req.query.id;
    let participation;
    try {
      const [amountUpdated] = await Participation.update({
        status: 1
      }, {
        where: {
          id,
          status: 0
        }
      });
      if (amountUpdated !== 1) {
        return res.status(400).json(createApiErrorMessage(errorCodes.NO_UNAPPROVED_PARTICIPATION));
      }
      participation = await Participation.findOne({
        where: { id },
        include: [{
          model: Opportunity,
          as: 'Opportunity',
          attributes: ['id', 'title']
        }, {
          model: User,
          as: 'User',
          attributes: ['email', 'firstName', 'lastName']
        }]
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }

    try {
      const postmarkClient = await getPostmarkClient();

      const opportunityLink = `${frontendUrl}/opportunities/${participation.Opportunity.id}`;
      const { firstName, lastName, email } = participation.User;
      const displayName = `${firstName} ${lastName}`;

      const HtmlBody = `
        <p>Hallo ${displayName},</p>

        <p>Je inschrijving bij leerkans '${participation.Opportunity.title}' is geaccepteerd.</p>

        <p>Je kan de leerkans op de gentlestudent website <a href="${opportunityLink}">hier bekijken</a>.</p>

        <p>Met vriendelijke groet,</p>

        <p>Team Gentlestudent</p>
      `;

      const TextBody = `
        Hallo ${displayName},

        Je inschrijving bij leerkans '${participation.Opportunity.title}' is geaccepteerd.

        Je kan de leerkans op de gentlestudent website bekijken via deze url: ${opportunityLink}.

        Met vriendelijke groet,

        Team Gentlestudent
      `;

      await postmarkClient.sendEmail({
        From: 'noreply@appsaloon.be',
        To: email,
        Subject: 'Inschrijving geaccepteerd',
        HtmlBody,
        TextBody,
        MessageStream: 'outbound'
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }
    return res.send('ok');
  }

  return res.status(404).end();
}
