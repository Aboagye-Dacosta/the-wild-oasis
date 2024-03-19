import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";
import { MdFileCopy, MdModeEdit } from "react-icons/md";
import styled from "styled-components";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useCreateCabin } from "./useCreateCabin";
import { useDeleteCabin } from "./useDeleteCabin";
import TableImg from "../../ui/TableImg";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;



const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createCabin } = useCreateCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  const handleDeleteCabin = (id) => {
    if (confirm("Continue to delete cabin")) {
      deleteCabin(id);
    }
  };

  const handleMakeCabinCopy = () => {
    createCabin({
      newCabin: {
        name: `Copy of ${name}`,
        maxCapacity,
        regularPrice,
        discount,
        image,
        description,
      },
    });
  };

  return (
    <TableRow role="row">
      <TableImg src={image} />
      <Cabin>{name}</Cabin>
      <div>fits up to {maxCapacity} guest</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>
        {discount === 0 ? <span>&mdash;</span> : formatCurrency(discount)}
      </Discount>
      <Modal>
        <Menus.Menu>
          <Menus.ToggleButton id={cabinId} />
          <Menus.List id={cabinId}>
            <Menus.Button onClick={handleMakeCabinCopy} icon={<MdFileCopy />}>
              Make copy
            </Menus.Button>

            <Modal.Open opens="edit">
              <Menus.Button icon={<MdModeEdit />}>Edit Cabin</Menus.Button>
            </Modal.Open>

            <Modal.Open opens="confirm-delete">
              <Menus.Button icon={<FaTrash />}>Delete cabin</Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name="edit">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Window name="confirm-delete">
            <ConfirmDelete
              resourceName="cabins"
              disabled={isDeleting}
              onConfirm={() => handleDeleteCabin(cabinId)}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </TableRow>
  );
}

CabinRow.propTypes = {
  cabin: PropTypes.object,
};

export default CabinRow;
