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
  FETCH_EVENTS,
  FETCH_EVENTS_ERROR,
  FETCH_EVENTS_SUCCESS,
  FETCH_STORIES,
  FETCH_STORIES_ERROR,
  FETCH_STORIES_SUCCESS,
  SEARCH_CHARACTERS,
  SEARCH_CHARACTERS_ERROR,
  SEARCH_CHARACTERS_SUCCESS,
  EDIT_CHARACTER,
  EDIT_CHARACTER_ERROR,
  EDIT_CHARACTER_SUCCESS
} from "../actions/actionTypes";
import {
  fetchEventsApi,
  fetchSeriesApi,
  fetchStoriesApi,
  fetchCharacterApi,
  fetchCharactersApi,
  searchCharactersApi
} from "../api/CharactersApi";

export function fetchCharacters(page) {
  return async dispatch => {
    if (page === 0) dispatch({ type: FETCH_CHARACTERS });

    try {
      let res = await fetchCharactersApi(page);
      let characters = res.data.data.results;
      let newCharacters = [];

      for (let i = 0; i < characters.length; i++) {
        let character = characters[i];
        let settings = localStorage.getItem("character-" + character.id);

        character.settings = settings
          ? JSON.parse(settings)
          : {
              name: "",
              picture: ""
            };
        newCharacters.push(character);
      }

      dispatch({
        type: FETCH_CHARACTERS_SUCCESS,
        payload: newCharacters
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
      let res = await fetchSeriesApi(id);

      dispatch({
        type: FETCH_SERIES_SUCCESS,
        payload: res.data.data.results
      });
    } catch (err) {
      dispatch({ type: FETCH_SERIES_ERROR });
    }
  };
}

export function fetchEvents(id) {
  return async dispatch => {
    dispatch({ type: FETCH_EVENTS });

    try {
      let res = await fetchEventsApi(id);

      dispatch({
        type: FETCH_EVENTS_SUCCESS,
        payload: res.data.data.results
      });
    } catch (err) {
      dispatch({ type: FETCH_EVENTS_ERROR });
    }
  };
}

export function fetchStories(id) {
  return async dispatch => {
    dispatch({ type: FETCH_STORIES });

    try {
      let res = await fetchStoriesApi(id);

      dispatch({
        type: FETCH_STORIES_SUCCESS,
        payload: res.data.data.results
      });
    } catch (err) {
      dispatch({ type: FETCH_STORIES_ERROR });
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
