import { useQuery } from "@tanstack/react-query";
import { getMyOrders } from "../services/apiOrder";

export default function useMyOrder() {
  const { data, isPending, error, isSuccess } = useQuery({
    queryKey: ["myOrders"],
    queryFn: getMyOrders,
  });
  return { data, isPending, error, isSuccess };
}
