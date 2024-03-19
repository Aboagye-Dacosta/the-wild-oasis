import { useQuery } from "@tanstack/react-query";
import { getCountries } from "../../services/apiGuestsNationality";

export function useGuestNationality() {
  const twentyFourHours = 1000 * 60 * 60 * 24;
  const { data: countries, isPending: isLoadingCountries } = useQuery({
    queryKey: ["guests-nationality"],
    queryFn: getCountries,
    select: (data) =>
      [
        data.map((country) => ({
          name: country.name.common,
          flag: country.flags.png,
        })),
      ].flat(2),
    staleTime: twentyFourHours,
    gcTime: twentyFourHours,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
  });

  return { countries, isLoadingCountries };
}
