import axios from "axios";
import { urlForApi } from "./constants";

export function getCharacters() {
  axios.get(urlForApi.character);
  /*
    .then((response) => console.log(response.data.results))
    .catch((error) => console.error(error));
    */
}

export function getLocations() {
  axios
    .get(urlForApi.location)
    .then((response) => console.log(response.data))
    .catch((error) => console.error(error));
}
