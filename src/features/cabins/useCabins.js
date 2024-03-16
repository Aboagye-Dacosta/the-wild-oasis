import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getCabins } from "../../services/apiCabins";

export const useCabins = () => {
  const [searchParams] = useSearchParams();
  const currentFilterValue = searchParams.get("discount") || "all";
  const sortProperty = searchParams.get("sort-by") || "name";
  const sortDirection = searchParams.get("dir") || "asc";

  // console.log(currentFilterValue)
  const filter = {
    prop: "discount",
    value: currentFilterValue,
  };

  const sortBy = { dir: sortDirection, prop: sortProperty };

  // for client side filtering and sorting 
  let filterFunction = (data) => data;

  if (filter.value === "with-discount") {
    filterFunction = (data) => data.filter((value) => value.discount > 0);
  }

  if (filter.value === "no-discount") {
    filterFunction = (data) => data.filter((value) => value.discount === 0);
  }

  const modifier = sortBy.dir === "asc" ? 1 : -1;

  // for client side sorting and filtering using react query select option
  const sortFunction = (data) =>
    filterFunction(data).sort(
      (a, b) => (a[sortBy.prop] - b[sortBy.prop]) * modifier
    );

  const { isPending, data: cabins } = useQuery({
    queryKey: ["cabins", filter, sortBy],
    queryFn: () =>
      getCabins({  filter, sortBy }),
    // initialData: () => localCabinData,
    // staleTime: 6 * 60 * 1000,
    // select: sortFunction,
  });

  return { isPending, cabins };
};
