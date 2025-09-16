
import React from 'react';
import type { SportComplex } from '../types';
import SportComplexCard from './SportComplexCard';
import Spinner from './Spinner';
import { useSportsData } from '../hooks/useSportsData';

interface SportComplexListProps {
  onSelectComplex: (complex: SportComplex) => void;
}

const SportComplexList: React.FC<SportComplexListProps> = ({ onSelectComplex }) => {
  const { complexes, isLoading, error } = useSportsData();

  const renderContent = () => {
    if (isLoading) {
      return <Spinner />;
    }

    if (error) {
      return <div className="text-center py-10 px-4 bg-red-100 text-red-700 rounded-lg">{error}</div>;
    }

    if (complexes.length === 0) {
      return <div className="text-center py-10 text-gray-500">No sports complexes found.</div>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {complexes.map((complex) => (
          <SportComplexCard key={complex.id} complex={complex} onSelect={onSelectComplex} />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Find Your Arena</h1>
        <p className="text-lg text-gray-500 mt-2">Explore and book the best sports facilities in Tabriz.</p>
      </div>
      {renderContent()}
    </div>
  );
};

export default SportComplexList;
