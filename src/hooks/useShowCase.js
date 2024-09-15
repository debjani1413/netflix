import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TMDB_API_URL, TMDB_OPTIONS } from "../services/tmdb";
import { setShowCase } from '../stores/showCaseSlice';

/**
 * Custom hook to fetch movie data and update the Redux store.
 *
 * This hook fetches multiple types of data for the showcase (Hero Banner) using the provided endpoint, genre ID, and original language,
 * and updates the Redux store using the setShowCase action.
 *
 * @param {string} endpoint - The endpoint to fetch data from.
 * @param {string} showCaseState - The showCase state to update in the Redux store (e.g., landingPage, movie, tvShow).
 * @param {number} genreId - Optional. The genre ID for filtering data.
 * @param {string} originalLanguage - Optional. The original language for filtering data.
 * @param {number} showIndex - Optional. Specific index of fetched data.
 * @returns {void}
 * @example
 * const endpoint = 'popular'; // Endpoint for popular movie/tv-show
 * const showCaseState = 'movie'; // ShowCase state: landingPage, movie, tvShow, etc.
 * const genreId = 28; // Genre ID for Action (optional)
 * const originalLanguage = 'en'; // Original language (optional)
 * const showIndex = 0; // Index of fetched data (optional)
 * useMovie(endpoint, showCaseState, genreId, originalLanguage, showIndex);
 */
const useShowCase = (endpoint, showCaseState, genreId, originalLanguage, showIndex = 0) => {
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      let apiUrl = `${TMDB_API_URL}/discover/movie?language=en-US&page=1`;

      if (genreId) {
        apiUrl += `&with_genres=${genreId}`;
      }

      if (originalLanguage) {
        apiUrl += `&with_original_language=${originalLanguage}`;
      }

      // Fetch data for {showCaseState}
      const response = await fetch(apiUrl, TMDB_OPTIONS);
      const result = await response.json();

      console.log('Fetch Result:', result); // Log the result to inspect

      if (result.results && Array.isArray(result.results)) {
        // Ensure showIndex is within bounds
        if (showIndex < result.results.length) {
          const showCaseFilter = result.results[showIndex];
          console.log('ShowCase Filter:', showCaseFilter); // Log showCaseFilter

          if (showCaseFilter && showCaseFilter.id) {
            // Fetch videos for showCaseFilter.id
            const videoResponse = await fetch(`${TMDB_API_URL}/movie/${showCaseFilter.id}/videos?language=en-US&page=1`, TMDB_OPTIONS);
            const videoResult = await videoResponse.json();

            console.log('Video Result:', videoResult); // Log videoResult

            const showCaseResult = {
              info: showCaseFilter,
              videos: videoResult
            }

            dispatch(setShowCase({ showCaseState, showCaseData: showCaseResult }));
          } else {
            console.warn('showCaseFilter or showCaseFilter.id is undefined');
          }
        } else {
          console.warn('showIndex is out of bounds');
        }
      } else {
        console.warn('Results is not an array or is undefined');
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [endpoint, showCaseState, genreId, originalLanguage, showIndex, dispatch]); // Add dependencies

  return null;
}

export default useShowCase;
