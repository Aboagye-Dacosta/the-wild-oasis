import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import { useSearchContext } from "../../ui/SearchFilter";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import BookingRow from "./BookingRow";
import { useBookings } from "./useBookings";

function BookingTable() {
  const { searchValue, setDisabled } = useSearchContext();
  const { isPending, bookings = [], count } = useBookings();

  if (isPending) return <Spinner />;

  if (!bookings.length) {
    // if (searchValue == "") {
    //   setDisabled(true);
    // }
    return <Empty resource="bookings" />;
  }

  console.log(bookings);
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 1fr">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
