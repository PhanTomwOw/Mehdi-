
import React, { useState } from 'react';
import type { SportComplex, TimeSlot } from '../types';
import { LocationIcon, StarIcon, ClockIcon } from './IconComponents';
import BookingModal from './BookingModal';

interface SportComplexDetailProps {
  complex: SportComplex;
  onBack: () => void;
}

const SportComplexDetail: React.FC<SportComplexDetailProps> = ({ complex, onBack }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(complex.availableTimeSlots);

    const handleTimeSlotClick = (slot: TimeSlot) => {
        if (!slot.isBooked) {
            setSelectedTimeSlot(slot);
            setIsModalOpen(true);
        }
    };

    const handleConfirmBooking = () => {
        if(selectedTimeSlot){
            const updatedSlots = timeSlots.map(slot => 
                slot.time === selectedTimeSlot.time ? { ...slot, isBooked: true } : slot
            );
            setTimeSlots(updatedSlots);
            alert(`Booking confirmed for ${selectedTimeSlot.time} at ${complex.name}!`);
        }
        setIsModalOpen(false);
        setSelectedTimeSlot(null);
    };

    return (
        <div className="container mx-auto px-6 py-12">
             <button onClick={onBack} className="mb-8 text-emerald-600 font-semibold hover:underline">
                &larr; Back to all complexes
            </button>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-3">
                        <img src={complex.imageUrl} alt={complex.name} className="w-full h-64 md:h-full object-cover"/>
                    </div>
                    <div className="md:col-span-2 p-8">
                        <h1 className="text-3xl font-bold text-gray-800">{complex.name}</h1>
                        <div className="flex items-center my-3 text-lg">
                           <StarIcon className="w-6 h-6 text-yellow-400 mr-2" />
                           <span className="font-bold text-gray-700">{complex.rating.toFixed(1)}</span>
                           <span className="text-gray-500 ml-2">Rating</span>
                        </div>
                        <div className="flex items-start text-gray-600 my-4">
                            <LocationIcon className="w-5 h-5 mr-3 mt-1 text-gray-400 flex-shrink-0" />
                            <span>{complex.address}</span>
                        </div>
                        <p className="text-gray-600 mt-4 leading-relaxed">{complex.description}</p>
                        
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">Available Sports</h3>
                             <div className="flex flex-wrap gap-2">
                                {complex.sports.map(sport => (
                                    <span key={sport} className="bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1.5 rounded-full">{sport}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-8 border-t border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center"><ClockIcon className="w-7 h-7 mr-3 text-emerald-500"/>Available Time Slots</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {timeSlots.map(slot => (
                             <button
                                key={slot.time}
                                onClick={() => handleTimeSlotClick(slot)}
                                disabled={slot.isBooked}
                                className={`p-4 rounded-lg text-center font-semibold transition-all duration-200 border-2
                                    ${slot.isBooked 
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-200' 
                                        : 'bg-white border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white hover:shadow-lg'
                                    }`}
                            >
                                {slot.time}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <BookingModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmBooking}
                complex={complex}
                timeSlot={selectedTimeSlot}
            />
        </div>
    );
};

export default SportComplexDetail;
