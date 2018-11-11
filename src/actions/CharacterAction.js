import {
  FETCH_CHARACTERS,
  FETCH_CHARACTERS_ERROR,
  FETCH_CHARACTERS_SUCCESS,
  FETCH_CHARACTER,
  FETCH_CHARACTER_ERROR,
  FETCH_CHARACTER_SUCCESS,
  FETCH_SERIES,
  FETCH_SERIES_ERROR,
  FETCH_SERIES_SUCCESS,
  SEARCH_CHARACTERS,
  SEARCH_CHARACTERS_ERROR,
  SEARCH_CHARACTERS_SUCCESS,
  EDIT_CHARACTER,
  EDIT_CHARACTER_ERROR,
  EDIT_CHARACTER_SUCCESS
} from "../actions/actionTypes";
import {
  fetchCharacterApi,
  fetchCharactersApi,
  searchCharactersApi
} from "../api/CharactersApi";

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
      let character = res.data.data.results[0];
      let settings = localStorage.getItem("character-" + id);

      character.settings = settings
        ? JSON.parse(settings)
        : {
            name: "",
            picture: ""
          };

      dispatch({
        type: FETCH_CHARACTER_SUCCESS,
        payload: character
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

export function searchCharacters(name) {
  return async dispatch => {
    dispatch({ type: SEARCH_CHARACTERS });

    try {
      let res = await searchCharactersApi(name);

      dispatch({
        type: SEARCH_CHARACTERS_SUCCESS,
        payload: res.data.data.results
      });
    } catch (err) {
      dispatch({ type: SEARCH_CHARACTERS_ERROR });
    }
  };
}

export function editCharacter(character, settings) {
  return async dispatch => {
    dispatch({ type: EDIT_CHARACTER });

    try {
      localStorage.setItem(
        "character-" + character.id,
        JSON.stringify(settings)
      );
      character.settings = settings;

      dispatch({ type: EDIT_CHARACTER_SUCCESS, payload: character });
    } catch (err) {
      dispatch({ type: EDIT_CHARACTER_ERROR });
    }
  };
}
