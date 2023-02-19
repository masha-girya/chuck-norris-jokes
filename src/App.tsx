import React from 'react';
import { AppBar } from './components/AppBar';
import { MainSection } from './components/MainSection';

const App: React.FC = () => {
  return (
    <div>
      <header>
        <AppBar />
      </header>
      <main className="main-container">
        <MainSection />
      </main>
    </div>
  );
};

export default App;
