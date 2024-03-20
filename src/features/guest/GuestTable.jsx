import { useGuests } from "./useGuests";

import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import GuestTableRow from "./GuestTableRow";

function GuestTable() {
  const { isLoadingGuests, guests=[], count } = useGuests();
  if (isLoadingGuests) return <Spinner />;
  if (!guests.length) return <Empty resource="guests" />;
  return (
    <Table columns="0.6fr 2.2fr 2.2fr 1.6fr 1fr 2rem">
      <Table.Header>
        <div></div>
        <div>Full Name</div>
        <div>Email</div>
        <div>Nationality</div>
        <div>National ID</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={guests}
        render={(guest) => <GuestTableRow guest={guest} key={guest.id} />}
      />
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
}

export default GuestTable;
