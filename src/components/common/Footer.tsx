import React from "react";
import { Box, Typography, IconButton, Container } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer: React.FC = () => {
  return (
    <footer>
      <Box
        sx={{
          backgroundColor: "#070c27",
          color: "#fff",
          py: 2,
          mt: "300px",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {/* Social Media Section */}
            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <IconButton
                aria-label="Facebook"
                href="https://facebook.com"
                target="_blank"
                sx={{ color: "#fff" }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                aria-label="Twitter"
                href="https://twitter.com"
                target="_blank"
                sx={{ color: "#fff" }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                aria-label="LinkedIn"
                href="https://www.linkedin.com/in/sivagnanam-v-b4a89422b"
                target="_blank"
                sx={{ color: "#fff" }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                aria-label="GitHub"
                href="https://github.com/v-sivagnanam/doc-manager"
                target="_blank"
                sx={{ color: "#fff" }}
              >
                <GitHubIcon />
              </IconButton>
            </Box>
          </Box>

          <Box
            sx={{
              textAlign: "center",
              mt: 2,
            }}
          >
            <Typography variant="body2" color="inherit">
              © {new Date().getFullYear()} Your Portfolio. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
