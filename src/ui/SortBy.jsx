import PropTypes from "prop-types"
import { HiOutlineArrowLongDown, HiOutlineArrowLongUp } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import makeAnimated from "react-select/animated";
import styled from "styled-components";

import Row from "./Row";
import { capitalize } from "../utils/helpers";

const StyledSortBy = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 0.5rem;
`;

const Label = styled.span`
  color: var(--color-grey-0);
  background-color: var(--color-brand-600);
  padding: 0.5rem;
  border-radius: var(--border-radius-sm);

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  & svg {
    color: var(--color-grey-700);
  }

  .active-sort-dir {
    color: var(--color-grey-0);
  }

  & span {
    color: #fff
  }
`;

const animated = makeAnimated();

function SortBy({ options = [] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentDirection = searchParams.get("dir") || "asc";

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
      <Label>
        <Row type="horizontal">
          <HiOutlineArrowLongUp
            className={currentDirection == "asc" ? "active-sort-dir" : ""}
          />
          <HiOutlineArrowLongDown
            className={currentDirection == "desc" ? "active-sort-dir" : ""}
          />
        </Row>
        <span> Sort</span>
      </Label>
      <Select
        styles={{
          control: ({ styles, ...rem }) => ({
            ...styles,
            ...rem,
            width: "15rem",
          }),
        }}
        name="property"
        options={options}
        components={animated}
        defaultValue={defaultProperty}
        onChange={handlePropertyChange}
        closeMenuOnSelect={true}
      />
      <Select
        name="direction"
        styles={{
          control: ({ styles, ...rem }) => ({
            ...styles,
            ...rem,
            width: "10rem",
          }),
        }}
        closeMenuOnSelect={true}
        defaultValue={defaultDirectionValue}
        options={directionOptions}
        onChange={handleDirectionChange}
      />
    </StyledSortBy>
  );
}

SortBy.propTypes = {
  options: PropTypes.array
}

export default SortBy;
