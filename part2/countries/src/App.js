import axios from "axios";
import { useEffect, useState } from "react";
import Countries from "./components/Countries";
import Search from "./components/Search";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    if (!searchField) return
    axios
      .get(`https://restcountries.com/v3.1/name/${searchField}`)
      .then((response) => setCountries(response.data))
      .catch((err) => setCountries([]));
  }, [searchField])

  // Handlers
  const searchChangeHandler = (e) => {
    setSearchField(e.target.value);
  };

  const showClickHandler = (country) => {
    setSearchField(country)
  }

  return (
    <div>
      <Search seachHandler={searchChangeHandler} />
      {searchField ? <Countries countries={countries} showClickHandler={showClickHandler} /> : <p>Write country name</p>}

    </div>
  );
}

export default App;
