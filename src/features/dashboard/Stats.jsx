import PropTypes from "prop-types"
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";

function Stats({ bookings = [], confirmedStays = [], numDays, numCabins }) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkIns = confirmedStays.length;

  //occupancy rate
  const occupancy = confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0);
  const occupancyRate = occupancy / (numDays * numCabins);
  return (
    <>
      <Stat
        color="blue"
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        value={numBookings}
      />
      <Stat
        color="green"
        icon={<HiOutlineBanknotes />}
        title="Sales"
        value={formatCurrency(sales)}
      />
      <Stat
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        title="Check ins"
        value={checkIns}
      />
      <Stat
        color="yellow"
        icon={<HiOutlineChartBar />}
        title="Occupancy rate"
        value={`${Math.round(occupancyRate * 100)}%`}
      />
    </>
  );
}

Stats.propTypes = {
  bookings: PropTypes.array,
  confirmedStays: PropTypes.array,
  numCabins: PropTypes.number,
  numDays: PropTypes.number
}

export default Stats;
