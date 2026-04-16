export interface Flight {
  id: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  departureTime: Date;
  arrivalTime: Date;
  price: number;
  airline: string;
  flightNumber: string;
  duration: string;
}

export interface Booking {
  id: string;
  flight: Flight;
  passengerName: string;
  seatNumber?: string;
  status: 'confirmed' | 'checked-in' | 'cancelled';
  bookingDate: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
