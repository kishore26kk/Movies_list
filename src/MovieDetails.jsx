import { useState, useEffect, useRef } from "react";
import StarRating from './StarRating';
import { useKey } from "./hooks/useKey";
import { KEY } from "./App";
import { Loader } from "./Loader";

export function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");


  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating;

  const {
    Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre
  } = movie;

  useKey('Escape', onCloseMovie);

  useEffect(function () {
    setIsLoading(true);
    async function getMoviesDetails() {
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
      const data = await res.json();
      setIsLoading(false);
      setMovie(data);
    }
    getMoviesDetails();
  }, [selectedId]);

  useEffect(function () {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => {
      document.title = 'usePopcorn';
    };
  }, [title]);

  function handleAdd() {
    const newMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: +imdbRating,
      runtime: +runtime.split(" ").at(0),
      userRating,
      countRatingDecisions: countRef,
    };

    onAddWatched(newMovie);
    onCloseMovie();
  }

  return (
    <div className="details">
      {isLoading ? <Loader /> :
        <>
          <header>
            <div className="btn-back" onClick={onCloseMovie}>&larr;</div>
            <img src={poster} alt={`Poster of ${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>{released} &bull; {runtime}</p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ?
                <>
                  <StarRating maxRating={10} size={24} onRateMovie={setUserRating} />
                  {userRating > 0 && <button className="btn-add" onClick={handleAdd}>+ Add to list</button>}
                </>
                :
                <p>You rated with movie {watchedUserRating} ⭐</p>}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>}
    </div>
  );
}
