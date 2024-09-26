import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { DocumentManager } from "@/components/common/DocumentTable";
import SEO from "@/components/common/SEO";
import Footer from "@/components/common/Footer";

const HomePage: React.FC = () => {
  const seoData = {
    title: "Sivagnanam - Frontend Developer and Software Engineer",
    description:
      "Welcome to Sivagnanam's portfolio. Explore projects, blogs, and resources on software development, React, and more.",
    keywords:
      "frontend developer, React.js, Next.js, software engineer, portfolio, web development",
    author: "Sivagnanam",
    ogImage:
      "https://media.licdn.com/dms/image/v2/D5635AQHYC_dmGSAU_A/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1713274135674?e=1727971200&v=beta&t=5kpoYMISj1XiN6SLNG_T5qfPARo1iF3bXCl5mrUiREs",
    ogUrl: "https://www.linkedin.com/in/sivagnanam-v-b4a89422b",
  };

  return (
    <>
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        author={seoData.author}
        ogImage={seoData.ogImage}
        ogUrl={seoData.ogUrl}
        twitterCard="summary_large_image"
      />
      <Container maxWidth="lg" style={{ marginTop: "50px", color: "#03224f" }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Application Document Manager
          </Typography>
          <Typography variant="subtitle1">
            Select an application, upload PDFs, and manage your documents
            easily.
          </Typography>
        </Box>
        <DocumentManager />
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;
