import { Container } from '../components/layout/index';
import { Banner, HomeHeader, Download, Opportunities, News } from '../components/UI';
import { useOpportunities, useNews } from '../hooks';

import banner from '../assets/img/home/banner.jpg';

const Home = () => {
  const [errorOpportunities, loadingOpportunities, opportunities] = useOpportunities();
  const [errorNews, loadingNews, news] = useNews();
  // TODO handle error & show loading

  return (
    <>
      <Banner image={banner} />
      <HomeHeader />
      <Container>
        <Opportunities opportunities={opportunities} />
        <News news={news} />
      </Container>
      <Download />
    </>
  );
};

export default Home;
