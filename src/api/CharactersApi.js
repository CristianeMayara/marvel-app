import axios from "axios";

export const API_URL = "https://gateway.marvel.com/v1/public";
export const PUBLIC_KEY = "61b3718379b402015d07a795a0819042";
export const MD5_HASH = "4278f84468205addf2f28cabe5e038a8";

export const CHARACTERS_URL = "/characters";
export const SERIES_URL = "/series";

export const fetchCharactersApi = async () => {
  const url = `${API_URL}${CHARACTERS_URL}?apikey=${PUBLIC_KEY}&hash=${MD5_HASH}&ts=1&limit=100`;

  return await axios.get(url);
};
