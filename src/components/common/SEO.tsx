import React from "react";
import Head from "next/head";
import { SEOProps } from "@/types";

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  author = "Sivagnanam V",
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
