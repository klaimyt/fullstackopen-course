import CountryDetail from "./CountryDetail";

const CountryName = ({name, showClickHandler}) => {
  return(
    <div>
        <p style={{display: "inline"}}>{name}</p>
        <button onClick={() => showClickHandler(name)}>Show</button>
      </div>
  )
}

const Countries = ({ countries, showClickHandler }) => {
  if (countries.length === 1) {
    return <CountryDetail country={countries[0]} />;
  } else if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length < 1) {
    return <p>Country not found</p>;
  }

  return (
    <div>
      {countries.map((country) => (
        <CountryName key={country.name.common} name={country.name.common} showClickHandler={showClickHandler} />
      ))}
    </div>
  );
};

export default Countries;
