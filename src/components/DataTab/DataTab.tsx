import { useEffect, useState } from "react";
import * as Api from "../../utils/Api";
import Customer from "../Customer/Customer";
import { urlForApi } from "../../utils/constants";
import axios from "axios";
import "./DataTab.scss";
import PaginationBar from "../PaginationBar/PaginationBar";

function DataTab() {
  // стейт для массива с персонажами
  const [customers, setCharacters] = useState([]);

  // стейт для массива с локациями
  const [locations, setLocations] = useState([]);

  // const result: any[] = [];

  // счетчик постов с api
  const [apiInfoCount, setApiInfoCount] = useState(0);

  // счетчик общего количества страниц с учетом rows per page(округление в +)
  function countPagesNumber(): number {
    return Math.ceil(apiInfoCount / elementsToDisplay);
  }

  //
  const [elementsToDisplay, setElementsToDisplay] = useState(15);

  function getCharacters(): any {
    Api.getCharacters();
  }

  function getLocations(): any {
    Api.getLocations();
  }

  useEffect(() => {
    //getCharacters()
    axios
      .get(urlForApi.character)
      .then((response: any) => {
        if (!response) return;
        setCharacters(response.data.results);
        setApiInfoCount(response.data.info.count);
        console.log(customers);
        console.log(response.data.info.count);
      })
      .catch((error: any) => {
        console.error("Error fetching characters:", error);
      });

    /*
    getLocations().then((result: any) => {
      setLocations(result);
      console.log(locations);
      
    });
    */
  }, []);

  // кнопки для разработки
  function customersState(): any {
    console.log(customers);
    console.log(customers[0]["name"]);
    console.log(apiInfoCount);
    console.log(countPagesNumber());
  }

  // рендер строк
  // количество строк, которое нужно разместить на одной странице
  const slicedElements = customers.slice(0, elementsToDisplay);
  const renderdElements = slicedElements.map((item) => (
    <Customer customer={item} key={item["id"]} />
  ));

  return (
    <div className="data-tab">
      <button
        className="data-tab__button"
        type="button"
        onClick={getCharacters}
      >
        getCustomers
      </button>
      <button className="data-tab__button" type="button" onClick={getLocations}>
        getLocations
      </button>
      <button
        className="data-tab__button"
        type="button"
        onClick={customersState}
      >
        customers
      </button>
      <ul className="data-tab__ul">{renderdElements}</ul>
      <PaginationBar
        rowsPerPageCounter={elementsToDisplay}
        pagesNumberCounter={countPagesNumber()}
        elementsToDisplay={elementsToDisplay}
        setElementsToDisplay={setElementsToDisplay}
      />
    </div>
  );
}

export default DataTab;
