import axios from "axios";
import { useState } from "react";
import Countries from "./components/Countries";
import Search from "./components/Search";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchField, setSearchField] = useState("");

  // Handlers
  const searchChangeHandler = (e) => {
    setSearchField(e.target.value);
    axios
      .get(`https://restcountries.com/v3.1/name/${e.target.value}`)
      .then((response) => setCountries(response.data))
      .catch((err) => setCountries([]));
  };

  return (
    <div>
      {searchField ? null : <h1>Write country name</h1>}
      <Search seachHandler={searchChangeHandler} />
      <Countries countries={countries} />
    </div>
  );
}

export default App;
