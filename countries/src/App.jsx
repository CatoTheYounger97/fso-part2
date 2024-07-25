import axios from "axios";
import { useEffect, useState } from "react";

const Search = ({ newSearch, setNewSearch }) => {
  const value = newSearch ?? "";

  return (
    <div>
      find countries{" "}
      <input value={value} onChange={(e) => setNewSearch(e.target.value)} />
    </div>
  );
};

const Result = ({ countries, newSearch, setNewSearch }) => {
  if (!newSearch) return null;

  const countriesFiltered = countries.filter((c) =>
    c.name.common.toLowerCase().includes(newSearch)
  );

  if (countriesFiltered.length >= 10)
    return <div>Too many matches, specify another filter</div>;

  // country length is 1
  if (countriesFiltered.length === 1)
    return <Country country={countriesFiltered[0]} />;

  // country length is 1 < x <= 10
  return (
    <div>
      {countriesFiltered.map((country) => {
        return (
          <div key={country.cca2}>
            {country.name.common}{" "}
            <button
              onClick={() => {
                setNewSearch(country.name.common.toLowerCase());
              }}
            >
              show
            </button>
          </div>
        );
      })}
    </div>
  );
};

const Country = ({ country }) => {
  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>capital {country.capital.join(", ")}</div>
      <div>area {country.area}</div>
      <h4>languages:</h4>
      <div>
        <ul>
          {Object.keys(country.languages).map((key) => (
            <li key={key}>{country.languages[key]}</li>
          ))}
        </ul>
      </div>
      <img src={country.flags.svg} alt={country.flags.alt} width={250} />
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState(null);
  const [newSearch, setNewSearch] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all/")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  return (
    <div>
      <Search newSearch={newSearch} setNewSearch={setNewSearch} />
      <Result
        countries={countries}
        newSearch={newSearch}
        setNewSearch={setNewSearch}
      />
    </div>
  );
};

export default App;
