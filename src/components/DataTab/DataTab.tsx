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
        console.log(customers);
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

  function customersState(): any {
    console.log(customers);
    console.log(customers[0]["name"]);
  }

  // рендер строк
  const elementsToDisplay: number = 15;
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
      <PaginationBar />
    </div>
  );
}

export default DataTab;
