import { useRouter } from 'next/router';

const useIsAdmin = () => {
  const router = useRouter();

  return router.route.startsWith('/admin');
};

export default useIsAdmin;
