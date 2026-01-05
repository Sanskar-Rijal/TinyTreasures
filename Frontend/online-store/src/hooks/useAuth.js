import { useDispatch } from "react-redux";
import useMe from "./useMe";
import { useEffect } from "react";
import { setIsAuthenticated, setUser } from "../ReduxSlices/userSlice";

export function useAuthSync() {
  const dispatch = useDispatch();
  const { data, isError, isSuccess } = useMe();

  useEffect(
    function () {
      if (isSuccess && data) {
        console.log("Setting user:", data.message);
        dispatch(setUser(data.message));
        dispatch(setIsAuthenticated(true));
      }
      if (isError) {
        dispatch(setUser(null));
        dispatch(setIsAuthenticated(false));
      }
    },
    [dispatch, isSuccess, data, isError],
  );
}
