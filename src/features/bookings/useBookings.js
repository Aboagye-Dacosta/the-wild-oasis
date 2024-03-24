import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";
import { useSearchContext } from "../../ui/SearchFilter";
import { searchValueInItem } from "../../utils/helpers";

export const useBookings = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { searchValue, searchableProps } = useSearchContext();

  const sortProperty = searchParams.get("sort-by") || "startDate";
  const sortDirection = searchParams.get("dir") || "asc";

  let page = searchParams.get("page") || 1;
  let pageSize = searchParams.get("count") || 10;

  page = Number(page) - 1;
  pageSize = Number(pageSize);

  const filter = { value: searchParams.get("status") || "all", prop: "status" };
  const sortBy = { dir: sortDirection, prop: sortProperty };
  const search = { value: searchValue, props: searchableProps };

  /********************************************************************** */
  //NB: FOR IMPLEMENTING CLIENT SIDE PAGINATION AND FILTERING AND SORTING
  // let filterFunction = (data) => data;
  // let sortFunction = (data) => filterFunction(data);

  // let searchFunction = (data) =>
  //   sortFunction(data).filter((booking) => {
  //     const result = searchValueInItem(search.value, search.props, booking);
  //     if (result) return true;
  //     return false;
  //   });

  // if (filter === "unconfirmed") {
  //   filterFunction = (data) =>
  //     data.filter((value) => value.status === "unconfirmed");
  // }

  // if (filter === "checked-in") {
  //   filterFunction = (data) =>
  //     data.filter((value) => value.status === "checked-in");
  // }
  // if (filter === "checked-out") {
  //   filterFunction = (data) =>
  //     data.filter((value) => value.status === "checked-out");
  // }

  // if (sortBy.prop) {
  //   const modifier = sortBy.dir === "asc" ? 1 : -1;
  //   sortFunction = (data) =>
  //     filterFunction(data).sort(
  //       (a, b) => (a[sortBy.prop] - b[sortBy.prop]) * modifier
  //     );
  // }
  // NB: use this to implement client side filtering and sorting together with react query select option
  // const finalFunction =
  //   search.props && search.value ? searchFunction : sortFunction;
  /***************************************************************************** */

  //Query
  const { isPending, data: { data: bookings, count } = {} } = useQuery({
    queryKey: ["bookings", filter, sortBy, { pageSize }, page],
    queryFn: () => getBookings({ filter, sortBy, page, pageSize }),
    select: ({ data, count }) => ({
      data: data.filter((object) => {
        if (searchValueInItem(search.value, search.props, object)) {
          return true;
        }
        return false;
      }),
      count,
    }),
    /*************************************************************************** */
    //NB: TO IMPLEMENT CLIENT SIDE FILTERING AND SORTING AND PAGINATION
    // initialData: () =>
    //   localCabinData.map((booking, id) => {
    //     const cabins = queryClient.getQueryData(["cabins"]);

    //     const cabin = cabins.find((cabin) => cabin.id === booking.cabinId);

    //     const data = {
    //       id,
    //       ...booking,
    //       cabins: {
    //         name: cabin?.name,
    //       },
    //       guests: {
    //         fullName: "james frost",
    //         email: "example@gmail.com",
    //       },
    //     };

    //     return data.slice(paginate.from,paginate.to);
    //   }),
    // staleTime: 6 * 60 * 1000,
    // select: finalFunction,
    /******************************************************************************* */
  });

  const pageCount = Math.ceil(count / pageSize);
  if (page + 1 < pageCount) {

    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, { pageSize }, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1, pageSize }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, { pageSize }, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1, pageSize }),
    });
  }

  return { isPending, bookings, count };
};
