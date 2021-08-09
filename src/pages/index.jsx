import { Container } from '../components/layout/index';
import { Banner, HomeHeader, Download, Opportunities, News } from '../components/UI';
import { useOpportunities, useNews, useErrorNotifier } from '../hooks';

import banner from '../assets/img/home/banner.jpg';

const Home = () => {
  const [errorOpportunities, loadingOpportunities, opportunities] = useOpportunities();
  const [errorNews, loadingNews, news] = useNews();

  useErrorNotifier([errorOpportunities, errorNews]);

  return (
    <>
      <Banner image={banner} />
      <HomeHeader />
      <Container>
        <Opportunities opportunities={opportunities?.data || []} loading={loadingOpportunities} />
        <News news={news?.data || []} loading={loadingNews} />
      </Container>
      <Download />
    </>
  );
};

export default Home;
