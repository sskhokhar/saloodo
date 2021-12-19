import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html className="h-full bg-gray-100">
        <Head></Head>
        <body className="font-sans antialiased text-gray-600 min-h-full flex flex-col relative">
          <div className="relative z-10">
            <Main />
          </div>
          <img
            src="/beams-corner-light.jpg"
            alt=""
            className="absolute bottom-0 right-0 w-1/2"
          />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
