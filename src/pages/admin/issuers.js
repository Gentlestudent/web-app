import { useState, useMemo } from 'react';
import { roles } from '../../constants';
import { Heading, Button, Pagination, SortIcon } from '../../components/UI';
import { Container } from '../../components/layout/index';
import requiresRole from '../../hoc/requiresRole';
import { useIssuers } from '../../hooks';
import { colors } from '../../assets/styles';
import { approveIssuer, denyIssuer } from '../../connector/issuers';

const Issuers = () => {
  const [page, setPage] = useState({ page: 1, limit: 100 });
  const [sort, setSort] = useState('-firstName');
  const options = useMemo(() => ({
    searchParams: {
      page: page.page,
      limit: page.limit,
      sort
    }
  }), [page, sort]);
  const [errorIssuers, loadingIssuers, issuers, reloadIssuers] = useIssuers({}, options);
  // TODO handle error & add loading icon
  const [loading, setLoading] = useState(false);

  function handlePageChange(newPage) {
    setPage({ ...page, page: newPage });
  }

  function handleAcceptClick(issuer) {
    return async () => {
      if (loading) {
        return;
      }
      try {
        setLoading(true);
        await approveIssuer(issuer.id);
        reloadIssuers();
      } catch (error) {
        console.error(error);
        // TODO show error message
      } finally {
        setLoading(false);
      }
    };
  }

  function handleDenyClick(issuer) {
    return async () => {
      if (loading) {
        return;
      }
      try {
        setLoading(true);
        await denyIssuer(issuer.id);
        reloadIssuers();
      } catch (error) {
        console.error(error);
        // TODO show error message
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
        <Heading title="Issuers" level={1} color="black" />
        <Pagination page={page.page} setPage={handlePageChange} />
        <table>
          <thead>
            <tr>
              <th className="sortable" onClick={handleSortChange('firstName')}><div>Naam <SortIcon sort={sort} name="firstName" /></div></th>
              <th className="sortable" onClick={handleSortChange('institute')}><div>Instelling <SortIcon sort={sort} name="institute" /></div></th>
              <th>Telefoon</th>
              <th>Email</th>
              <th>Url</th>
              <th className="sortable" onClick={handleSortChange('validated')}><div>Gevalideerd <SortIcon sort={sort} name="validated" /></div></th>
            </tr>
          </thead>
          <tbody>
            {loadingIssuers && <tr><td colSpan={5}>...laden</td></tr>}
            {!loadingIssuers && !issuers?.data?.length && <tr><td colSpan={5}>Er zijn nog geen issuers.</td></tr>}
            {(issuers?.data || []).map(issuer => {
              return (
                <tr key={issuer.id}>
                  <td>{`${issuer.user?.firstName || ''} ${issuer.user?.lastName || ''}`}</td>
                  <td>{issuer.institute || ''}</td>
                  <td>{issuer.phonenumber || ''}</td>
                  <td>{issuer.user?.email || ''}</td>
                  <td>{issuer.url || ''}</td>
                  <td>{issuer.validated
                    ? 'Ja'
                    : (
                      <div className="validation-buttons">
                        <Button text="Accepteren" onClick={handleAcceptClick(issuer)} />
                        <Button text="Weigeren" onClick={handleDenyClick(issuer)} />
                      </div>
                      )
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

export default requiresRole(Issuers, roles.ADMIN);
