import { breakpoints } from '../assets/styles/constants';

const IntroVideo = () => (
  <div className="intro-video">
    <iframe
      title="Intro video"
      src="https://arteveldehogeschool.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=dc47c1a8-68b9-413b-812a-aa1400a18754&v=1"
      frameBorder="0"
      allowFullScreen
      allow="autoplay"
    />
    <style jsx>
      {`
        .intro-video {
          margin-top: 5vh;
          margin-bottom: 1rem;
        }

        iframe {
          padding: 10rem;
          width: 100vw;
          max-width: 120rem;
          max-height: calc(120rem / 1.6);
          height: calc(100vw / 1.6);
        }

        @media (max-width: ${breakpoints.small}) {
          iframe {
            padding: 0;
          }
        }
      `}
    </style>
  </div>
);

export default IntroVideo;
