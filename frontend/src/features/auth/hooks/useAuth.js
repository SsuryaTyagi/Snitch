import { Register } from "../services/auth.api";
import { setUser, setError, setLoading, setMessage } from "../auth.Slice";
import { useSelector, useDispatch } from "react-redux";

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state) => state.authReducer);

  const handleRegister = async (fullname, email, password, contact, isSeller = false) => {
    try {
      dispatch(setLoading(true));
      const res = await Register(fullname, email, password,contact, isSeller);
      dispatch(setMessage(res.message));
    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { handleRegister, user, loading, error };
};
