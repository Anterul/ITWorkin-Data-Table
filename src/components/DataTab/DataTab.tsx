import { useEffect, useState } from "react";
import * as Api from "../../utils/Api";
import Customer from "../Customer/Customer";
import { urlForApi } from "../../utils/constants";
import axios from "axios";
import "./DataTab.scss";
import PaginationBar from "../PaginationBar/PaginationBar";
import LoadingPopup from "../LoadingPopup/LoadingPopup";

function DataTab() {
  // стейт для массива с персонажами
  const [characters, setCharacters] = useState<any[]>([]);

  // стейт для массива с локациями
  const [locations, setLocations] = useState([]);

  // количество отбражаемых строк
  const [elementsToDisplay, setElementsToDisplay] = useState(15);

  // счетчик постов с api/character
  const [totalAvailabeCharacters, setTotalAvailableCharacters] = useState(0);

  // счетчик общего количества страниц с учетом rows per page(округление в +)
  function countPagesNumber(selectedApiCount: number): number {
    return Math.ceil(selectedApiCount / elementsToDisplay);
  }

  let countPagesNumberForCharacters: number = countPagesNumber(
    totalAvailabeCharacters
  );

  // количество загруженных постов
  let totalLoadedCharacters: number = 0;

  // число строк, которое может возвратить apiCharacters
  const elemetsFromApiCharacters: number = 20;

  // текущая страница
  let currentApiCharactersPage: number = 1;

  // попап загрузки
  const [isLoadingPopupOpen, setIsLoadingPopupOpen] = useState(false);

  // таймаут для закрытя попапа, чтобы он был заметен
  function loadingPopupCloseTimer() {
    return setTimeout(() => {
      setIsLoadingPopupOpen(false);
    }, 100);
  }

  ///////////////////////////////////////////////////////////////////////
  // функция, высчитвыающая с какой страницы загружать контент
  function computedPageToDownload(rows: any) {
    if (rows.length !== 0) {
      return Math.ceil(elementsToDisplay / rows.length);
    }
  }

  // проверка на достаточное количество элементов массива
  function checkArrayLength(rows: any) {
    const itemsPerPage: number = 20;
    if (rows.length !== 0) {
      console.log(Math.ceil(rows.length / itemsPerPage));
      return Math.ceil(rows.length / itemsPerPage);
    }
  }

  useEffect(() => {
    checkArrayLength(characters);
  }, [elementsToDisplay]);
  /*
  function checkArrayLength() {
    console.log(elementsToDisplay);
    console.log(characters);
    if (characters.length <= elementsToDisplay) {
      console.log("элементов в массиве меньше, чем нужно отобразить");
      console.log(downloadElementsForArray(characters));
    }
  }*/

  // пагинация
  function loadNextPage() {
    currentApiCharactersPage++;
    getCharacters(currentApiCharactersPage);
  }

  ////////////////////////////////////////////////////////////////////

  // запрос к api черновик, переместить
  async function getCharacters(pageNumber: number) {
    setIsLoadingPopupOpen(true);
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character?page=${pageNumber}`
      );
      setCharacters(characters.concat(response.data.results));
      totalLoadedCharacters += pageNumber;
    } catch (error) {
      console.log(error);
    } finally {
      loadingPopupCloseTimer();
    }
  }

  useEffect(() => {}, [elementsToDisplay]);

  useEffect(() => {
    getCharacters(1);
    Api.getCharacterApiInfoCount(
      urlForApi.character,
      setTotalAvailableCharacters,
      loadingPopupCloseTimer
    );
  }, []);

  // кнопки для разработки
  function customersState(): any {
    console.log(characters);
    getCharacters(2);
    /*
    console.log(customers[0]["name"]);
    console.log(apiInfoCount);
    console.log(countPagesNumber());
    */
    /*
    console.log(testArray.length);
    console.log(computeNewPageNumber(testArray));
    */
  }

  function testFunction2(): any {
    console.log(characters);
  }

  // рендер строк
  // количество строк, которое нужно разместить на одной странице
  function updateDisplayedItems(count: number) {
    if (count > totalLoadedCharacters) {
      let pagesToLoad = Math.ceil(
        (count - totalLoadedCharacters) / elemetsFromApiCharacters
      );
      for (let i = 0; i < pagesToLoad; i++) {
        getCharacters(currentApiCharactersPage + i);
      }
      totalLoadedCharacters += pagesToLoad * elemetsFromApiCharacters;
    }
  }

  const slicedElements = characters.slice(0, elementsToDisplay);
  const renderdElements = slicedElements.map((item) => (
    <Customer customer={item} key={item["id"]} />
  ));

  return (
    <div className="data-tab">
      <button
        className="data-tab__button"
        type="button"
        onClick={customersState}
      >
        testButton
      </button>
      <button
        className="data-tab__button"
        type="button"
        onClick={testFunction2}
      >
        testButton2
      </button>

      <ul className="data-tab__ul">{renderdElements}</ul>
      <PaginationBar
        rowsPerPageCounter={elementsToDisplay}
        pagesNumberCounter={countPagesNumberForCharacters}
        elementsToDisplay={elementsToDisplay}
        setElementsToDisplay={setElementsToDisplay}
        goNextPage={loadNextPage}
      />
      <LoadingPopup isOpen={isLoadingPopupOpen} />
    </div>
  );
}

export default DataTab;
