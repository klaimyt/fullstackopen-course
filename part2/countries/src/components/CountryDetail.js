import React from 'react'
import Weather from './Weather'

const CountryDetail = ({country}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt='Country flag' />
      <Weather city={country.capital[0]} />
    </div>
  )
}

export default CountryDetail
