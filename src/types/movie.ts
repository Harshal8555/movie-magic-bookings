export interface Movie {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  genre: string;
  duration: string;
  rating: string;
}

export interface Booking {
  id: string;
  movieId: string;
  movieTitle: string;
  seats: number[];
  date: string;
  time: string;
  totalPrice: number;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}
