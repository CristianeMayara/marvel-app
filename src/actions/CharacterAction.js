import {
  FETCH_CHARACTERS,
  FETCH_CHARACTERS_ERROR,
  FETCH_CHARACTERS_SUCCESS,
  FETCH_CHARACTER,
  FETCH_CHARACTER_ERROR,
  FETCH_CHARACTER_SUCCESS,
  FETCH_SERIES,
  FETCH_SERIES_ERROR,
  FETCH_SERIES_SUCCESS
} from "../actions/actionTypes";
import { fetchCharacterApi, fetchCharactersApi } from "../api/CharactersApi";

export function fetchCharacters() {
  return async dispatch => {
    dispatch({ type: FETCH_CHARACTERS });

    try {
      let res = await fetchCharactersApi();

      dispatch({
        type: FETCH_CHARACTERS_SUCCESS,
        payload: res.data.data.results
      });
    } catch (err) {
      dispatch({ type: FETCH_CHARACTERS_ERROR });
    }
  };
}

export function fetchCharacter(id) {
  return async dispatch => {
    dispatch({ type: FETCH_CHARACTER });

    try {
      let res = await fetchCharacterApi(id);

      dispatch({
        type: FETCH_CHARACTER_SUCCESS,
        payload: res.data.data.results[0]
      });
    } catch (err) {
      dispatch({ type: FETCH_CHARACTER_ERROR });
    }
  };
}

export function fetchSeries(id) {
  return async dispatch => {
    dispatch({ type: FETCH_SERIES });

    try {
      let res = await fetchCharacterApi(id);

      dispatch({
        type: FETCH_SERIES_SUCCESS,
        payload: res.data.data.results[0].series
      });
    } catch (err) {
      dispatch({ type: FETCH_SERIES_ERROR });
    }
  };
}
