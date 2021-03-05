import PropTypes from 'prop-types';
import { breakpoints } from '../../assets/styles/constants';
import { Button, Card } from '../../components/UI';
import { spacers } from '../../assets/styles';

const Oppertunities = ({ OPPORTUNITIES }) => {
  return (
    <>
      <article className="oppertunities">
        <section className="cards">
          {OPPORTUNITIES.map((OPPORTUNITY) => (
            <Card
              key={OPPORTUNITY}
              badge={OPPORTUNITY.badge}
              image="https://picsum.photos/200/300"
              title={OPPORTUNITY.title}
              description={OPPORTUNITY.description}
              date={OPPORTUNITY.date}
              alt={OPPORTUNITY.alt ? OPPORTUNITY.alt : OPPORTUNITY.title}
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

Oppertunities.propTypes = {
  OPPORTUNITIES: PropTypes.isRequired
};

export default Oppertunities;
