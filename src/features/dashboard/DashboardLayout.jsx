import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useCabins } from "../cabins/useCabins";
import DurationChart from "./DurationChart";
import SalesChart from "./SalesChart";
import Stats from "./Stats";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoadingBookingsAfterDate, bookingsAfterDate, numDays } =
    useRecentBookings();
  const { isLoadingRecentStays, confirmedStays } = useRecentStays();
  const { cabins = [], isPending: isLoadingCabins } = useCabins();

  if (isLoadingBookingsAfterDate || isLoadingRecentStays || isLoadingCabins)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookingsAfterDate}
        confirmedStays={confirmedStays}
        numDays={numDays}
        numCabins={cabins.length}
      />
      <div>Today activities</div>
      <DurationChart confirmedStays={confirmedStays}/>
      <SalesChart numDays={numDays} bookings={bookingsAfterDate} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
