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

export const getCharacterApiInfoCount = async (
  url: string,
  selectedIpi: any,
  isPopupOpen: any
) => {
  isPopupOpen(true);
  axios
    .get("https://rickandmortyapi.com/api/character")
    .then(function (response) {
      selectedIpi(response.data.info.count);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      isPopupOpen(false);
    });
};
