import { useBooking } from "@/contexts/BookingContext";
import { Navbar } from "@/components/Navbar";
import { Ticket, Calendar, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function MyBookings() {
  const { bookings } = useBooking();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="font-display text-4xl text-foreground mb-2">My Bookings</h1>
          <p className="text-muted-foreground mb-8">View your ticket history</p>

          {bookings.length === 0 ? (
            <div className="cinema-card p-12 text-center">
              <Ticket className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="font-display text-2xl mb-2">No Bookings Yet</h2>
              <p className="text-muted-foreground mb-6">Start by booking your first movie!</p>
              <Link to="/">
                <Button className="cinema-button">Browse Movies</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="cinema-card p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="font-display text-2xl text-foreground">{booking.movieTitle}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>Screen 1</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-xs text-muted-foreground">Seats</p>
                        <p className="font-medium">{booking.seats.join(', ')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Total</p>
                        <p className="font-display text-xl text-primary">${booking.totalPrice}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
