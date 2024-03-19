import Table from "../../ui/Table";
import TableImg from "../../ui/TableImg";
import { useDeleteGuest } from "./useDeleteGuest";

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
  const { isDeletingGuest, deleteGuest } = useDeleteGuest();
  return (
    <Table.Row>
      <TableImg src={countryFlag} />
      <div>{fullName}</div>
      <div>{email}</div>
      <div>{nationality}</div>
      <div>{nationalID}</div>
      {/* <div>
        <Modal>
          <Modal.Open opens="delete-booking">
            <Button size="small" variation="danger" tooltip="delete">
              <FaTrash />
            </Button>
          </Modal.Open>

          <Modal.Window name="delete-booking">
            <ConfirmDelete
              resourceName="guest"
              onConfirm={() => deleteGuest(guestId)}
              disabled={isDeletingGuest}
            />
          </Modal.Window>
        </Modal>
      </div> */}
    </Table.Row>
  );
}

export default GuestTableRow;
