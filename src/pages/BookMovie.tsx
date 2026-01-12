import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { movies, showtimes } from "@/data/movies";
import { useBooking } from "@/contexts/BookingContext";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { PaymentForm } from "@/components/PaymentForm";
import { Calendar, Clock, Users, ArrowLeft, CheckCircle } from "lucide-react";

export default function BookMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addBooking, bookedSeats } = useBooking();
  const { isAuthenticated, isAdmin } = useAuth();
  
  const movie = movies.find(m => m.id === id);
  
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [step, setStep] = useState(1);

  // Generate next 7 days
  const dates = useMemo(() => {
    const result = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      result.push({
        value: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' })
      });
    }
    return result;
  }, []);

  // Get already booked seats for selected showtime
  const alreadyBooked = useMemo(() => {
    if (!movie || !selectedDate || !selectedTime) return [];
    const key = `${movie.id}_${selectedDate}_${selectedTime}`;
    return bookedSeats[key] || [];
  }, [movie, selectedDate, selectedTime, bookedSeats]);

  const totalSeats = 48; // 6 rows x 8 seats
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];

  const handleSeatClick = (seatNumber: number) => {
    if (alreadyBooked.includes(seatNumber)) return;
    
    setSelectedSeats(prev => 
      prev.includes(seatNumber) 
        ? prev.filter(s => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handlePaymentSuccess = () => {
    if (!movie || selectedSeats.length === 0) return;

    addBooking({
      movieId: movie.id,
      movieTitle: movie.title,
      seats: selectedSeats,
      date: selectedDate,
      time: selectedTime,
      totalPrice: selectedSeats.length * movie.price
    });

    setStep(4);
  };

  if (!movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Movie not found</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-md text-center">
            <div className="cinema-card p-8">
              <Users className="w-16 h-16 mx-auto text-primary mb-4" />
              <h2 className="font-display text-2xl mb-2">Login Required</h2>
              <p className="text-muted-foreground mb-6">Please login to book tickets</p>
              <Button onClick={() => navigate('/login')} className="cinema-button">
                Go to Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-md text-center">
            <div className="cinema-card p-8">
              <Users className="w-16 h-16 mx-auto text-destructive mb-4" />
              <h2 className="font-display text-2xl mb-2">Admin Cannot Book</h2>
              <p className="text-muted-foreground mb-6">Admins cannot book tickets. Please use a user account.</p>
              <Button onClick={() => navigate('/admin')} className="cinema-button">
                Go to Admin Panel
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Payment Step
  if (step === 3) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-12 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl text-foreground">{movie.title}</h2>
              <p className="text-muted-foreground">{selectedDate} at {selectedTime} • {selectedSeats.length} seat(s)</p>
            </div>
            <PaymentForm 
              amount={selectedSeats.length * movie.price}
              onSuccess={handlePaymentSuccess}
              onBack={() => setStep(2)}
            />
          </div>
        </div>
      </div>
    );
  }

  // Success Step
  if (step === 4) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-md text-center">
            <div className="cinema-card p-8 animate-fade-in">
              <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="font-display text-3xl mb-2 text-foreground">Payment Successful!</h2>
              <p className="text-muted-foreground mb-6">Your tickets have been booked and paid for</p>
              
              <div className="text-left space-y-3 p-4 rounded-lg bg-secondary/50 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Movie</span>
                  <span className="font-medium">{movie.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Seats</span>
                  <span className="font-medium">{selectedSeats.length} seat(s)</span>
                </div>
                <div className="flex justify-between border-t border-border pt-3">
                  <span className="text-muted-foreground">Total Paid</span>
                  <span className="font-display text-xl text-primary">${selectedSeats.length * movie.price}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button onClick={() => navigate('/my-bookings')} className="w-full cinema-button">
                  View My Bookings
                </Button>
                <Button onClick={() => navigate('/')} variant="ghost" className="w-full">
                  Back to Movies
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 pb-12">
        {/* Movie Header */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src={movie.image} 
            alt={movie.title}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="container mx-auto">
              <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <h1 className="font-display text-4xl text-foreground">{movie.title}</h1>
              <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                <span>{movie.genre}</span>
                <span>•</span>
                <span>{movie.duration}</span>
                <span>•</span>
                <span className="text-primary font-medium">${movie.price}/ticket</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 mt-8">
          {step === 1 && (
            <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
              {/* Date Selection */}
              <div>
                <h3 className="font-display text-xl mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Select Date
                </h3>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {dates.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => setSelectedDate(d.value)}
                      className={`flex-shrink-0 w-20 p-4 rounded-xl border transition-all ${
                        selectedDate === d.value 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border bg-card hover:border-primary/50'
                      }`}
                    >
                      <p className="text-xs text-muted-foreground">{d.day}</p>
                      <p className="font-display text-2xl text-foreground">{d.date}</p>
                      <p className="text-xs text-muted-foreground">{d.month}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div>
                <h3 className="font-display text-xl mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Select Time
                </h3>
                <div className="flex flex-wrap gap-3">
                  {showtimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-6 py-3 rounded-lg border transition-all ${
                        selectedTime === time 
                          ? 'border-primary bg-primary/10 text-foreground' 
                          : 'border-border bg-card hover:border-primary/50 text-muted-foreground'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <Button 
                onClick={() => setStep(2)}
                disabled={!selectedDate || !selectedTime}
                className="w-full cinema-button"
              >
                Continue to Seat Selection
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="max-w-3xl mx-auto animate-fade-in">
              {/* Screen */}
              <div className="mb-8 text-center">
                <div className="h-2 bg-primary/50 rounded-full mx-auto max-w-md mb-2" 
                     style={{ boxShadow: '0 0 30px hsl(43 74% 49% / 0.5)' }} />
                <p className="text-xs text-muted-foreground">SCREEN</p>
              </div>

              {/* Seats */}
              <div className="grid gap-4 mb-8">
                {rows.map((row, rowIndex) => (
                  <div key={row} className="flex items-center justify-center gap-2">
                    <span className="w-6 text-sm text-muted-foreground">{row}</span>
                    <div className="flex gap-2">
                      {Array.from({ length: 8 }, (_, colIndex) => {
                        const seatNumber = rowIndex * 8 + colIndex + 1;
                        const isBooked = alreadyBooked.includes(seatNumber);
                        const isSelected = selectedSeats.includes(seatNumber);
                        
                        return (
                          <button
                            key={seatNumber}
                            onClick={() => handleSeatClick(seatNumber)}
                            disabled={isBooked}
                            className={`seat ${
                              isBooked 
                                ? 'seat-booked' 
                                : isSelected 
                                  ? 'seat-selected' 
                                  : 'seat-available'
                            }`}
                          />
                        );
                      })}
                    </div>
                    <span className="w-6 text-sm text-muted-foreground">{row}</span>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex justify-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="seat seat-available" />
                  <span className="text-xs text-muted-foreground">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="seat seat-selected" />
                  <span className="text-xs text-muted-foreground">Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="seat seat-booked" />
                  <span className="text-xs text-muted-foreground">Booked</span>
                </div>
              </div>

              {/* Summary */}
              <div className="cinema-card p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Selected Seats</p>
                    <p className="font-medium">{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total Price</p>
                    <p className="font-display text-2xl text-primary">${selectedSeats.length * movie.price}</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button variant="ghost" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button 
                    onClick={() => setStep(3)}
                    disabled={selectedSeats.length === 0}
                    className="flex-1 cinema-button"
                  >
                    Proceed to Payment
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
