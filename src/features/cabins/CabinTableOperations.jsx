import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

const filterOptions = [
  { value: "all", label: "All" },
  { value: "no-discount", label: "No Discount" },
  { value: "with-discount", label: "With Discount" },
];
const sortOptions = [
  { value: "name", label: "Name" },
  { value: "regularPrice", label: "Price" },
  { value: "discount", label: "Discount" },
  { value: "maxCapacity", label: "Capacity" },
];

function CabinTableOperations({ filterIdentifier }) {
  return (
    <TableOperations>
      <Filter filterIdentifier={filterIdentifier} options={filterOptions} />
      <SortBy options={sortOptions} />
    </TableOperations>
  );
}

export default CabinTableOperations