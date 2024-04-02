import { useEffect, useState } from "react";
import * as Api from "../../utils/Api";
import Customer from "../Customer/Customer";
import { urlForApi } from "../../utils/constants";
import axios from "axios";
import "./DataTab.scss";
import PaginationBar from "../PaginationBar/PaginationBar";
import LoadingPopup from "../LoadingPopup/LoadingPopup";
import SearchBar from "../SearchBar/SearchBar";

function DataTab() {
  // стейт для массива с персонажами
  const [characters, setCharacters] = useState<any[]>([]);

  // стейт для массива с локациями
  const [locations, setLocations] = useState([]);

  // выполняется ли в данный момент запрос данных
  const [isFetchingData, setIsFetchingData] = useState(false);

  // количество отбражаемых строк
  const [elementsToDisplayOnCurrentPage, setElementsToDisplayOnCurrentPage] =
    useState<number>(15);

  // всего возможных строк с api/character
  const [totalAvailabeCharacters, setTotalAvailableCharacters] = useState(0);

  // счетчик общего количества страниц с учетом rows per page(округление в +)
  function countPagesNumber(selectedApiCount: number): number {
    return Math.ceil(selectedApiCount / elementsToDisplayOnCurrentPage);
  }

  let countPagesNumberForCharacters: number = countPagesNumber(
    totalAvailabeCharacters
  );

  // число строк, которое может возвратить apiCharacters
  const numberOfReturnedApiCharacters: number = 20;

  // текущая страница
  const [currentPage, setCurrentPage] = useState<number>(1);

  // попап загрузки
  const [isLoadingPopupOpen, setIsLoadingPopupOpen] = useState(false);

  // таймаут для закрытя попапа, чтобы он был заметен
  function loadingPopupCloseTimer() {
    return setTimeout(() => {
      setIsLoadingPopupOpen(false);
    }, 100);
  }

  // сортировка, отслеживание нажатия
  const [isSortingPressed, setIsSortingPressed] = useState(false);
  function handleSortByName() {
    setIsSortingPressed(!isSortingPressed);
  }

  // сортировка по имени(придумать болле простой и читаемый способ)
  function sortByName(arrayForSorting: any) {
    // проверка отсортирован ли массив
    function isSortedAlphabetically(arrayForSorting: any[]): boolean {
      return arrayForSorting.every(
        (item, index) =>
          index === 0 ||
          item.props.customer.name.localeCompare(
            arrayForSorting[index - 1].props.customer.name
          ) >= 0
      );
    }
    // проверка нажата ли кнопка сортировки по имени
    if (isSortingPressed) {
      // переключение a-z, z-a
      if (isSortedAlphabetically(arrayForSorting)) {
        const sortedNotAlphabetically = arrayForSorting.sort((a: any, b: any) =>
          b.props.customer.name.localeCompare(a.props.customer.name)
        );
        return sortedNotAlphabetically;
      } else {
        const sortedAlphabetically = arrayForSorting.sort((a: any, b: any) =>
          a.props.customer.name.localeCompare(b.props.customer.name)
        );
        return sortedAlphabetically;
      }
    } else {
      return arrayForSorting;
    }
  }

  // отмена отслеживания сортировки, если был переход на другую страницу
  useEffect(() => {
    setIsSortingPressed(false);
  }, [currentPage]);

  /* функция, которая подгрузит данные если в массиве меньше контента,
  чем необходимо отбразить. useEffect ниже сработает от
  изменения в селекторе выбора количества отбражаемых страниц*/
  async function getMissingData(arrayFromApi: any) {
    if (
      arrayFromApi.length !== 0 &&
      elementsToDisplayOnCurrentPage > arrayFromApi.length
    ) {
      const totalPagesToDownload = Math.ceil(
        elementsToDisplayOnCurrentPage / arrayFromApi.length
      );
      for (let i = 2; i <= totalPagesToDownload; ++i) {
        await getCharacters(i);
      }
    }
  }

  useEffect(() => {
    getMissingData(characters);
  }, [elementsToDisplayOnCurrentPage]);

  // функция, высчитывающая начало рендера
  function calculateStartOfRendering(): number {
    if (currentPage === 1) {
      return 0;
    } else {
      return (
        elementsToDisplayOnCurrentPage * currentPage -
        elementsToDisplayOnCurrentPage
      );
    }
  }

  //
  function calculateEndOfRendering(): number {
    return Number(calculateStartOfRendering()) + elementsToDisplayOnCurrentPage;
  }

  // проверка на необходимость загрузки новых даных
  async function getAdditionalData(arrayFromApi: any) {
    if (
      arrayFromApi.length - calculateEndOfRendering() <
      elementsToDisplayOnCurrentPage
    ) {
      const numberOfDownloadedPages = Math.ceil(
        arrayFromApi.length / numberOfReturnedApiCharacters
      );
      // сколько загрузить целых страниц с учетом размера отбражаемых элементов
      const pagesForElementsToDisplay = Math.ceil(
        elementsToDisplayOnCurrentPage / numberOfReturnedApiCharacters
      );
      const numberOfPagesToDownload =
        numberOfDownloadedPages + pagesForElementsToDisplay;

      // проверка на случай, когда нужно загрузить данные несколько раз
      if (numberOfPagesToDownload - numberOfDownloadedPages > 1) {
        for (
          let i = numberOfDownloadedPages + 1;
          i <= numberOfPagesToDownload;
          i++
        ) {
          await getCharacters(i);
        }
      } else {
        getCharacters(numberOfPagesToDownload);
      }
    }
  }

  // пагинация, следующая страница
  function loadNextPage() {
    getAdditionalData(characters);
    setCurrentPage(currentPage + 1);
  }

  // пагинация, предыдущая страница
  function loadPreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  // функция, отвечающая за изменение количества отбражаемых элементов
  function handleElementsPerPageChange(value: number) {
    setCurrentPage(1);
    setElementsToDisplayOnCurrentPage(value);
  }

  // запрос к api, черновик(переместить в папку api)
  async function getCharacters(pageNumber: number) {
    setIsFetchingData(true);
    setIsLoadingPopupOpen(true);
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character?page=${pageNumber}`
      );
      if (characters.length === 0) {
        setCharacters(response.data.results);
      } else {
        setCharacters((prevArray) => {
          return prevArray.concat(response.data.results);
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingData(false);
      loadingPopupCloseTimer();
    }
  }

  // useEffect при монтировании
  useEffect(() => {
    /* достаточно прогрузить только первую страницу,
    т.к. по умолчанию нужно отбразить 15 строк*/
    getCharacters(1);
    // записываем в переменную сколько всего может быть строк с персонажами
    Api.getCharacterApiInfoCount(
      urlForApi.character,
      setTotalAvailableCharacters,
      loadingPopupCloseTimer
    );
  }, []);

  // логика рендеринга
  const slicedElements = characters.slice(
    calculateStartOfRendering(),
    calculateEndOfRendering()
  );

  let renderdElements = slicedElements.map((item) => (
    <Customer customer={item} key={item["id"]} />
  ));

  return (
    <div className="data-tab">
      <SearchBar handleSortByName={handleSortByName} />
      <ul className="data-tab__ul">{sortByName(renderdElements)}</ul>
      <PaginationBar
        // currentPage
        currentPage={currentPage}
        // индексы начала и конца
        firstOnList={calculateStartOfRendering() + 1}
        lastOnList={calculateEndOfRendering()}
        // всего возможных записей с api
        totalAvailabeCharacters={totalAvailabeCharacters}
        //
        pagesNumberCounter={countPagesNumberForCharacters}
        elementsToDisplayOnCurrentPage={elementsToDisplayOnCurrentPage}
        // изменение количества отбражаемых элементов
        handleElementsPerPageChange={handleElementsPerPageChange}
        // логика кнопок пагинации
        loadPreviousPage={loadPreviousPage}
        loadNextPage={loadNextPage}
      />
      <LoadingPopup isOpen={isLoadingPopupOpen} />
    </div>
  );
}

export default DataTab;
