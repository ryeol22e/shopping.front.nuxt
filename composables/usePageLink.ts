export const usePageLink = () => {
  const router = useRouter();
  const movePage = (data: any): any => navigateTo(data);
  const backPage = (): void => router.go(-1);
  const reloadPage = (): void => router.go(0);
  const errorPage = (errorType = 404, reason = '') => movePage({ name: 'Error', state: { errorType, reason }, query: {}, params: {}, replace: true });

  return {
    movePage,
    backPage,
    reloadPage,
    errorPage,
  };
};
