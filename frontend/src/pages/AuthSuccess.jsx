import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchTheme } from "../features/theme/themeSlice";
import { loadUser } from "../features/auth/authSlice";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    console.log(token);

    if (token) {
      localStorage.setItem("token", token);
      dispatch(loadUser()); // Fetch complete user profile including avatar and name
      dispatch(fetchTheme()); // Fetch user theme preferences
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-slate-600">Signing you in...</p>
    </div>
  );
};

export default AuthSuccess;
