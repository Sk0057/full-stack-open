import React, { useState, useEffect } from "react";
import axios from "axios";
import Display from "./components/Display";

const App = () => {
  const [filter, setFilter] = useState("");
  const [data, setData] = useState([]);

  const hook = () =>
    axios.get("https://restcountries.com/v3.1/all").then(
      (request) => setData(request.data),
      (error) => console.log(error)
    );

  useEffect(hook, []);

  const handleFilterChange = (event) =>
    setFilter(event.target.value.toLowerCase());

  const countries = data.filter(
    (x) => !x.name.common.toLowerCase().indexOf(filter)
  );

  const handleShow = (name) => setFilter(name.toLowerCase());

  return (
    <>
      {/* <h1>Hello World(literally)</h1> */}
      <form>
        find countries:{" "}
        <input
          placeholder="search by name"
          value={filter}
          onChange={handleFilterChange}
        />
      </form>
      <Display countries={countries} handleClick={handleShow} />
    </>
  );
};

export default App;
