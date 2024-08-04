import { useSelector } from 'react-redux';
// prettier-ignore
import { selectUser, selectIsLoggedIn } from '../redux/authentication/authenticationSelector';

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  return {
    isLoggedIn,

    user,
  };
};
