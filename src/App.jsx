/* eslint-disable react/prop-types */
import { useState} from "react";
import { useMovies } from "./Hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import { Search } from "./Search";
import { Box } from "./Box";
import { MovieDetails } from "./MovieDetails";
import { WatchedSummary } from "./WatchedSummary";
import { MovieList } from "./MovieList";
import { WatchedMovieList } from "./WatchedMovieList";
import { Main } from "./Main.1";
import { NumResults } from "./NumResults";
import { Loader } from "./Loader";
import { ErrorMessage } from "./ErrorMessage";
import { NavBar } from "./NavBar";

export const KEY = 'd0c62ab4';

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const {movies, isLoading, error} = useMovies(query)
  
  const [watched, setWatched] = useLocalStorageState([],"watched");
  
  function handleSelectMovie(id) {
    setSelectedId(selectedId => id === selectedId ? null : id);
  }

  function closeMovieHandler() {
    setSelectedId(null);
  }

  function handleAddWatch(movie) {
    setWatched(watched => [...watched, movie])
  }

  function handleDeleteWatched(id) {
    setWatched(watched => watched.filter((movie) => movie.imdbID !== id))
  }
  
  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {
            selectedId ? <MovieDetails selectedId={selectedId} onCloseMovie={closeMovieHandler} onAddWatched={handleAddWatch} watched={watched} /> :
              <>
                <WatchedSummary watched={watched} />
                <WatchedMovieList watched={watched} onDeleteWatched={handleDeleteWatched} />
              </>
          }
        </Box>
      </Main>
    </>
  );
}
