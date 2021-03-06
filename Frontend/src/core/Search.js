import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getCategories, list } from "./apiCore";
import Card from "./Card";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleChange = (name) => (e) => {
    setData({ ...data, [name]: e.target.value, searched: false });
  };

  const searchData = () => {
    //console.log(search,category)
    if (search) {
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const searchMessage = (searched, results) => {

    if (searched && results.length === 1) {
      return `Found 1 product`;
    }
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    
    
    if (searched && results.length < 1) {
      return `No products found`;
    }
  };

  const searchedProducts = (results = []) => {
    return (
      <div>
        <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>
        <div className="row">
          
          {results.map((product, i) => (
            <div className="col-3">
            <Card key={i} product={product} />
            </div>
          ))}
          
          
        </div>
      </div>
    );
  };

  const searchForm = () => {
    return (
      <form onSubmit={searchSubmit}>
        <span className="input-group-text">
          <div className="input-group  ">
            <div className="input-group-prepend ">
              <select className="btn btn-outline-dark me-2" onChange={handleChange("category")}>
                <option value="All">All</option>
                {categories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}xs
              </select>
            </div>
            <input
              type="search"
              className="form-control"
              onChange={handleChange("search")}
              placeholder="Search by name"
            />
          </div>
          <div className=" input-group-append" style={{ border: "none" }}>
            <button className="btn btn-outline-dark input-group-text  ms-2">Search</button>
          </div>
        </span>
      </form>
    );
  };

  return (
    <div className="row">
      <div className="container  mt-3 mb-3">{searchForm()}</div>
      <div className="container-fluid mt-3 mb-3">
        {searchedProducts(results)}
      </div>
    </div>
  );
};

export default Search;
