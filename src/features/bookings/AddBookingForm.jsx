/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { cloneElement, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { components } from "react-select";
import styled from "styled-components";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow, { Error } from "../../ui/FormRow";
import Input from "../../ui/Input";
import Row from "../../ui/Row";
import Select from "../../ui/Select";

import Checkbox from "../../ui/Checkbox";
import FieldsetBox from "../../ui/FieldsetBox";
import SpinnerSm from "../../ui/SpinnerSm";
import Textarea from "../../ui/Textarea";

import { formatCurrency, subtractDates } from "../../utils/helpers";
import { useCabins } from "../cabins/useCabins";
import { useSettings } from "../settings/useSettings";
import { useCreateBooking } from "./useCreateBooking";
import { useGuestNationality } from "./useGuestNationality";

const StyledRow = styled(Row)`
  justify-content: start;
  gap: 2rem;
  padding: 2rem 0;
  align-items: flex-end;
`;
const StyledCountryOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 0.5rem;

  & img {
    width: 2rem;
  }
`;
const ControlledSelect = ({ children, control, message, name, onChange }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => cloneElement(children, { ...field })}
      rules={{
        required: {
          value: true,
          message,
        },
        onChange,
      }}
    />
  );
};

function AddBookingForm({ closeModal }) {
  const { cabins, isPending } = useCabins();
  const { isLoadingCountries, countries } = useGuestNationality();
  const { isLoadingSettings, settings } = useSettings();
  const { isCreatingBooking, createBooking } = useCreateBooking();
  const {
    register: registerBooking,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    register: registerGuest,
    handleSubmit: handleSubmitGuest,
    control: controlGuest,
    formState: { errors: guestErrors },
  } = useForm();

  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedCabin, setSelectedCabin] = useState({});
  const [guestData, setGuestData] = useState({});

  const [nextFormPage, setNextFormPage] = useState(false);
  const [numGuests, setNumGuests] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [hasBreakfast, setHasBreakfast] = useState(false);

  const options = cabins?.map((cabin) => ({
    label: cabin.name,
    value: {
      id: cabin.id,
      price: cabin.regularPrice,
      image: cabin.image,
      capacity: cabin.maxCapacity,
    },
  }));

  const countriesOption = countries?.map((country) => ({
    label: country.name,
    value: country,
  }));

  const onSubmit = (data) => {
    const booking = {
      ...data,
      numNights: Math.abs(subtractDates(data.startDate, data.endDate)),
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      totalPrice: hasBreakfast
        ? Number(numGuests) * Number(settings.breakfastPrice) +
          Number(selectedCabin?.value?.price)
        : selectedCabin?.value?.price,
      cabinId: selectedCabin?.value?.id,
      cabinPrice: Number(selectedCabin?.value.price),
      extrasPrice: hasBreakfast
        ? Number(numGuests) * Number(settings.breakfastPrice)
        : 0,
      numGuests: Number(numGuests),
    };

    createBooking(
      { guest: guestData, booking },
      {
        onSettled: () => closeModal(),
      }
    );
  };

  const onSubmitGuest = (data) => {
    const guest = {
      fullName: data.fullName,
      email: data.email,
      nationality: data.nationality.label,
      countryFlag: data.nationality.value.flag,
      nationalID: data.nationalID,
    };
    setGuestData(guest);
    setNextFormPage((state) => !state);
  };

  return (
    <>
      {!nextFormPage ? (
        <Form onSubmit={handleSubmitGuest(onSubmitGuest)}>
          <FieldsetBox title="Cabin">
            <StyledRow type="horizontal">
              <Row>
                <label>Select Cabin</label>
                <ControlledSelect
                  name="cabin"
                  message={"cabin is required"}
                  control={controlGuest}
                  onChange={(e) => {
                    setSelectedCabin(e.target.value);
                  }}
                >
                  <Select
                    options={
                      isPending
                        ? [{ label: "loading", value: "loading" }]
                        : options
                    }
                  />
                </ControlledSelect>
              </Row>
              <Row>
                <label>Cabin Price</label>
                <Input
                  disabled
                  value={formatCurrency(
                    Object.keys(selectedCabin).length > 0
                      ? selectedCabin?.value?.price
                      : 0.0
                  )}
                  readOnly
                />
              </Row>
              {guestErrors?.cabin && (
                <Error> {guestErrors.cabin.message}</Error>
              )}
            </StyledRow>
          </FieldsetBox>
          <FieldsetBox title="Guest Detail">
            <FormRow label="Full Name" error={guestErrors?.fullName?.message}>
              <Input
                name="fullName"
                id="fullName"
                {...registerGuest("fullName", {
                  required: {
                    value: true,
                    message: "full name is required",
                  },
                })}
              />
            </FormRow>
            <FormRow label="Email" error={guestErrors?.email?.message}>
              <Input
                type="email"
                name="email"
                id="email"
                {...registerGuest("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                })}
              />
            </FormRow>
            <FormRow
              label="National Id"
              error={guestErrors?.nationalID?.message}
            >
              <Input
                name="nationalID"
                id="nationalID"
                {...registerGuest("nationalID", {
                  required: {
                    value: true,
                    message: "National ID is required",
                  },
                })}
              />
            </FormRow>
            <FormRow
              label="Nationality"
              error={guestErrors?.nationality?.message}
            >
              <ControlledSelect
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                }}
                control={controlGuest}
                name="nationality"
                message="Nationality is required"
              >
                <Select
                  name="nationality"
                  menuPlacement="top"
                  styles={{
                    control: ({ ...prop }) => ({
                      ...prop,
                      paddingLeft: "1rem",
                    }),
                  }}
                  components={{
                    Control: ({ children, ...props }) => {
                      const { getValue } = props;
                      const option = getValue();
                      return (
                        <components.Control {...props}>
                          {option?.length > 0 &&
                            Object.keys(option.at(0)).length > 0 && (
                              <img
                                src={option.at(0)?.value?.flag}
                                style={{ width: "2rem" }}
                              />
                            )}
                          {children}
                        </components.Control>
                      );
                    },
                  }}
                  options={
                    isLoadingCountries
                      ? [{ label: "loading...", value: "loading..." }]
                      : countriesOption
                  }
                />

                {/* <CustomSelect
                  style={{
                    paddingLeft: "1rem",
                  }}
                  options={
                    isLoadingCountries
                      ? [{ label: "loading...", value: "loading..." }]
                      : countriesOption
                  }
                  render={(option, children) => {
                    return (
                      <StyledCountryOption style={{ color: "black" }}>
                        <img src={option?.value?.flag} />
                        {!children ? option?.label : children}
                      </StyledCountryOption>
                    );
                  }}
                /> */}
              </ControlledSelect>
            </FormRow>
            <Input
              hidden
              name="countryFlag"
              id="countryFlag"
              type="url"
              {...registerGuest("countryFlag", {
                setValueAs: () => selectedCountry?.value?.flag,
              })}
            />
          </FieldsetBox>
          <StyledRow type="horizontal">
            <Button
              variation="secondary"
              onClick={closeModal}
              disabled={isCreatingBooking}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isCreatingBooking}>
              {nextFormPage ? "Back" : "Next"}
            </Button>
          </StyledRow>
        </Form>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)} ent>
          <FieldsetBox title="Booking Detail">
            <FormRow label="Number of Guest" error={errors?.numGuests?.message}>
              <Input
                type="number"
                defaultValue={1}
                {...registerBooking("numGuests", {
                  required: {
                    value: true,
                    message: "The number of guests is required",
                  },
                  min: {
                    value: 1,
                    message: "the minimum required number of guests is 1",
                  },
                  max: {
                    value: selectedCabin?.value?.capacity,
                    message: `the cabin can contain a max of ${selectedCabin?.value?.capacity}  guests`,
                  },
                  onChange: (e) => {
                    setNumGuests(Number(e.target.value));
                  },
                })}
              />
            </FormRow>
            <FormRow label="Takes Breakfast">
              <Checkbox
                register={registerBooking("hasBreakfast", {
                  onChange: (e) => {
                    console.log(e.target.checked);
                    if (e.target.checked == true) {
                      setHasBreakfast(true);
                    } else if (e.target.checked == false) {
                      setHasBreakfast(false);
                    }
                  },
                })}
              >
                Takes breakfast during stay at &mdash;
                {isLoadingSettings
                  ? "calculating..."
                  : `${formatCurrency(settings.breakfastPrice)}`}
              </Checkbox>
            </FormRow>
            <FormRow label="Total Price" error={errors?.totalPrice?.message}>
              <Input
                disabled
                value={formatCurrency(
                  Object.keys(selectedCabin).length > 0 && !hasBreakfast
                    ? selectedCabin?.value?.price
                    : Object.keys(selectedCabin).length > 0 &&
                      hasBreakfast &&
                      !isLoadingSettings
                    ? selectedCabin?.value?.price +
                      numGuests * Number(settings.breakfastPrice)
                    : 0.0
                )}
                {...registerBooking("totalPrice", {
                  validate: () => {
                    return (
                      Number(
                        selectedCabin?.value?.price +
                          numGuests * Number(settings.breakfastPrice)
                      ) > 0 ||
                      "Total price can not be zero or less please choose a cabin"
                    );
                  },
                })}
              />
            </FormRow>
            <FormRow label="Start Date" error={errors?.startDate?.message}>
              <Input
                type="date"
                {...registerBooking("startDate", {
                  required: {
                    value: true,
                    message: "Start date can not be empty",
                  },
                  validate: (value) => {
                    if (!value) return true;
                    const stDate = new Date(value);
                    const now = new Date().toISOString().split("T")[0];
                    const date = new Date(now);

                    return stDate - date < 0
                      ? "sorry the starting can not be before today"
                      : undefined;
                  },
                  onChange: (e) => setStartDate(e.target.value),
                })}
              />
            </FormRow>
            <FormRow label="End Date" error={errors?.endDate?.message}>
              <Input
                type="date"
                {...registerBooking("endDate", {
                  required: {
                    value: true,
                    message: "End date can not be empty",
                  },
                  validate: (value) => {
                    if (!startDate) return "Start date must be set first";

                    const endDate = new Date(value);
                    const now = new Date().toISOString().split("T")[0];
                    const date = new Date(now);

                    const stDate = new Date(startDate);
                    if (endDate - stDate < 0)
                      return "End date can not be before start date";

                    return endDate - date < 0
                      ? "sorry the ending date can not be before today"
                      : undefined;
                  },
                })}
              />
            </FormRow>
            <FormRow label="Has Piad">
              <Checkbox register={registerBooking("isPaid")}>
                Has fully paid total price
              </Checkbox>
            </FormRow>
            <FormRow label="Status" error={errors?.status?.message}>
              <StyledRow type="horizontal">
                <input
                  type="radio"
                  value="checked-in"
                  {...registerBooking("status", {
                    required: {
                      value: true,
                      message: "Status is required",
                    },
                  })}
                />
                <span> CHECKED IN</span>
                <input
                  type="radio"
                  value="unconfirmed"
                  {...registerBooking("status", {
                    required: {
                      value: true,
                      message: "Status is required",
                    },
                  })}
                />
                <span>UNCONFIRMED</span>
              </StyledRow>
            </FormRow>
            <FormRow label="Observations">
              <Textarea {...registerBooking("observations")} />
            </FormRow>
          </FieldsetBox>
          <StyledRow type="horizontal">
            <Button
              variation="secondary"
              onClick={closeModal}
              disabled={isCreatingBooking}
            >
              Cancel
            </Button>

            <Button
              onClick={() => {
                setNextFormPage((state) => !state);
              }}
              disabled={isCreatingBooking}
            >
              {nextFormPage ? "Back" : "Next"}
            </Button>
            {nextFormPage && (
              <Button type="submit" disabled={isCreatingBooking}>
                {isCreatingBooking && <SpinnerSm />} Create booking
              </Button>
            )}
          </StyledRow>
        </Form>
      )}
    </>
  );
}

AddBookingForm.propTypes = {
  closeModal: PropTypes.func,
};

export default AddBookingForm;
