import { Heading, Button } from '../../components/UI';

const News = () => {
  return (
    <>
      <article className="news">
        <Heading level={2} title="Nieuws" />
        <p>Zie wat Gentlestudent heeft te bieden en wat je mag verwachten in de toekomst</p>
        <Button text="Wat is er nieuw?" icon="arrow-right" />
      </article>

      <style jsx>
        {`
          .news {
            margin-top: 10rem;
            max-width: 45rem;
          }
        `}
      </style>
    </>
  );
};

News.propTypes = {};

export default News;
