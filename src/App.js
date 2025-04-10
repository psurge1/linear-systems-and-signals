import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

import COLORS from './pages/colorPalette'
import LandingPage from './pages/LandingPage'
import ConvolutionPage from './pages/ConvolutionPage'
import LaplacePage from './pages/LaplacePage'
import FourierPage from './pages/FourierPage'
import ErrorPage from './pages/ErrorPage'

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';


function App() {
  const pgs = new Map();
  pgs.set("Home", LandingPage);
  pgs.set("Convolution", ConvolutionPage);
  pgs.set("Laplace", LaplacePage);
  pgs.set("Fourier", FourierPage);
  const [page, setPage] = useState("Home");

  function NavBar() {
    return (
      <nav style={{ backgroundColor: COLORS.navBarColor, display: "flex", gap: "10px", padding: "10px" }}>
        {[...pgs.keys()].map((key) => (
          <Button sx={{ color: 'black' }} key={key} onClick={() => setPage(key)}>{key}</Button>
        ))}
      </nav>
    );
  }

  function BottomPanel() {
    return (
      <Box
        sx={{
          width: '100%',
          position: 'fixed',
          bottom: 0,
          backgroundColor: '#333',
          color: 'white',
          padding: '10px 0',
        }}
      >
        <Box style={{display: "flex"}}>
          <Typography variant="body2">Contact Us: example@example.com</Typography>
          <Typography variant="body2">Follow us on:</Typography>
          <Link href="https://www.facebook.com" target="_blank" sx={{ color: 'white', marginRight: 2 }}>
            Facebook
          </Link>
          <Link href="https://www.twitter.com" target="_blank" sx={{ color: 'white', marginRight: 2 }}>
            Twitter
          </Link>
          <Link href="https://www.linkedin.com" target="_blank" sx={{ color: 'white' }}>
            LinkedIn
          </Link>
        </Box>
      </Box>
    );
  }

  function renderPage() {
    if (!pgs.has(page)) {
      return <ErrorPage>404 - Page not Found!</ErrorPage>
    }
    const Page = pgs.get(page);
    return <Page pageChanger={setPage}></Page>
  }

  return (
    <Box>
      <NavBar pages={pgs}></NavBar>
      <Box style={{ padding: "20px" }}>
        {renderPage()}
      </Box>
      {/* <BottomPanel></BottomPanel> */}
    </Box>
  );
}

export default App;
