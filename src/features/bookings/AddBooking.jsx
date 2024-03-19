import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

import AddBookingForm from "./AddBookingForm";

function AddBooking() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="add-booking">
          <Button onClick={() => {}}>Add a booking</Button>
        </Modal.Open>

        <Modal.Window name="add-booking">
          <AddBookingForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddBooking;
