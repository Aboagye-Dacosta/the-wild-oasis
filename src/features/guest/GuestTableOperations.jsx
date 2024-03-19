import SearchFilter from "../../ui/SearchFilter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

const sortOptions = [
  { value: "fullName", label: "Full Name" },
  { value: "email", label: "Email" },
];

const searchableProps = ["full name", "email", "nationality", "national ID"];

function GuestTableOperations() {
  return (
    <TableOperations>
      <SearchFilter searchableProps={searchableProps} />
      <SortBy options={sortOptions} />
    </TableOperations>
  );
}

export default GuestTableOperations;
