import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Heading from "../../ui/Heading";
import Modal from "../../ui/Modal";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import Tag from "../../ui/Tag";

import BookingDataBox from "./BookingDataBox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  const { isPending, booking = {} } = useBooking();
  const { isDeletingBooking, deleteBooking } = useDeleteBooking();

  if (isPending) return <Spinner />;

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal>
          {status === "unconfirmed" && (
            <Button
              variation="primary"
              onClick={() => navigate(`/check-in/${bookingId}`)}
            >
              Check in
            </Button>
          )}
          <Modal.Open opens="delete-booking">
            <Button size="small" variation="danger" tooltip="delete">
              <span>Delete Booking</span>
            </Button>
          </Modal.Open>

          <Modal.Window name="delete-booking">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() => {
                deleteBooking(bookingId, {
                  onSuccess: () => navigate("/bookings"),
                });
              }}
              disabled={isDeletingBooking}
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
