import { useState, useMemo } from 'react';
import { roles } from '../../constants';
import { Heading, Button } from '../../components/UI';
import { Container } from '../../components/layout/index';
import requiresRole from '../../hoc/requiresRole';
import { useIssuers } from '../../hooks';
import { colors } from '../../assets/styles';
import { approveIssuer, denyIssuer } from '../../connector/issuers';

const ValidateIssuers = () => {
  const options = useMemo(() => ({ searchParams: { validated: false } }), []);
  const [errorIssuers, loadingIssuers, issuers] = useIssuers(options, []);
  // TODO handle error & add loading icon

  return (
    <>
      <Container>
        <Heading title="Issuers valideren" level={1} color="black" />
        {loadingIssuers && <div>...laden</div>}
        {!loadingIssuers && !issuers.length && (
          <div>Er zijn geen te valideren issuers.</div>
        )}
        <div className="list">
          {issuers.map(issuer => <Issuer key={issuer.id} issuer={issuer} />)}
        </div>
      </Container>

      <style jsx>
        {`
          .list {
            display: grid;
            grid: auto / repeat(3, 1fr);
            grid-gap: 16px;
          }
        `}
      </style>
    </>
  );
};

const Issuer = ({ issuer }) => {
  const [hidden, setHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  // TODO show loading state

  async function handleAcceptClick() {
    try {
      setLoading(true);
      await approveIssuer(issuer.id);
      setHidden(true);
    } catch (error) {
      console.error(error);
      // TODO show error message
    } finally {
      setLoading(false);
    }
  }

  async function handleDenyClick() {
    try {
      setLoading(true);
      await denyIssuer(issuer.id);
      setHidden(true);
    } catch (error) {
      console.error(error);
      // TODO show error message
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="root">
        <Heading title={issuer.longname} level={2} color="black" />
        <dl>
          <div className="flex">
            <dt>Institutie:</dt>
            <dd>{issuer.institute}</dd>
          </div>
          <div className="flex">
            <dt>Tel:</dt>
            <dd>{issuer.phonenumber}</dd>
          </div>
          <div className="flex">
            <dt>URL:</dt>
            <dd>{issuer.url}</dd>
          </div>
        </dl>
        <div className="flex">
          <Button disabled={loading} text="Accepteren" onClick={handleAcceptClick} primary />
          <Button disabled={loading} text="Weigeren" onClick={handleDenyClick} primary />
        </div>
      </div>

      <style jsx>
        {`
          .root {
            border-radius: 1rem;
            background: ${colors.blueLight};
            width: 400px;
            padding: 4.5rem;
            ${hidden ? 'display: none;' : ''}
          }

          dl {
            display: flex;
            flex-flow: column;
          }

          .flex {
            display: flex;
            justify-content: space-between;
          }

          dt {
            font-weight: bold;
          }

          dd {
            margin: 0;
          }
        `}
      </style>
    </>
  );
}

export default requiresRole(ValidateIssuers, roles.ADMIN);
