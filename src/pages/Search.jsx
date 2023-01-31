import React, { useState } from "react";
import Filter from "../components/Filter";
import { Link } from "react-router-dom";

const Search = (props) => {
  const elements = props.filterToggle ? props.filteredData : props.results;

  const resultElements = elements.map((result) => {
    return (
      <div
        key={result.id}
        className="results_main"
        onClick={() => {
          props.detailsHandler(result.id);
        }}
      >
        <Link to={`/details/${result.name}/${result.id}`}>
          <ul>
            <h3>Name: {result.name}</h3>
            <h3>Language: {result.language}</h3>
            <p>Author: {result.owner.login}</p>
            <p>Stars: {result.stargazers_count}</p>
          </ul>
        </Link>
      </div>
    );
  });

  return (
    <>
      <form onSubmit={props.fetchDataHandler}>
        <input type="text" onChange={props.queryChangeHandler} value={props.query}/>
        <button type="submit">
          Enter
        </button>
      </form>

      <button type="button" onClick={props.sortDataHandler}>
        Sort (by stars)
      </button>

      <div>
        Select a filter
        {props.filters.map((lang) => {
          if (lang !== null) {
            return (
              <Filter
                key={lang}
                toggleFilter={props.filterHandler}
                value={lang}
                language={lang}
              />
            );
          }
        })}
      </div>
      <h1>Results go here ⬇︎</h1>
      {resultElements}
    </>
  );
};

export default Search;
