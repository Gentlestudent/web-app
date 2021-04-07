import { colors, breakpoints, spacers } from '../../assets/styles/constants';
import banner from '../../assets/img/home/banner.jpg';
import Heading from './heading';
import BannerSplit from './banner-split';

const IssuerHeader = () => {
  return (
    <>
      <BannerSplit>
        <>
          <Heading title="Word vandaag nog een issuer!" level={1} color="white" />
          <div>
            <Heading title="Wat is een issuer" level={2} color="white" />
            <p>
              Een Issuer formuleert een leerkans voor de student. Het kan gaan over het volgen van
              een eenmalige activiteit tot een langdurig engagement binnen de organisatie. Als
              issuer maak je de student(en) warm voor een maatschappelijk relevante leerkans.
            </p>

            <Heading title="Jij bepaalt" level={2} color="white" />
            <p>
              Wat kan de student doen voor jou of jouw organisatie waarmee hij kan bijleren op vlak
              van duurzaamheid, ondernemingszin, digitale geletterdheid, onderzoek of
              wereldburgerschap.
            </p>
            <Heading title="Waarom zou ik een issuer worden?" level={2} color="white" />
            <p>
              Als issuer breng je de studenten dichter bij de buurt, je leert ze kennismaken met een
              authentieke context en laat hen een bijdrage leveren aan de organisatie. Je bent de
              brugfiguur tussen studenten en hun buurt/ jouw organisatie.
            </p>
          </div>
        </>
      </BannerSplit>
    </>
  );
};

IssuerHeader.propTypes = {};

export default IssuerHeader;
