import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterIdentifier="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate", label: "Start Date" },
          {
            value: "totalPrice",
            label: "Total Price",
          },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
