const Layout = ({ /* withHeader, */ children }) => (
  <div className="page-container">
    {/* withHeader && <Header /> */}
    {children}
    <style>
      {`
        .page-container {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
    `}
    </style>
  </div>
);
