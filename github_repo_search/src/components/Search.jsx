import React, { useState } from "react";
import Filter from "./Filter";


const Search = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState([]);
  const [filterToggle, setFilterToggle] = useState(false)
  const [results, setResults] = useState([]);

  function queryChangeHandler(event) {
    setQuery(event.target.value);
  }

  async function fetchDataHandler(event) {
    event.preventDefault();
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${query}&page=1&per_page=30&sort&order=desc`
    );
    const data = await response.json();
    setResults(data.items);

    // filter languages from results
    const removeDuplicates= [];
    const languagesArray = data.items.map((lang) => lang.language);

    languagesArray.forEach((lang) => {
      if (!removeDuplicates.includes(lang)) {
        removeDuplicates.push(lang);
      }
    });

    setFilters(removeDuplicates);
    setFilterToggle(false)
  }

  const sortDataHandler = () => {
    const sortedArray = [...results].sort(
      (a, b) => b.stargazers_count - a.stargazers_count
    );
    setResults(sortedArray);
  };
  const filterHandler = (value) => {
    setFilterToggle(prevState => !prevState)


        setResults((prevState) => {
            if(filterToggle === true) {
                return prevState.filter(a.language === value)
            } else {return prevState}
        })

      
      }
      // return new array with only filter

  
    

  return (
    <>
      <form onSubmit={fetchDataHandler}>
        <label>
          Search GitHub Repository
          <input type="text" value={query} onChange={queryChangeHandler} />
        </label>
        <button type="submit">Enter</button>
        <button type="button" onClick={sortDataHandler}>
          Sort (by stars)
        </button>
      </form>

      <div>
        Select a filter
        {filters.map((lang) => {
          if (lang !== null) {
            return (
              <Filter
                key={lang}
                toggleFilter={filterHandler}
                value={lang}
                language={lang}
               />
            );
          }
        })}
      </div>
      <h1>Results go here ⬇︎</h1>
      {!filterToggle && results.map((result) => {
        return (
          <div key={result.node_id} className="results_main">
            <ul>
              <h3>Name: {result.name}</h3>
              <h3>Language: {result.language}</h3>
              <p>Author: {result.owner.login}</p>
              <p>Link: {result.html_url}</p>
              <p>Stars: {result.stargazers_count}</p>
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default Search;
