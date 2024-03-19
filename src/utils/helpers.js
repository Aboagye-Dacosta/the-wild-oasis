import { differenceInDays, formatDistance, parseISO } from "date-fns";

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export const searchValueInItem = (value, props, item) => {
  const propValues = Array.from(
    props,
    (prop) =>
      item[
        prop
          .split(" ")
          .map((m, i) =>
            i == 0 ? m : m.slice(0, 1).toUpperCase() + m.slice(1)
          )
          .join("")
      ]
  );

  console.log(propValues, "from searching");
  for (const obj of propValues) {
    if (typeof obj === "string" && obj.includes(value)) {
      console.log("entered here");
      return true;
    }

    if (
      !(typeof obj === "string") &&
      Object.values(obj).join("").includes(value)
    ) {
      return true;
    }
    if (value == "") return true;
  }

  return false;
};
