import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Meta tags */}
          <meta charSet="UTF-8" />
          <meta name="description" content="Awesome handmade products by Purla" />
          <meta name="keywords" content="handmade, earrings, Purla, accessories, leather" />
          <meta name="author" content="Purla Index" />
          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" />

          {/* Google Fonts or custom styles */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
            rel="stylesheet"
          />

          {/* Open Graph / SEO Social Sharing */}
          <meta property="og:title" content="Purla - Handmade Accessories" />
          <meta
            property="og:description"
            content="Discover unique handmade earrings and home decor."
          />
          <meta property="og:image" content="/images/og-image.jpg" />
          {/*<meta property="og:url" content="https://purla-gallery.com"/>*/}
          <meta name="twitter:card" content="summary_large_image" />
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
