import { MdViewCompact } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Table from "../../ui/Table";
import TableImg from "../../ui/TableImg";

function GuestTableRow({
  guest: {
    id: guestId,
    countryFlag,
    fullName,
    email,
    nationality,
    nationalID,
  } = {},
}) {
  const navigate = useNavigate();
  return (
    <Table.Row>
      <TableImg src={countryFlag} />
      <div>{fullName}</div>
      <div>{email}</div>
      <div>{nationality}</div>
      <div>{nationalID}</div>
      <div>
        <Button
          size="small"
          variation="secondary"
          tooltip="view bookings"
          onClick={() => {
            navigate(`/guests/${guestId}`);
          }}
        >
          <MdViewCompact />
        </Button>
      </div>
    </Table.Row>
  );
}

export default GuestTableRow;
