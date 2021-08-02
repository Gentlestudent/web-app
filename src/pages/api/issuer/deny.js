import getSqlClient from '../../../sql/sqlClient';
import { verifyToken } from '../../../utils/middleware';
import { hasRole, createApiErrorMessage } from '../../../utils';
import { getPostmarkClient } from '../../../utils/postmark';
import { roles, errorCodes } from '../../../constants';
import { issuerDenied } from '../../../emailTemplates';

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
      issuer = await Issuer.findOne({
        where: { id: issuerId, validated: 0 },
        attributes: ['id'],
        include: {
          model: User,
          as: 'user',
          attributes: ['email', 'firstName', 'lastName']
        }
      });
      if (!issuer) {
        return res.status(400).json(createApiErrorMessage(errorCodes.NO_UNAPPROVED_ISSUER));
      }
      await Issuer.destroy({
        where: {
          id: issuerId
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
        Subject: issuerDenied.subject,
        HtmlBody: issuerDenied.htmlBody({
          displayName
        }),
        TextBody: issuerDenied.textBody({
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
