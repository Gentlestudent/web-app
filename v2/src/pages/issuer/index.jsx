import { colors, breakpoints } from '../../assets/styles/constants';
import { Heading, Button, Banner } from '../../components/UI';
import { spacers } from '../../assets/styles';
import Container from '../../components/container';

import banner from '../../assets/img/home/banner.jpg';

const Issuer = () => {
  return (
    <>
      {/* <Banner image={banner} /> */}
      <div className="heading">
        <Container>
          <Heading title="Word vandaag nog een issuer!" level={1} color="white" />
        </Container>
      </div>

      <style jsx>
        {`
          .heading {
          }

          .heading::before {
            content: '';
            position: absolute;
            height: 20rem;
            width: 100%;
            z-index: -1;
            background: ${colors.orange};
          }
        `}
      </style>
    </>
  );
};

Issuer.propTypes = {};

export default Issuer;
