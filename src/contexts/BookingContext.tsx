import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Booking } from '@/types/movie';

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  getBookingsForUser: () => Booking[];
  bookedSeats: Record<string, number[]>; // movieId_date_time -> seats
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('cinema_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  const [bookedSeats, setBookedSeats] = useState<Record<string, number[]>>(() => {
    const saved = localStorage.getItem('cinema_booked_seats');
    return saved ? JSON.parse(saved) : {};
  });

  const addBooking = (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      createdAt: new Date()
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem('cinema_bookings', JSON.stringify(updatedBookings));

    // Update booked seats
    const key = `${booking.movieId}_${booking.date}_${booking.time}`;
    const updatedBookedSeats = {
      ...bookedSeats,
      [key]: [...(bookedSeats[key] || []), ...booking.seats]
    };
    setBookedSeats(updatedBookedSeats);
    localStorage.setItem('cinema_booked_seats', JSON.stringify(updatedBookedSeats));
  };

  const getBookingsForUser = () => bookings;

  return (
    <BookingContext.Provider value={{
      bookings,
      addBooking,
      getBookingsForUser,
      bookedSeats
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
}
