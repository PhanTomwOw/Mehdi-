
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SportComplexList from './components/SportComplexList';
import SportComplexDetail from './components/SportComplexDetail';
import TeamBuilder from './components/TeamBuilder';
import type { SportComplex } from './types';

export type View = 
  | { name: 'list' }
  | { name: 'detail'; complex: SportComplex }
  | { name: 'teambuilder' };

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>({ name: 'list' });

  const handleSelectComplex = (complex: SportComplex) => {
    setCurrentView({ name: 'detail', complex });
  };

  const handleBackToList = () => {
    setCurrentView({ name: 'list' });
  };
  
  const renderContent = () => {
    switch (currentView.name) {
      case 'list':
        return <SportComplexList onSelectComplex={handleSelectComplex} />;
      case 'detail':
        return <SportComplexDetail complex={currentView.complex} onBack={handleBackToList} />;
      case 'teambuilder':
        return <TeamBuilder />;
      default:
        return <SportComplexList onSelectComplex={handleSelectComplex} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header setCurrentView={setCurrentView} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
