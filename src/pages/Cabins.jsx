import AddCabin from "../features/cabins/AddCabin";
import CabinTable from "../features/cabins/CabinTable";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Cabins() {
 

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations filterIdentifier="discount" />
      </Row>
      <Row>
        <CabinTable filterKey={"discount"} />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
