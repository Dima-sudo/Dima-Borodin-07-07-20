import React, { useState, useEffect } from 'react';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import vars from '../Resources/Objects/Variables';

import { connect } from 'react-redux';
import { get_Auto_Complete } from '../Redux/Actions/Queries';
import { toggleLoading } from '../Redux/Actions/Utils';
import { get_Current_City_Conditions } from '../Redux/Actions/Locations';

import { Input, AutoComplete } from 'antd';

import '../scss/Components/SearchBar.scss';

const SearchBar = props => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    // Prevents spamming the API and waits until the user stops typing
    const input = document.querySelector('#city-search__box');
    let observable = fromEvent(input, 'input');

    observable
      .pipe(debounceTime(vars.DEBOUNCE_TIMER_MS), distinctUntilChanged())
      .subscribe({
        next: e => {
          props.get_Auto_Complete(e.target.value);
        }
      });
  }, []);

  const onSelect = value => {
    setQuery(value);
  };

  const onSubmit = async () => {
    await props.get_Current_City_Conditions(query);
  };

  return (
    <AutoComplete
      dropdownMatchSelectWidth={252}
      className='auto-complete__searchbar'
      // Options receive an array of objects of shape {value: x, label: y, key: z}
      options={props.curQuery}
      onSelect={onSelect}
      onChange={value => {
        setQuery(value);
      }}
      on
      id='city-search__box'
    >
      <Input.Search
        aria-describedby='city-search-box'
        size='large'
        placeholder='What is your favorite place?'
        enterButton
        onSearch={onSubmit}
      />
    </AutoComplete>
  );
};

const mapStateToProps = store => {
  return {
    curQuery: store.Queries.curQuery,
    isLoading: store.Utils.isLoading
  };
};

export default connect(mapStateToProps, {
  get_Auto_Complete,
  toggleLoading,
  get_Current_City_Conditions
})(SearchBar);
