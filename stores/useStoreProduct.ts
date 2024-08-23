import type { KeyObject } from '~/@types/global-type';

export const useStoreProduct = defineStore('useStoreProduct', () => {
  const { setupGet } = useSetupFetch();
  const { runPost } = useRunFetch();

  const list = ref<Array<any>>([]);
  const detail = ref<KeyObject>({});
  const cateList = ref<Array<any>>([]);
  const saveProductResult = ref<boolean>(false);

  const setList = async (cateNo: string): Promise<void> => {
    await setupGet('/display/product/list', {
      cateNo: cateNo,
      useYn: 'Y',
      dispYn: 'Y',
    })
      .then((res: any) => {
        list.value = res.data;
      })
      .catch((error) => console.log(error));
  };
  const setDetail = async (prdtNo: string): Promise<void> => {
    await setupGet(`/product/${prdtNo}`)
      .then((res: any) => (detail.value = res.data))
      .catch((error) => console.log(error));
  };
  const setCateList = async (param: any): Promise<void> => {
    await setupGet(`/cate/list`, param)
      .then((res: any) => (cateList.value = res.data))
      .catch((error) => console.log(error));
  };
  const setProductData = async (param: FormData): Promise<void> => {
    const prdtNo = param.get('prdtNo');
    await runPost(`/product/${prdtNo}`, param)
      .then((res: any) => (saveProductResult.value = res.data || false))
      .catch((error) => console.log(error));
  };

  return {
    getList: computed(() => list.value),
    getDetail: computed(() => detail.value),
    getCateList: computed(() => cateList.value),
    getPrdtResult: computed(() => saveProductResult.value),
    setList,
    setDetail,
    setCateList,
    setProductData,
  };
});
