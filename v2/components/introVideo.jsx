const IntroVideo = () => (
  <div className="intro-video">
    <iframe
      title="Intro video"
      src="https://arteveldehogeschool.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=dc47c1a8-68b9-413b-812a-aa1400a18754&v=1"
      style={{
        objectFit: 'cover',
        maxWidth: 720,
        width: '100%',
        maxHeight: 405,
        overflow: 'visible'
      }}
      width="100%"
      frameBorder="0"
      allowFullScreen
      allow="autoplay"
    />
    <style jsx>
      {`
        .intro-video {
          padding: 0;
          margin-top: 5vh;
          margin-bottom: 1rem;
        }
      `}
    </style>
  </div>
);

export default IntroVideo;
