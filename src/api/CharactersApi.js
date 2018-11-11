import axios from "axios";

export const API_URL = "https://gateway.marvel.com/v1/public";
export const PUBLIC_KEY = "61b3718379b402015d07a795a0819042";
export const MD5_HASH = "4278f84468205addf2f28cabe5e038a8";

export const CHARACTERS_PATH = "/characters";
export const SERIES_PATH = "/series";

export const fetchCharactersApi = async page => {
  const url = `${API_URL}${CHARACTERS_PATH}?apikey=${PUBLIC_KEY}&hash=${MD5_HASH}&ts=1&limit=100&offset=${page *
    100}`;

  return await axios.get(url);
};

export const fetchCharacterApi = async id => {
  const url = `${API_URL}${CHARACTERS_PATH}/${id}?apikey=${PUBLIC_KEY}&hash=${MD5_HASH}&ts=1`;

  return await axios.get(url);
};

export const fetchSeriesApi = async id => {
  const url = `${API_URL}${CHARACTERS_PATH}/${id}${SERIES_PATH}?apikey=${PUBLIC_KEY}&hash=${MD5_HASH}&ts=1&limit=100`;

  return await axios.get(url);
};

export const searchCharactersApi = async name => {
  const url = `${API_URL}${CHARACTERS_PATH}?nameStartsWith=${name}&apikey=${PUBLIC_KEY}&hash=${MD5_HASH}&ts=1&limit=100`;

  return await axios.get(url);
};
