/* eslint-disable react/prop-types */
import { format, isToday } from "date-fns";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import ButtonGroup from "../../ui/ButtonGroup";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";

import { FaTrash } from "react-icons/fa";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { MdViewCompact } from "react-icons/md";
import Button from "../../ui/Button";
import ConfirmCheckOutAndIn from "../../ui/ConfirmCheckOutAndIn";
import Modal from "../../ui/Modal";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "../bookings/useDeleteBooking";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function GuestBooking({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice = 45,
    status = "unconfirmed",
    cabins: { name: cabinName },
  },
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isCheckingOut, checkout } = useCheckout();
  const { isDeletingBooking, deleteBooking } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>
      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
      <Amount>{formatCurrency(totalPrice)}</Amount>
      <ButtonGroup type="horizontal">
        <Button
          size="small"
          variation="secondary"
          tooltip="details"
          onClick={() => {
            console.log("clicked");
            navigate(`/bookings/${bookingId}`, { state: location });
          }}
        >
          <MdViewCompact />
        </Button>
        {status === "unconfirmed" && (
          <Button
            size="small"
            variation="primary"
            tooltip="check in"
            onClick={() => {
              navigate(`/check-in/${bookingId}`, { state: location });
            }}
          >
            <HiArrowDownOnSquare />
          </Button>
        )}
        <Modal>
          {status === "checked-in" && (
            <React.Fragment>
              <Modal.Open opens="check-in">
                <Button size="small" variation="primary" tooltip="check out">
                  <HiArrowUpOnSquare />
                </Button>
              </Modal.Open>
              <Modal.Window name="check-in">
                <ConfirmCheckOutAndIn
                  resourceName={"Check out booking"}
                  message={`Are you sure you want to check out ${bookingId} from bookings`}
                  onConfirm={() => {
                    checkout({
                      bookingId,
                      checkedOut: { status: "checked-out" },
                    });
                  }}
                  disabled={isCheckingOut}
                />
              </Modal.Window>
            </React.Fragment>
          )}

          <Modal.Open opens="delete-booking">
            <Button size="small" variation="danger" tooltip="delete">
              <FaTrash />
            </Button>
          </Modal.Open>

          <Modal.Window name="delete-booking">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() => deleteBooking(bookingId)}
              disabled={isDeletingBooking}
            />
          </Modal.Window>
        </Modal>
      </ButtonGroup>
    </Table.Row>
  );
}

export default GuestBooking;
