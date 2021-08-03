import { useState, useMemo } from 'react';
import { roles, routes } from '../../constants';
import { Heading, Button, Pagination } from '../../components/UI';
import { Container } from '../../components/layout/index';
import requiresRole from '../../hoc/requiresRole';
import { useIssuers } from '../../hooks';
import { colors } from '../../assets/styles';

const Issuers = () => {
  const [page, setPage] = useState({ page: 1, limit: 100 });
  const options = useMemo(() => ({
    searchParams: {
      page: page.page,
      limit: page.limit
    }
  }), [page]);
  const [errorIssuers, loadingIssuers, issuers] = useIssuers([], options);
  // TODO handle error & add loading icon

  function handlePageChange(newPage) {
    setPage({ ...page, page: newPage });
  }

  return (
    <>
      <Container>
        <Heading title="Issuers" level={1} color="black" />
        <Button text="Issuers valideren" href={routes.admin.VALIDATE_ISSUER} primary />
        <Pagination page={page.page} setPage={handlePageChange} />
        <table>
          <thead>
            <tr>
              <th>Naam</th>
              <th>Instelling</th>
              <th>Telefoon</th>
              <th>Email</th>
              <th>Gevalideerd</th>
            </tr>
          </thead>
          <tbody>
            {loadingIssuers && <tr><td colSpan={5}>...laden</td></tr>}
            {!loadingIssuers && !issuers.length && <tr><td colSpan={5}>Er zijn nog geen issuers.</td></tr>}
            {issuers.map(issuer => {
              return (
                <tr key={issuer.id}>
                  <td>{`${issuer.user?.firstName || ''} ${issuer.user?.lastName || ''}`}</td>
                  <td>{issuer.institute}</td>
                  <td>{issuer.phonenumber}</td>
                  <td>{issuer.user?.email}</td>
                  <td>{issuer.validated ? 'ja' : 'nee'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination page={page.page} setPage={handlePageChange} />
      </Container>

      <style jsx>
        {`
          table {
            border: 1px solid ${colors.grayDark};
            border-spacing: 0;
          }

          table th {
            padding: 8px;
            text-align: left;
          }

          table td {
            border-top: 1px solid ${colors.grayDark};
            padding: 8px;
          }
        `}
      </style>
    </>
  );
};

export default requiresRole(Issuers, roles.ADMIN);
