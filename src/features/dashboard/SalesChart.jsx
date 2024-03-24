import PropTypes from "prop-types"
import
  {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
  } from "recharts";
import styled from "styled-components";
import DashboardBox from "./DashboardBox";

import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { useMemo } from "react";
import { useDarkMode } from "../../context/DarkModeContext";
import Heading from "../../ui/Heading";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;



function SalesChart({ numDays, bookings = [] }) {
  const { isDarkMode } = useDarkMode();
  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  const allDays = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = useMemo(
    () =>
      allDays.map((day) => {
        return {
          label: format(day, "MMM dd"),
          totalSales: bookings
            .filter((booking) => isSameDay(day, new Date(booking.created_at)))
            .reduce((acc, cur) => acc + cur.totalPrice, 0),
          extrasSales: bookings
            .filter((booking) => isSameDay(day, new Date(booking.created_at)))
            .reduce((acc, cur) => acc + cur.extrasPrice, 0),
        };
      }),
    [allDays, bookings]
  );

  console.log(data);

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDays.at(0), "MMM dd yyyy")} &mdash;
        {format(allDays.at(-1), "MMM dd yyyy")}
      </Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <Tooltip contentStyle={{ backgroundColor: colors.background }} active={ true} />
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis unit="$" />
          <CartesianGrid strokeDasharray="4" />
          <Area
            dataKey="totalSales"
            type="monotone"
            fill={colors.totalSales.fill}
            strokeWidth={3}
            stroke={colors.totalSales.stroke}
            onClick={(e) => console.log(e)}
            name="Total Sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            fill={colors.extrasSales.fill}
            strokeWidth={3}
            stroke={colors.extrasSales.stroke}
            onClick={(e) => console.log(e)}
            name="Extras Sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

SalesChart.propTypes = {
  bookings: PropTypes.array,
  numDays: PropTypes.number
}

export default SalesChart;
