import Search from "./pages/Search";

import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Details from "./pages/Details";
import "./App.css";

function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [details, setDetails] = useState([]);
  const [filters, setFilters] = useState([]);
  const [filterToggle, setFilterToggle] = useState(false);

  function queryChangeHandler(event) {
    setQuery(event.target.value);
  }

  async function fetchDataHandler(event) {
    event.preventDefault()
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${query}&page=1&per_page=30&sort&order=desc`
    );
    const results = await response.json();
    
    setResults(results.items);
    // filter languages from results
    const removeDuplicates = [];
    const languagesArray = results.items.map((lang) => lang.language);

    languagesArray.forEach((lang) => {
      if (!removeDuplicates.includes(lang)) {
        removeDuplicates.push(lang);
      }
    });

    setFilters(removeDuplicates);
  }



  const sortDataHandler = () => {
    const sortedArray = [...results].sort(
      (a, b) => b.stargazers_count - a.stargazers_count
    );
    setResults(sortedArray);
  };

  const filterHandler = (value) => {
    setFilterToggle((prevState) => !prevState);
    const resultsCopy = [...results];
    const filtered = resultsCopy.filter((result) => result.language === value);
    setFilteredData(filtered);
  };

  const detailsHandler = (key) => {
    const detailsItem = results.filter((filter) => filter.id === key);

    setDetails(detailsItem);
  };


  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Search
              sortDataHandler={sortDataHandler}
              fetchDataHandler={fetchDataHandler}
              queryChangeHandler={queryChangeHandler}
              filterHandler={filterHandler}
              filters={filters}
              detailsHandler={detailsHandler}
              filterToggle={filterToggle}
              filteredData={filteredData}
              results={results}
              query={query}
            />
          }
        />
        <Route
          path="/details/:name/:id"
          element={<Details detailItem={details}/>}
        />
      </Routes>
    </div>
  );
}

export default App;
