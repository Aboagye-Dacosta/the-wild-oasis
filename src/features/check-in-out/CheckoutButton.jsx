import PropTypes from "prop-types";
import Button from "../../ui/Button";
import ConfirmCheckOutAndIn from "../../ui/ConfirmCheckOutAndIn";
import Modal from "../../ui/Modal";

import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { isCheckingOut, checkout } = useCheckout();
  return (
    <Modal>
      <Modal.Open opens="check-out">
        <Button variation="danger" size="small" disabled={isCheckingOut}>
          Check out
        </Button>
      </Modal.Open>

      <Modal.Window name="check-out">
        <ConfirmCheckOutAndIn
          disabled={isCheckingOut}
          resourceName="checkout booking"
          message="This booking will be checked out"
          onConfirm={() =>
            checkout({ bookingId, checkedOut: { status: "checked-out" } })
          }
        />
      </Modal.Window>
    </Modal>
  );
}

CheckoutButton.propTypes = {
  bookingId: PropTypes.number,
};

export default CheckoutButton;
