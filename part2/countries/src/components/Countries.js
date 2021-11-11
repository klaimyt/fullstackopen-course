import CountryDetail from "./CountryDetail";

const Countries = ({ countries }) => {
  if (countries.length === 1) {
    return <CountryDetail country={countries[0]} />
  } else if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (countries.length < 1) {
    return <p>Country not found</p>
  }

  return (
    <div>
      {countries.map((country) => (
        <p key={country.name.common}>{country.name.common}</p>
      ))}
    </div>
  );
};

export default Countries;
