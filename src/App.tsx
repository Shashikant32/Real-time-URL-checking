import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import URLChecker from './components/URLChecker';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <URLChecker />
      </Layout>
    </ThemeProvider>
  );
}

export default App;