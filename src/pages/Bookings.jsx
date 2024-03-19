import AddBooking from "../features/bookings/AddBooking";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import SearchFilter, { SearchFilterProvider } from "../ui/SearchFilter";

function Bookings() {
  return (
    <SearchFilterProvider>
      <Row>
        <Row type="horizontal">
          <Heading as="h1">All bookings</Heading>
          <BookingTableOperations />
        </Row>
        <Row>
          <SearchFilter searchableProps={["cabins", "guests"]} />
        </Row>
        <Row>
          <BookingTable />
        </Row>

        <AddBooking />
      </Row>
    </SearchFilterProvider>
  );
}

export default Bookings;
