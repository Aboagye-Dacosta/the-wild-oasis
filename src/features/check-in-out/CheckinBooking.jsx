import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

import { useEffect, useState } from "react";
import { HiArrowDownOnSquare } from "react-icons/hi2";
import { useMoveBack } from "../../hooks/useMoveBack";
import ConfirmCheckOutAndIn from "../../ui/ConfirmCheckOutAndIn";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import { useBooking } from "../bookings/useBooking";
import { useSettings } from "../settings/useSettings";
import { useCheckin } from "./useCheckin";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [isFullyPaidTotalAmount, setIsFullyPaidTotalAmount] = useState(false);
  const { isPending, booking } = useBooking();
  const { checkin, isCheckingin } = useCheckin();
  const { settings, isLoadingSettings } = useSettings();
  const [takesBreakfast, setTakesBreakfast] = useState(false);

  useEffect(() => {
    setIsFullyPaidTotalAmount(booking?.isPaid ?? false);
    setTakesBreakfast(booking?.hasBreakfast ?? false);
  }, [booking]);

  if (isPending || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  function handleCheckin() {
    if (!isFullyPaidTotalAmount) return;

    if (hasBreakfast || takesBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          totalPrice:
            totalPrice + settings.breakfastPrice * numNights * numGuests,
          hasBreakfast: true,
        },
      });
    } else checkin({ bookingId, breakfast: {} });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={takesBreakfast}
          onChange={() => {
            setTakesBreakfast((state) => !state);
            setIsFullyPaidTotalAmount(false);
          }}
          id="breakfast"
        >
          Want to take breakfast at $
          {formatCurrency(settings.breakfastPrice * numGuests * numNights)}
        </Checkbox>
      </Box>

      <Box>
        <Checkbox
          checked={isFullyPaidTotalAmount || isCheckingin}
          onChange={() => setIsFullyPaidTotalAmount((state) => !state)}
          disabled={isFullyPaidTotalAmount}
          id="isFullyPaid"
        >
          I confirm that {guests.fullName} has fully paid the total amount of{" "}
          {takesBreakfast ? (
            <span>
              {formatCurrency(
                totalPrice + settings.breakfastPrice * numGuests * numNights
              )}
              &mdash;(
              {formatCurrency(totalPrice)} &mdash;
              {formatCurrency(settings.breakfastPrice * numGuests * numNights)})
            </span>
          ) : (
            formatCurrency(totalPrice)
          )}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Modal>
          <Modal.Open opens="check-in">
            <Button disabled={!isFullyPaidTotalAmount || isCheckingin}>
              <HiArrowDownOnSquare /> Check in booking #{bookingId}
            </Button>
          </Modal.Open>

          <Modal.Window name="check-in">
            <ConfirmCheckOutAndIn
              onConfirm={handleCheckin}
              disabled={isCheckingin}
              message="Are you sure you want to check in booking"
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

export default CheckinBooking;
