import { useQuery } from "@tanstack/react-query";
import { getProductbyId } from "../services/apiProduct";

function useProductById({ id }) {
  const { isPending, data, error } = useQuery({
    queryKey: [`productsById`, id], //its unique for each of the product
    queryFn: () => getProductbyId(id),
    enabled: !!id, //only run the query if id is present
  });

  return { isPending, data, error };
}

export default useProductById;
