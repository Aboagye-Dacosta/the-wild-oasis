import axios from "axios";

export async function getCountries() {
  const { data, status, statusText } = await axios.get(
    "https://restcountries.com/v3.1/all"
  );

  if (status === 200 && statusText === "OK") {

    return data;
  }

  throw new Error("sorry could not load countries");
}
