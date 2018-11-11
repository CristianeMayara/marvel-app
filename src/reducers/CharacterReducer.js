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
  FETCH_SERIES_ERROR,
  SEARCH_CHARACTERS,
  SEARCH_CHARACTERS_SUCCESS,
  SEARCH_CHARACTERS_ERROR
} from "../actions/actionTypes";

const INITIAL_STATE = {
  page: 0,
  characterList: {
    error: false,
    loading: false,
    characters: []
  },
  editCharacter: {
    error: false,
    loading: false,
    character: {}
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
          characters: state.characterList.characters
        }
      };

    case FETCH_CHARACTERS_SUCCESS:
      let characters = state.characterList.characters;
      characters = characters.concat(action.payload);

      return {
        ...state,
        page: state.page + 1,
        characterList: {
          characters,
          error: false,
          loading: false
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

    case FETCH_CHARACTER:
      return {
        ...state,
        editCharacter: {
          error: false,
          loading: true,
          character: {}
        }
      };

    case FETCH_CHARACTER_SUCCESS:
      return {
        ...state,
        editCharacter: {
          error: false,
          loading: false,
          character: action.payload
        }
      };

    case FETCH_CHARACTER_ERROR:
      return {
        ...state,
        editCharacter: {
          error: true,
          loading: false,
          characters: {}
        }
      };

    case FETCH_SERIES:
      return {
        ...state,
        serieList: {
          error: false,
          loading: true,
          series: []
        }
      };

    case FETCH_SERIES_SUCCESS:
      return {
        ...state,
        serieList: {
          error: false,
          loading: false,
          series: action.payload
        }
      };

    case FETCH_SERIES_ERROR:
      return {
        ...state,
        serieList: {
          error: true,
          loading: false,
          series: []
        }
      };

    case SEARCH_CHARACTERS:
      return {
        ...state,
        characterList: {
          error: false,
          loading: true,
          characters: []
        }
      };

    case SEARCH_CHARACTERS_SUCCESS:
      return {
        ...state,
        // page: state.page + 1,
        characterList: {
          error: false,
          loading: false,
          characters: action.payload
        }
      };

    case SEARCH_CHARACTERS_ERROR:
      return {
        ...state,
        characterList: {
          error: true,
          loading: false,
          characters: []
        }
      };

    case EDIT_CHARACTER:
      return {
        ...state,
        editCharacter: {
          error: false,
          loading: true,
          character: {}
        }
      };

    case EDIT_CHARACTER_SUCCESS:
      return {
        ...state,
        editCharacter: {
          error: false,
          loading: false,
          character: action.payload
        }
      };

    case EDIT_CHARACTER_ERROR:
      return {
        ...state,
        editCharacter: {
          error: true,
          loading: false,
          characters: {}
        }
      };

    default:
      return state;
  }
}
