import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../services/apiUser";
import { setIsAuthenticated, setUser } from "../ReduxSlices/userSlice";
import toast from "react-hot-toast";
import { clearCart } from "../ReduxSlices/cartSlice";

export default function useLogout() {
  const navigate = useNavigate(); //after logout send user to homepage or login screen
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      //clear user from redux
      dispatch(setUser(null));
      dispatch(setIsAuthenticated(false));
      //Clear the Cart also
      dispatch(clearCart());

      //Reset query to initial state otherwise it won't fetch again
      queryClient.resetQueries({ queryKey: ["mySelf"] });

      toast.success("Logout Successful 😉");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message || "Logout Failed, Please try again later");
    },
  });
  return { logout, isPending };
}
