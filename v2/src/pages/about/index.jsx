import Container from '../../components/container';
import { spacers } from '../../assets/styles/constants';
import { Heading } from '../../components/UI';

export default () => {
  return (
    <>
      <Container>
        <Heading title="Over Ons" level={1} marginTop />
      </Container>
      <style jsx>
        {`
          .heading {
            display: flex;
            justify-content: space-between;
            margin: 3rem 0 0;
          }

          .news-items > * {
            display: flex;
            flex-direction: column;
            margin-bottom: 2rem;
            // margin: ${spacers.medium} 0 6rem;
          }
        `}
      </style>
    </>
  );
};
