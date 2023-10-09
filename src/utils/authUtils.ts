import { CurrentUser } from '../types/CurrentUser';
export const isUserLoggedIn = (currentUser: CurrentUser): boolean => {
  return !!currentUser.id;
};
