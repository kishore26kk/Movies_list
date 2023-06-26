import {useState,useEffect} from 'react';

const KEY = 'd0c62ab4';

export function useMovies(query){
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    useEffect(function () {
        const controller = new AbortController();
        const fetchMovie = async () => {
          try {
            setIsLoading(true);
            setError('');
            const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
              { signal: controller.signal }
            )
            if (!res.ok) {  
              throw new Error("Something went wrong while fetching movies")
            }
            const data = await res.json();
            if (data.Response === 'False') throw new Error("Movie not found");
            console.log(data);
            setMovies(data.Search);
            setError('');
          }
          catch (err) {
            if (err.name !== 'AbortError') {
              setError(err.message);
            }
          }
          finally {
            setIsLoading(false);
          }
        }
        if (query.length < 3) {
          setMovies([]);
          setError('');
          return;
        }
        
        fetchMovie();
        return () => {
          controller.abort();
        }
      }, [query])
      
      return {
        movies, isLoading, error
      }
}