import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import {toast} from "react-hot-toast"

import ButtonText from "../../ui/ButtonText";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";
import Heading from "../../ui/Heading";
import Modal from "../../ui/Modal";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import Tag from "../../ui/Tag";

import { useMoveBack } from "../../hooks/useMoveBack";
import Button from "../../ui/Button";
import Table from "../../ui/Table";
import AddBooking from "../bookings/AddBooking";
import GuestBooking from "./GuestBooking";
import { useDeleteGuest } from "./useDeleteGuest";
import { useGuest } from "./useGuest";
import { useGuestBookings } from "./useGuestBookings";

const StyledButtonRow = styled(Tag)`
  display: flex;
  justify-content: end;
  width: 100%;
  gap: 1rem;
`;

const Card = styled.div`
  background-color: var(--color-grey-0);
  padding: 2rem 3rem;
`;
const Image = styled.div`
  width: 25rem;
  /* outline: 1px solid black;
  outline-offset: 5px; */

  & img {
    background-size: cover;
    box-shadow: var(--shadow-md);
    /* object-fit:cover; */
  }
`;
const Name = styled(Heading)``;
const Sub = styled.span`
  color: var(--color-grey-500);

  & span {
    display: inline-block;
    padding: 0.7rem 1rem;
    background-color: var(--color-grey-700);
    color: var(--color-grey-0);
    border-radius: var(--border-radius-sm);
    margin-right: 0.7rem;
    font-size: 1rem;
  }
`;

const StyledRow = styled(Row)`
  justify-content: start;
  width: 100%;
  gap: 1rem;

  ${(props) =>
    props.justify == "between" &&
    css`
      justify-content: space-between;
    `}
`;
function GuestDetail() {
  const { guestId } = useParams();
  const { isLoadingGuest, guest } = useGuest();
  const { isLoadingGuestBookings, guestBookings } = useGuestBookings();
  const { isDeletingGuest, deleteGuest } = useDeleteGuest();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoadingGuest || isLoadingGuestBookings) return <Spinner />;
  return (
    <Row>
      <Row type="horizontal">
        <Heading as="h1">Guest #{guestId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <Card>
        <StyledRow type="horizontal">
          <Image>
            <img src={guest.countryFlag} />
          </Image>
          <StyledRow>
            <StyledRow type="horizontal" justify="between">
              <Name>{guest.fullName}</Name>
              <Sub>
                <span>created at</span>
                {format(new Date(guest.created_at), "MMM dd yyyy")}
              </Sub>
            </StyledRow>
            <Sub>
              <span>Nationality</span> {guest.nationality}
            </Sub>
            <Sub>
              <span>Natiinal ID</span>
              {guest.nationalID}
            </Sub>
          </StyledRow>
        </StyledRow>
      </Card>
      <Row>
        <Heading as="h3">Bookings</Heading>
        {!guestBookings.length ? (
          <Empty resource="bookings" />
        ) : (
          <Table columns="0.6fr 2fr 1fr 1.4fr  1fr">
            {guestBookings.map((booking) => (
              <GuestBooking booking={booking} key={booking.id} />
            ))}
          </Table>
        )}
      </Row>
      <StyledButtonRow>
        <AddBooking />
        <Modal>
          {guestBookings.length > 0 ? (
            <Button
              variation="danger"
              onClick={() =>
                toast("You must remove all bookings first to delete guest")
              }
            >
              Delete
            </Button>
          ) : (
            <Modal.Open opens="delete-booking">
              <Button
                size="medium"
                variation="danger"
                tooltip="delete"
                disabled={guestBookings.length > 0}
              >
                Delete
              </Button>
            </Modal.Open>
          )}

          <Modal.Window name="delete-booking">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() =>
                deleteGuest(guestId, {
                  onSuccess: () => {
                    navigate("/guests");
                  },
                })
              }
              disabled={isDeletingGuest}
            />
          </Modal.Window>
        </Modal>
      </StyledButtonRow>
    </Row>
  );
}

export default GuestDetail;
