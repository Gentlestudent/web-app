import { useState, useMemo } from 'react';
import { roles, routes, authorityLabels } from '../../constants';
import { Heading, Button, Pagination, SortIcon } from '../../components/UI';
import { Container } from '../../components/layout/index';
import requiresRole from '../../hoc/requiresRole';
import { useOpportunities, useErrorNotifier } from '../../hooks';
import { colors } from '../../assets/styles';
import { approveOpportunity, denyOpportunity } from '../../connector/opportunities';
import { createNotification, getErrorResponse } from '../../utils';

const Opportunities = () => {
  const [page, setPage] = useState({ page: 1, limit: 100 });
  const [sort, setSort] = useState('-beginDate');
  const options = useMemo(() => ({
    searchParams: {
      authority: [0, 1, 2],
      includeIssuers: true,
      page: page.page,
      limit: page.limit,
      sort
    }
  }), [page, sort]);
  const [errorOpportunities, loadingOpportunities, opportunities, reloadOpportunities] = useOpportunities({}, options);
  // TODO add loading icon
  const [loading, setLoading] = useState(false);

  useErrorNotifier([errorOpportunities]);

  function handlePageChange(newPage) {
    setPage({ ...page, page: newPage });
  }

  function handleAcceptClick(opportunity) {
    return async () => {
      if (loading) {
        return;
      }
      try {
        setLoading(true);
        await approveOpportunity(opportunity.id);
        reloadOpportunities();
      } catch (error) {
        const errorResponse = await getErrorResponse(error);
        createNotification({ message: errorResponse.message || error.message, style: 'error', duration: 5000 });
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  }

  function handleDenyClick(opportunity) {
    return async () => {
      if (loading) {
        return;
      }
      try {
        setLoading(true);
        await denyOpportunity(opportunity.id);
        reloadOpportunities();
      } catch (error) {
        const errorResponse = await getErrorResponse(error);
        createNotification({ message: errorResponse.message || error.message, style: 'error', duration: 5000 });
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  }

  function handleSortChange(name) {
    return () => {
      if (sort === name) {
        return setSort(`-${name}`);
      }
      setSort(name);
    };
  }

  return (
    <>
      <Container>
        <Heading title="Leerkansen" level={1} color="black" />
        <Pagination page={page.page} setPage={handlePageChange} />
        <table>
          <thead>
            <tr>
              <th></th>
              <th className="sortable" onClick={handleSortChange('title')}><div>Titel <SortIcon sort={sort} name="title" /></div></th>
              <th className="sortable" onClick={handleSortChange('beginDate')}><div>Begin datum <SortIcon sort={sort} name="beginDate" /></div></th>
              <th className="sortable" onClick={handleSortChange('endDate')}><div>Eind datum <SortIcon sort={sort} name="endDate" /></div></th>
              <th className="sortable" onClick={handleSortChange('institute')}><div>Instelling <SortIcon sort={sort} name="institute" /></div></th>
              <th>Issuer</th>
              <th className="sortable" onClick={handleSortChange('authority')}><div>Status <SortIcon sort={sort} name="authority" /></div></th>
            </tr>
          </thead>
          <tbody>
            {loadingOpportunities && <tr><td colSpan={7}>...laden</td></tr>}
            {!loadingOpportunities && !opportunities.data?.length && <tr><td colSpan={7}>Er zijn nog geen leerkansen.</td></tr>}
            {(opportunities.data || []).map(opportunity => {
              return (
                <tr key={opportunity.id}>
                  <td><a href={`${routes.OPPORTUNITIES}/${opportunity.id}`}>&gt;</a></td>
                  <td>{opportunity.title}</td>
                  <td>{opportunity.beginDate}</td>
                  <td>{opportunity.endDate}</td>
                  <td>{opportunity.issuer?.institute}</td>
                  <td>{`${opportunity.issuer?.user?.firstName || ''} ${opportunity.issuer?.user?.lastName || ''}`}</td>
                  <td>{opportunity.authority === 0
                    ? (
                      <div className="validation-buttons">
                        <Button text="Accepteren" onClick={handleAcceptClick(opportunity)} />
                        <Button text="Weigeren" onClick={handleDenyClick(opportunity)} />
                      </div>
                      )
                    : authorityLabels[opportunity.authority] || '-'
                  }</td>
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
            border: 1px solid ${colors.border};
            border-spacing: 0;
            border-radius: 0.5rem;
            width: 100%;
            margin: 1em 0;
          }

          table th {
            padding: 8px;
            text-align: left;
          }

          table td {
            border-top: 1px solid ${colors.border};
            padding: 8px;
          }

          .validation-buttons {
            display: flex;
            grid-gap: 0.5em;
          }

          .sortable {
            cursor: pointer;
          }

          .sortable > div {
            display: flex;
            justify-content: space-between;
          }

          .sortable:hover {
            background-color: ${colors.grayLight};
          }
        `}
      </style>
    </>
  );
};

export default requiresRole(Opportunities, roles.ADMIN);
