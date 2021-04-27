import PropTypes from 'prop-types';
import { breakpoints } from '../../assets/styles/constants';
import Button from './button';
import Card from './card';
import { spacers } from '../../assets/styles';

const Opportunities = ({ opportunities }) => {
  return (
    <>
      <article className="oppertunities">
        <section className="cards">
          {opportunities.map((opportunity) => (
            <Card
              key={opportunity} // TODO this should be an id
              badge={opportunity.badge}
              image="https://picsum.photos/200/300"
              title={opportunity.title}
              description={opportunity.description}
              date={opportunity.date}
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
  // eslint-disable-next-line react/forbid-prop-types
  opportunities: PropTypes.object
};

export default Opportunities;
