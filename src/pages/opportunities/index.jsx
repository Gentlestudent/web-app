import { useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import { routes, regions } from '../../constants';
import { Container } from '../../components/layout/index';
import { Card, Heading, LoadingSpinner, Icon } from '../../components/UI';
import Map from '../../components/map/map';
import { spacers, colors, breakpoints } from '../../assets/styles/constants';
import { useOpportunities, useErrorNotifier } from '../../hooks';
import { getBase64AsDataUrl } from '../../utils';

const Opportunities = () => {
  const [filterState, setFilterState] = useState({
    search: '',
    region: Object.entries(regions)[0][0]
  });
  const [options, setOptions] = useState({ searchParams: { search: filterState.search, region: filterState.region } });
  const [errorOpportunities, loadingOpportunities, opportunities] = useOpportunities({}, options);
  const timeoutRef = useRef(null);
  const headingRef = useRef(null);
  const [detachedFilters, setDetachedFilters] = useState(false);

  useErrorNotifier([errorOpportunities]);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setOptions({ searchParams: { search: filterState.search, region: filterState.region } });
    }, 1000);
  }, [filterState]);

  useEffect(() => {
    function handle(event) {
      if (!headingRef.current) {
        return;
      }
      if (!detachedFilters && headingRef.current.getBoundingClientRect().y < 0) {
        setDetachedFilters(true);
      } else if (detachedFilters && headingRef.current.getBoundingClientRect().y >= 0) {
        setDetachedFilters(false);
      }
    }

    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, [detachedFilters]);

  function handleInputChange(name) {
    return (event) => {
      setFilterState({ ...filterState, [name]: event.target.value });
    }
  }

  return (
    <>
      <Container>
        <>
          <div className="heading" ref={headingRef}>
            <Heading title="Leerkansen" level={1} />

            {!detachedFilters
              ? (
                <div className="search">
                  <label><Icon name="search" />&nbsp;</label>
                  <input type="text" value={filterState.search} onChange={handleInputChange('search')} />

                  <label htmlFor="region-input">Regio</label>
                  <select id="region-input" value={filterState.region} onChange={handleInputChange('region')}>
                    {Object.entries(regions).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                </div>
                )
              : (
                <div className="search-detached-container">
                  <Container>
                    <div className="search search-detached">
                      <label><Icon name="search" />&nbsp;</label>
                      <input type="text" value={filterState.search} onChange={handleInputChange('search')} />

                      <label htmlFor="region-input">Regio</label>
                      <select id="region-input" value={filterState.region} onChange={handleInputChange('region')}>
                        {Object.entries(regions).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                      </select>
                    </div>
                  </Container>
                </div>
                )
            }
          </div>

          <div className="map-wrapper">
            <Map opportunities={opportunities?.data || []} />
          </div>

          <article className="cards">
            {loadingOpportunities && <LoadingSpinner />}
            {(opportunities?.data || []).map((opportunity) => (
              <Card
                onClick={() => Router.push(`${routes.OPPORTUNITIES}/${opportunity.id}`)}
                key={opportunity.id}
                id={opportunity.id}
                badge={getBase64AsDataUrl(opportunity.pinImage)}
                image={getBase64AsDataUrl(opportunity.oppImage)}
                title={opportunity.title}
                description={opportunity.shortDescription}
                date={`${opportunity.beginDate || '-'} tot en met ${opportunity.endDate || '-'}`}
                alt={opportunity.alt ? opportunity.alt : opportunity.title}
              />
            ))}
          </article>
        </>
      </Container>

      <style jsx>
        {`
          .cards {
            display: grid;
            grid-template: 1fr 1fr / repeat(3, 1fr);
            grid-gap: ${spacers.medium};
            margin: ${spacers.medium} 0 6rem;
          }

          .heading {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 3rem 0 0;
          }

          .search {
            width: 50%;
            display: flex;
            grid-gap: 2rem;
            justify-content: flex-end;
            align-items: center;
          }

          .search input {
            width: auto;
          }

          .search-detached-container {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 10;
            pointer-events: none;
          }

          .search-detached {
            float: right;
            width: unset;
            background-color: white;
            padding: 1rem;
            border: 2px solid ${colors.blue};
            border-radius: 1rem;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            border-top: none;
            pointer-events: initial;
          }

          .map-wrapper {
            background: ${colors.blueLight};
            height: 50rem;
          }

          @media (max-width: ${breakpoints.medium}) {
            .cards {
              grid-template: 1fr 1fr / repeat(2, 1fr);
            }

            .heading {
              flex-direction: column;
              margin-bottom: 2rem;
              align-items: start;
            }
          }

          @media (max-width: ${breakpoints.small}) {
            .cards {
              grid-gap: ${spacers.small};
            }
          }

          @media (max-width: ${breakpoints.extraSmall}) {
            .cards {
              grid-template: 1fr 1fr / repeat(1, 1fr);
            }
          }
        `}
      </style>
    </>
  );
};

export default Opportunities;
