import React from "react";
import Head from "next/head";

type SEOProps = {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
};

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  author = "Sivagnanam",
  ogImage,
  ogUrl,
  twitterCard = "summary_large_image",
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content={keywords || "portfolio, developer, projects"}
      />
      <meta name="author" content={author} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
    </Head>
  );
};

export default SEO;
