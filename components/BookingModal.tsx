
import React from 'react';
import type { TimeSlot, SportComplex } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  complex: SportComplex | null;
  timeSlot: TimeSlot | null;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, onConfirm, complex, timeSlot }) => {
  if (!isOpen || !complex || !timeSlot) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity">
      <div className="bg-white rounded-xl shadow-2xl p-8 m-4 max-w-md w-full transform transition-all scale-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Confirm Your Booking</h2>
        <p className="text-gray-600 mb-2">
          You are about to book a slot at <span className="font-semibold text-emerald-600">{complex.name}</span>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg my-6">
            <p className="text-gray-800"><span className="font-semibold">Time:</span> {timeSlot.time}</p>
            <p className="text-gray-800 mt-1"><span className="font-semibold">Address:</span> {complex.address}</p>
        </div>
        <p className="text-sm text-gray-500 mb-6">A confirmation will be sent to your account. Please ensure your details are correct.</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-lg text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
