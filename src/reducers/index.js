import { combineReducers } from "redux";
import Character from "./CharacterReducer";

export default combineReducers({
  characterStore: Character
});
