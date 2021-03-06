import React, { useState, useEffect } from 'react';
import { getCategories, list } from './apiCore';
import Card from './Card';
import '../styles.css';

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: '',
    search: '',
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then(data => {
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

  const searchData = () => {
    // console.log(search, category);
    if (search) {
      list({ search: search || undefined, category: category }).then(
        response => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };

  const searchSubmit = e => {
    e.preventDefault();
    searchData();
  };

  const handleChange = name => event => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
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
        <h2 className='mt-4 mb-4'>{searchMessage(searched, results)}</h2>
        <div className='row'>
          {results.map((product, i) => (
            <div key={i} className='col-lg-4 col-md-6 mb-3'>
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className='input-group-text shadow'>
        <div className='input-group input-group-lg'>
          <div className='input-group-prepend box'>
            <select className='btn mr-2' onChange={handleChange('category')}>
              <option value='All' className='bg-dark text-white'>
                Categories
              </option>
              {categories.map((c, i) => (
                <option key={i} className='bg-dark text-white' value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type='search'
            className='form-control d-none d-sm-block'
            onChange={handleChange('search')}
            placeholder='Search'
          />
        </div>
        <div className='btn input-group-append' style={{ border: 'none' }}>
          <button className='input-group-text'>Search</button>
        </div>
      </span>
      <div className='d-flex justify-content-center h-100 mt-3 d-block d-sm-none'>
        <div className='searchbar'>
          <input
            type='search'
            className='search_input text-dark'
            onChange={handleChange('search')}
            placeholder='Search'
          />
          <span className='search_icon text-dark'>
            <i className='fas fa-search'></i>
          </span>
        </div>
      </div>
    </form>
  );

  return (
    <div className='row'>
      <div className='container mb-3'>{searchForm()}</div>
      <div className='container-fluid mb-3'>{searchedProducts(results)}</div>
    </div>
  );
};

export default Search;
