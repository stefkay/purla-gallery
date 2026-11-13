import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang={this.props.locale || 'en'} className="theme-light">
        <Head>
          {/* Meta tags */}
          <meta charSet="UTF-8" />
          <meta name="keywords" content="handmade, earrings, Purla, accessories, leather" />
          <meta name="author" content="Purla Index" />
          {/* Favicon */}
          <link rel="icon" href="/purla_logo.svg" />

          {/* Google Fonts or custom styles */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@400;500;600&display=swap"
            rel="stylesheet"
          />

          {/* Open Graph / SEO Social Sharing */}
          <meta property="og:title" content="Purla - Handmade Accessories" />
          <meta
            property="og:description"
            content="Explore handcrafted leather jewelry by Purla."
          />
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
