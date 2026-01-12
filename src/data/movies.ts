import { Movie } from "@/types/movie";

export const movies: Movie[] = [
  {
    id: "1",
    title: "Dune: Part Two",
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    image: "/movies/dune.jpg",
    price: 15,
    genre: "Sci-Fi",
    duration: "2h 46m",
    rating: "PG-13"
  },
  {
    id: "2",
    title: "Oppenheimer",
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    image: "/movies/oppenheimer.jpg",
    price: 14,
    genre: "Drama",
    duration: "3h 0m",
    rating: "R"
  },
  {
    id: "3",
    title: "The Batman",
    description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate.",
    image: "/movies/batman.jpg",
    price: 13,
    genre: "Action",
    duration: "2h 56m",
    rating: "PG-13"
  },
  {
    id: "4",
    title: "Avatar: The Way of Water",
    description: "Jake Sully lives with his newfound family on Pandora. When a familiar threat returns, Jake must work with Neytiri.",
    image: "/movies/avatar.jpg",
    price: 16,
    genre: "Sci-Fi",
    duration: "3h 12m",
    rating: "PG-13"
  },
  {
    id: "5",
    title: "Top Gun: Maverick",
    description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past.",
    image: "/movies/topgun.jpg",
    price: 14,
    genre: "Action",
    duration: "2h 11m",
    rating: "PG-13"
  },
  {
    id: "6",
    title: "Spider-Man: No Way Home",
    description: "Peter Parker seeks Doctor Strange's help to make the world forget he is Spider-Man, but the spell goes wrong.",
    image: "/movies/spiderman.jpg",
    price: 13,
    genre: "Action",
    duration: "2h 28m",
    rating: "PG-13"
  }
];

export const showtimes = [
  "10:00 AM",
  "1:30 PM",
  "4:00 PM",
  "7:00 PM",
  "10:30 PM"
];
