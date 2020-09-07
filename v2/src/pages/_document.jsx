import Document, { Html, Head, Main, NextScript } from 'next/document';
import { colors } from '../assets/styles';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="manifest" href="manifest.json" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans&amp;display=swap"
            rel="stylesheet"
          />
          <meta name="theme-color" content={colors.primary} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
