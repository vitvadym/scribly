import { useSession } from 'next-auth/react';

export const useAuth = () => {
  const { data: session, status } = useSession();

  const isAuthenticated = status === 'authenticated';
  const isSessionLoading = status === 'loading';
  const userRole = session?.user?.role;
  const user = session?.user;

  return { isAuthenticated, userRole, user, isSessionLoading };
};
