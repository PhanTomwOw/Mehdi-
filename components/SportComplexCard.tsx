
import React from 'react';
import type { SportComplex } from '../types';
import { LocationIcon, StarIcon } from './IconComponents';

interface SportComplexCardProps {
  complex: SportComplex;
  onSelect: (complex: SportComplex) => void;
}

const SportComplexCard: React.FC<SportComplexCardProps> = ({ complex, onSelect }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
      <div className="relative">
        <img className="w-full h-48 object-cover" src={complex.imageUrl} alt={`Image of ${complex.name}`} />
        <div className="absolute top-0 right-0 bg-emerald-500 text-white px-3 py-1 m-3 rounded-full text-sm font-semibold flex items-center gap-1">
          <StarIcon className="w-4 h-4" />
          <span>{complex.rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{complex.name}</h3>
        <div className="flex items-center text-gray-500 mb-4">
          <LocationIcon className="w-5 h-5 mr-2 text-gray-400" />
          <p className="text-sm truncate">{complex.address}</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
            {complex.sports.slice(0,3).map(sport => (
                <span key={sport} className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-1 rounded-full">{sport}</span>
            ))}
        </div>
        <button
          onClick={() => onSelect(complex)}
          className="w-full bg-gray-800 text-white py-2.5 rounded-lg font-semibold hover:bg-emerald-600 transition-all duration-300 transform group-hover:scale-105"
        >
          View & Book
        </button>
      </div>
    </div>
  );
};

export default SportComplexCard;
