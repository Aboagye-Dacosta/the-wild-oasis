import PropTypes from "prop-types"
import { createContext, useContext, useEffect, useState } from "react";
import styled from "styled-components";

import Button from "./Button";
import Input from "./Input";

const StyledInput = styled(Input)`
  font-size: 1.2rem;
`;

const StyledSearchFilter = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 0.5rem;
  width: max-content;
`;

const StyledControls = styled(StyledSearchFilter)`
  padding: 0.5rem 1rem;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-sm);
`;

const SearchContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useSearchContext() {
  const context = useContext(SearchContext);
  return context;
}

function useSearch() {
  const [searchValue, setSearchValue] = useState("");
  const [searchableProps, setSearchableProps] = useState([]);
  const [isDisabled, setDisabled] = useState(false);

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const setSearchable = (searchable = []) => {
    setSearchableProps(searchable);
  };

  return {
    isDisabled,
    searchableProps,
    searchValue,
    handleSearchChange,
    setSearchable,
    setDisabled,
  };
}

//exporting a provider for the search functionality
export function SearchFilterProvider({ children }) {
  return (
    <SearchContext.Provider value={useSearch()}>
      {children}
    </SearchContext.Provider>
  );
}

SearchFilterProvider.propTypes = {
  children: PropTypes.any
}

//search component
function SearchFilter({ searchableProps = [] }) {
  const {
    searchValue,
    handleSearchChange,
    isDisabled,
    searchableProps: searchProps,
    setSearchable,
  } = useSearchContext();

  useEffect(() => {
    if (!searchProps.length) {
      setSearchable(searchableProps);
    }
  }, [searchProps.length, searchableProps, setSearchable]);

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    handleSearchChange(value);
  };

  const handleReset = () => {
    handleSearchChange("");
  };

  const handleSubmit = () => {
    handleSearchChange(searchValue);
  };

  return (
    <StyledSearchFilter>
      <StyledInput
        value={searchValue}
        placeholder={`search by - ${searchableProps.join(", ")}`}
        onChange={handleChange}
        disabled={isDisabled}
      />
      <StyledControls>
        
        <Button
          size="small"
          onClick={handleSubmit}
          disabled={isDisabled || !searchValue}
          tooltip="search"
        >
          Search
        </Button>
        <Button
          variation="secondary"
          size="small"
          onClick={handleReset}
          disabled={isDisabled || !searchValue}
        >
          Reset
        </Button>
      </StyledControls>
    </StyledSearchFilter>
  );
}

SearchFilter.propTypes = {
  searchableProps: PropTypes.array
}

export default SearchFilter;
