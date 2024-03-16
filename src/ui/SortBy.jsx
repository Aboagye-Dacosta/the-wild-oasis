import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import styled from "styled-components";

const StyledSortBy = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 0.5rem;
`;

const Label = styled.span`
  font-weight: 500;
  color: var(--color-grey-600);
`;

const animated = makeAnimated();
const capitalize = (value) =>
  value.slice(0, 1).toUpperCase().concat(value.slice(1));

function SortBy({ options = [] }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const directionOptions = [
    { label: "Asc", value: "asc" },
    { label: "Desc", value: "desc" },
  ];

  const defaultDirectionValue = searchParams.get("dir")
    ? {
        label: capitalize(searchParams.get("dir")),
        value: searchParams.get("dir"),
      }
    : directionOptions.at(0);

  const defaultProperty = searchParams.get("sort-by")
    ? {
        label: options.find(
          (option) => option.value === searchParams.get("sort-by")
        ).label,
        value: searchParams.get("sort-by"),
      }
    : options.at(0);

  const handleDirectionChange = (option) => {
    searchParams.set("dir", option.value);
    setSearchParams(searchParams);
  };

  const handlePropertyChange = (option) => {
    searchParams.set("sort-by", option.value);
    setSearchParams(searchParams);
  };

  return (
    <StyledSortBy>
      <Label>Sort:</Label>
      <Select
        name="property"
        options={options}
        components={animated}
        defaultValue={defaultProperty}
        onChange={handlePropertyChange}
        closeMenuOnSelect={true}
      />
      <Select
        name="direction"
        closeMenuOnSelect={true}
        defaultValue={defaultDirectionValue}
        options={directionOptions}
        onChange={handleDirectionChange}
      />
    </StyledSortBy>
  );
}

export default SortBy;
