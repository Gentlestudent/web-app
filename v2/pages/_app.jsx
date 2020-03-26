import 'normalize.css';
import '@/styles/index.scss';

const App = ({ Component, pageProps }) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
};

export default App;
