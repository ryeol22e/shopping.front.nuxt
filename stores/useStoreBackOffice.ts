export const useStoreBo = defineStore('useStoreBo', () => {
  const { postFetch } = useAppFetch();

  const registBannerInfo = async (param: any) => {
    const data = await postFetch<{ data: boolean }>('/admin/banner/save', param).catch((error) => console.log(error));

    if (data) {
      alert('저장완료되었습니다.');
      reloadNuxtApp();
    }
  };

  return {
    registBannerInfo,
  };
});
