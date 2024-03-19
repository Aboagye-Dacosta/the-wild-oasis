import GuestTable from "../features/guest/GuestTable";
import GuestTableOperations from "../features/guest/GuestTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { SearchFilterProvider } from "../ui/SearchFilter";

function Guests() {
  return (
    <SearchFilterProvider>
      <Row type="horizontal">
        <Heading>All Guests</Heading>
        <GuestTableOperations />
      </Row>
      <GuestTable />
    </SearchFilterProvider>
  );
}

export default Guests;
