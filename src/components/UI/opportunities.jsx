import PropTypes from 'prop-types';
import Router from 'next/router';
import { breakpoints } from '../../assets/styles/constants';
import Button from './button';
import Card from './card';
import { spacers } from '../../assets/styles';
import { routes } from '../../constants';

const Opportunities = ({ opportunities = [] }) => {
  return (
    <>
      <article className="oppertunities">
        <section className="cards">
          {opportunities.map((opportunity) => (
            <Card
              onClick={() => Router.push(`${routes.OPPORTUNITIES}/${opportunity.id}`)}
              key={opportunity.id}
              id={opportunity.id}
              badge={opportunity.pinImageUrl}
              image={opportunity.oppImageUrl}
              title={opportunity.title}
              description={opportunity.shortDescription}
              date={`${opportunity.beginDate} tot en met ${opportunity.endDate}`}
              alt={opportunity.alt ? opportunity.alt : opportunity.title}
            />
          ))}
        </section>
        <Button text="Bekijk meer" icon="arrow-right" primary />
      </article>

      <style jsx>
        {`
          .cards {
            display: grid;
            grid-template: 1fr / repeat(3, 1fr);
            grid-gap: ${spacers.medium};
            margin: ${spacers.medium} 0 6rem;
          }
          .oppertunities {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          @media (max-width: ${breakpoints.medium}) {
            .cards {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: ${breakpoints.small}) {
            .cards {
              grid-template-columns: repeat(1, 1fr);
            }
          }
        `}
      </style>
    </>
  );
};

Opportunities.propTypes = {
  opportunities: PropTypes.arrayOf(PropTypes.object)
};

export default Opportunities;
