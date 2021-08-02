import getSqlClient from '../../../sql/sqlClient';
import { verifyToken } from '../../../utils/middleware';
import { hasRole, createApiErrorMessage } from '../../../utils';
import { getPostmarkClient } from '../../../utils/postmark';
import { roles, errorCodes } from '../../../constants';
import { issuerApproved } from '../../../emailTemplates';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await verifyToken(req, res);
    const { user, authenticated } = req.auth;

    if (!authenticated || !hasRole(user, roles.ADMIN)) {
      return res.status(401).end();
    }

    const issuerId = req.query.id;
    if (!issuerId) {
      return res.status(400).json(createApiErrorMessage(errorCodes.MISSING_ISSUER_ID));
    }

    const { Issuer, User } = await getSqlClient();

    let issuer;
    try {
      const [amountUpdated] = await Issuer.update({
        validated: true
      }, {
        where: {
          id: issuerId,
          validated: 0
        }
      });
      if (amountUpdated !== 1) {
        return res.status(400).json(createApiErrorMessage(errorCodes.NO_UNAPPROVED_ISSUER));
      }
      issuer = await Issuer.findOne({
        where: { id: issuerId },
        attributes: ['userId'],
        include: {
          model: User,
          as: 'user',
          attributes: ['email', 'firstName', 'lastName']
        }
      });
      await User.update({
        role: 'issuer'
      }, {
        where: {
          id: issuer.userId
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(createApiErrorMessage(errorCodes.UNEXPECTED_ERROR));
    }

    try {
      const postmarkClient = await getPostmarkClient();

      const { firstName, lastName, email } = issuer.user;
      const displayName = `${firstName} ${lastName}`;

      await postmarkClient.sendEmail({
        From: 'noreply@appsaloon.be',
        To: email,
        Subject: issuerApproved.subject,
        HtmlBody: issuerApproved.htmlBody({
          displayName
        }),
        TextBody: issuerApproved.textBody({
          displayName
        }),
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
