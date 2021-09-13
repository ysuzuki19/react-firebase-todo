import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}></ThemeProvider>
    </>
  );
};

export default App;
