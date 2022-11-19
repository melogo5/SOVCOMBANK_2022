import { useEffect } from "react";
import { useUnit } from "effector-react";
import { useNavigate } from "react-router-dom";
import { $user } from '../context/user';

const useLoginNavigate = () => {
  const user = useUnit($user);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log({ user });

    if (!user) return;
    // console.log(location.pathname);
    if (user.admin) {
      navigate("/admin-panel");
      return;
    }
    navigate(user.user ? "/dashboard" : "/review");
  }, [user]);
}

export default useLoginNavigate;
