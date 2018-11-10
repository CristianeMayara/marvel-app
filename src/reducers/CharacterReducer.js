import {
  FETCH_CHARACTER,
  FETCH_CHARACTER_SUCCESS,
  FETCH_CHARACTER_ERROR,
  FETCH_CHARACTERS,
  FETCH_CHARACTERS_SUCCESS,
  FETCH_CHARACTERS_ERROR,
  EDIT_CHARACTER,
  EDIT_CHARACTER_SUCCESS,
  EDIT_CHARACTER_ERROR,
  FETCH_SERIES,
  FETCH_SERIES_SUCCESS,
  FETCH_SERIES_ERROR
} from "../actions/actionTypes";

const INITIAL_STATE = {
  characterList: {
    error: false,
    loading: false,
    characters: []
  }
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_CHARACTERS:
      return {
        ...state,
        characterList: {
          error: false,
          loading: true,
          characters: []
        }
      };

    case FETCH_CHARACTERS_SUCCESS:
      return {
        ...state,
        characterList: {
          error: false,
          loading: false,
          characters: action.payload
        }
      };

    case FETCH_CHARACTERS_ERROR:
      return {
        ...state,
        characterList: {
          error: true,
          loading: false,
          characters: []
        }
      };

    default:
      return state;
  }
}