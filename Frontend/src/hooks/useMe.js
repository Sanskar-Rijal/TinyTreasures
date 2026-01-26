import { useQuery } from "@tanstack/react-query";
import { getMyDetails } from "../services/apiUser";

export default function useMe() {
  const { data, isError, isSuccess } = useQuery({
    queryKey: ["mySelf"],
    queryFn: () => getMyDetails(),
    retry: false, //Do not retry if unauthenticated
  });

  return { data, isError, isSuccess };
}
