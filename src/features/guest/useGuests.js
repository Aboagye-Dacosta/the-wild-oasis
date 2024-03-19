import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getGuests } from "../../services/apiGuest";
import { useSearchContext } from "../../ui/SearchFilter";
import { searchValueInItem } from "../../utils/helpers";

export function useGuests() {
  const { searchValue, searchableProps } = useSearchContext();

  console.log(searchValue, searchableProps);

  const [searchParams] = useSearchParams();
  let page = searchParams.get("page") || 1;
  let pageSize = searchParams.get("count") || 10;
  let sortOption = searchParams.get("sort-by") || "fullName";
  let sortDirection = searchParams.get("dir") || "asc";

  const sortBy = { prop: sortOption, dir: sortDirection };
  const search = { value: searchValue , props: searchableProps };

  page = Number(page) - 1;
  pageSize = Number(pageSize);

  const { data: { data: guests, count } = {}, isPending: isLoadingGuests } =
    useQuery({
      queryKey: ["guests", sortBy, pageSize, page],
      queryFn: () => getGuests({ page, pageSize, sortBy }),
      select: ({ data, count }) => ({
        data: data.filter((object) => {
          if (searchValueInItem(search.value, search.props, object)) {
            return true;
          }
          return false;
        }),
        count,
      }),
    });

  console.log(guests);

  return { guests, isLoadingGuests, count };
}
