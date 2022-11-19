import { useEffect } from "react";
import { useUnit } from "effector-react";
import { useNavigate } from "react-router-dom";
import { $user } from '../context/user';

const useUserExist = () => {
  const user = useUnit($user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) return;
    navigate("/login");
  }, []);

  return user;
}

export default useUserExist;
