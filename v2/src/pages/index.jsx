import { useContext } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Header from './index/header';
import Download from './index/download';
import Oppertunities from './index/oppertunities';
import News from './index/news';
import AuthContext from '../context/auth';
import Container from '../components/container';
import { Banner } from '../components/UI';

import banner from '../assets/img/home/banner.jpg';

const Home = () => {
  const { isUserSignedIn, currentUser } = useContext(AuthContext);
  const OPPORTUNITIES = [
    {
      title: 'Gent Zonnestad: presenteer op een infoavond',
      description:
        'Verkrijg de intermediate badge wanneer je één keer op een infoavond aanwezig bent, en op één infoavond de presentatie omtrent de groepsaankoop hebt gegeven. (Het presentatiemateriaal is reeds beschikbaar).',
      image: 'https://picsum.photos/200/300',
      date: '	2018-12-21 tot en met 2019-12-21',
      badge:
        'https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Pins%2Fpin_duurzaamheid_3.png?alt=media'
    },
    {
      title: 'Nog een titel',
      description:
        'Verkrijg de intermediate badge wanneer je één keer op een infoavond aanwezig bent, en op één infoavond de presentatie omtrent de groepsaankoop hebt gegeven. (Het presentatiemateriaal is reeds beschikbaar).',
      image: 'https://picsum.photos/200/300',
      date: '	2018-12-21 tot en met 2019-12-21',
      badge:
        'https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Pins%2Fpin_duurzaamheid_3.png?alt=media'
    },
    {
      title: 'Nog een titel',
      description:
        'Verkrijg de intermediate badge wanneer je één keer op een infoavond aanwezig bent, en op één infoavond de presentatie omtrent de groepsaankoop hebt gegeven. (Het presentatiemateriaal is reeds beschikbaar).',
      image: 'https://picsum.photos/200/300',
      date: '	2018-12-21 tot en met 2019-12-21',
      badge:
        'https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Pins%2Fpin_duurzaamheid_3.png?alt=media'
    }
  ];

  return (
    <>
      <Banner image={banner} />
      <Container>
        {/* <Header /> */}
        <Oppertunities OPPORTUNITIES={OPPORTUNITIES} />
        <News />
      </Container>
      <Download />

      <style jsx>
        {`
          .heading {
            position: relative;
          }

          .heading::before {
            background: url(${banner});
            background-repeat: no-repeat;
            background-size: cover;
            content: '';
            position: absolute;
            height: 60rem;
            width: 100%;
            z-index: -1;
          }
        `}
      </style>
    </>
  );
};

export default Home;
