import Container from '../../components/container';
import { spacers, colors, breakpoints } from '../../assets/styles/constants';
import { Card, Heading, Search, SearchBackup } from '../../components/UI';

export default () => {
  return (
    <>
      <Container>
        <div className="heading">
          <Heading title="Leerkansen" level={1} />
        </div>
      </Container>
      <style jsx>
        {`
          .heading {
            display: flex;
            justify-content: space-between;
            margin: 3rem 0 0;
          }
        `}
      </style>
    </>
  );
};
