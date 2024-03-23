import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import styled from "styled-components";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Paragraph = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
const filterOptions = [
  { label: 10, value: 10 },
  { label: 15, value: 15 },
  { label: 25, value: 25 },
  { label: 50, value: 50 },
];

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageSize = searchParams.get("count") || filterOptions.at(0).value;
  const currentPage = Number(searchParams.get("page")) || 1;

  const pageCount = Math.ceil(count / Number(pageSize));

  const prevValue = searchParams.get("count")
    ? { value: searchParams.get("count"), label: searchParams.get("count") }
    : filterOptions.at(0);

  const nextPage = () => {
    if (currentPage >= pageCount) return;
    searchParams.set("page", currentPage + 1);
    searchParams.set("count", pageSize);

    setSearchParams(searchParams);
  };

  const prevPage = () => {
    if (currentPage <= 1) return null;
    searchParams.set("page", currentPage - 1);
    searchParams.set("count", pageSize);

    setSearchParams(searchParams);
  };

  const handleChange = (option) => {
    searchParams.set("count", option.value);
    setSearchParams(searchParams);
  };

  if (count <= filterOptions.at(0).value) return null;
  return (
    <StyledPagination>
      <Paragraph>
        showing <span>{(currentPage - 1) * pageSize + 1}</span> to
        <span>{currentPage == pageCount ? count : currentPage * pageSize}</span> of <span>{count}</span> items
      </Paragraph>
      <Buttons>
        <span>Show:</span>

        <Select
          menuPlacement="top"
          name="paginateSize"
          defaultValue={prevValue}
          options={filterOptions}
          onChange={handleChange}
        />
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>
        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
