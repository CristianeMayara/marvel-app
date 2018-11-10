import {
  FETCH_CHARACTERS,
  FETCH_CHARACTERS_ERROR,
  FETCH_CHARACTERS_SUCCESS
} from "../actions/actionTypes";
import { fetchCharactersApi } from "../api/CharactersApi";

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
