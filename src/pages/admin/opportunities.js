import { useState, useMemo } from 'react';
import { roles, routes, authorityLabels } from '../../constants';
import { Heading, Button, Pagination } from '../../components/UI';
import { Container } from '../../components/layout/index';
import requiresRole from '../../hoc/requiresRole';
import { useOpportunities } from '../../hooks';
import { colors } from '../../assets/styles';

const Opportunities = () => {
  const [page, setPage] = useState({ page: 1, limit: 100 });
  const options = useMemo(() => ({
    searchParams: {
      authority: [0, 1, 2],
      includeIssuers: true,
      page: page.page,
      limit: page.limit
    }
  }), [page]);
  const [errorOpportunities, loadingOpportunities, opportunities] = useOpportunities([], options);
  // TODO handle error & add loading icon

  function handlePageChange(newPage) {
    setPage({ ...page, page: newPage });
  }

  return (
    <>
      <Container>
        <Heading title="Leerkansen" level={1} color="black" />
        <Button text="Leerkansen valideren" href={routes.admin.VALIDATE_OPPORTUNITY} primary />
        <Pagination page={page.page} setPage={handlePageChange} />
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Titel</th>
              <th>Begin datum</th>
              <th>Eind datum</th>
              <th>Instelling</th>
              <th>Issuer</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loadingOpportunities && <tr><td colSpan={7}>...laden</td></tr>}
            {!loadingOpportunities && !opportunities.length && <tr><td colSpan={7}>Er zijn nog geen leerkansen.</td></tr>}
            {opportunities.map(opportunity => {
              return (
                <tr key={opportunity.id}>
                  <td><a href={`${routes.OPPORTUNITIES}/${opportunity.id}`}>&gt;</a></td>
                  <td>{opportunity.title}</td>
                  <td>{opportunity.beginDate}</td>
                  <td>{opportunity.endDate}</td>
                  <td>{opportunity.issuer?.institute}</td>
                  <td>{`${opportunity.issuer?.user?.firstName || ''} ${opportunity.issuer?.user?.lastName || ''}`}</td>
                  <td>{authorityLabels[opportunity.authority] || '-'}</td>
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

export default requiresRole(Opportunities, roles.ADMIN);
