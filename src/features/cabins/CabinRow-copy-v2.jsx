import PropTypes from "prop-types";
import { useState } from "react";
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

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
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
  const [isEditing, setIsEditing] = useState(false);
  const { isDeleting, deleteCabin, isPaused } = useDeleteCabin();

  const { isCreating, createCabin } = useCreateCabin();
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
    deleteCabin(id);
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

  const handleIsUpdating = (state) => setIsEditing(state);

  return (
    <>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>fits up to {maxCapacity} guest</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <Modal>
        <Menus.Menu>
          <Menus.ToggleButton id={cabinId} />
          <Menus.List id={cabinId}>
            <Menus.Button onClick={handleMakeCabinCopy} icon={<MdFileCopy />}>
              Make copy
            </Menus.Button>

            <Modal.Open opens="edit">
              <Menus.Button icon={<MdModeEdit />}>Edit cabin</Menus.Button>
            </Modal.Open>

            <Modal.Open opens="confirm-delete">
              <Menus.Button variation="danger" size="small" icon={<FaTrash />}>
                Delete cabin
              </Menus.Button>
            </Modal.Open>

            <Modal.Window name="edit">
              <CreateCabinForm
                cabinToEdit={cabin}
                setIsUpdating={handleIsUpdating}
              />
            </Modal.Window>

            <Modal.Window name="confirm-delete">
              <ConfirmDelete
                resourceName="cabins"
                disabled={isDeleting}
                onConfirm={() => handleDeleteCabin(cabinId)}
              />
            </Modal.Window>
          </Menus.List>
        </Menus.Menu>
      </Modal>
      {/* <Menus id="cabin">
        <Menus.ToggleButton />
        <Menus.List>
          <Menus.Button icon={<MdOutlineMoreVert />}>Edit Cabin</Menus.Button>
        </Menus.List>
      </Menus> */}
    </>
  );
}

CabinRow.propTypes = {
  cabin: PropTypes.object,
};

export default CabinRow;
