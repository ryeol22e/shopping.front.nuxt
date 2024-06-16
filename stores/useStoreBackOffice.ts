export const useStoreBo = defineStore('useStoreBo', () => {
  const router = useRouter();
  const { runPost } = useRunFetch();
  const bannerInfo = ref({});

  const registBannerInfo = (param: any): void => {
    runPost('/admin/banner/save', param)
      .then((res: any) => {
        const result = res.data;

        if (result) {
          alert('저장완료되었습니다.');
          router.go(0);
        }
      })
      .catch((error) => console.log(error));
  };

  return {
    registBannerInfo,
  };
});
