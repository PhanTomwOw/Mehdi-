
export interface TimeSlot {
  time: string;
  isBooked: boolean;
}

export interface SportComplex {
  id: number;
  name: string;
  address: string;
  sports: string[];
  description: string;
  imageUrl: string;
  rating: number;
  availableTimeSlots: TimeSlot[];
}
