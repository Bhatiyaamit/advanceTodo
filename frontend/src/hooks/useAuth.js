import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../features/auth/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    // Load user only if token exists and user not loaded yet
    const token = localStorage.getItem("token");

    if (token && !auth.isAuthenticated && !auth.loading) {
      dispatch(loadUser());
    }
  }, [dispatch, auth.isAuthenticated, auth.loading]);

  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    loading: auth.loading,
    error: auth.error,
  };
};

export default useAuth;