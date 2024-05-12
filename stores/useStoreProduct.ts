export const useStoreProduct = defineStore('useStoreProduct', () => {
  const { get, post } = useSetupFetch();
  const {} = useRunFetch();

  const list = ref([]);
  const detail = ref({});
  const cateList = ref([]);
  const saveProductResult = ref(false);

  const getList = computed<Array<any>>(() => list.value);
  const getDetail = computed<any>(() => detail.value);
  const getCateList = computed<Array<any>>(() => cateList.value);
  const getPrdtResult = computed<boolean>(() => saveProductResult.value);

  const setList = async (cateNo: string): Promise<void> => {
    await get('/display/product/list', {
      cateNo: cateNo,
      useYn: 'Y',
      dispYn: 'Y',
    })
      .then((res: any) => (list.value = res.data))
      .catch((error) => console.log(error));
  };
  const setDetail = async (prdtNo: string): Promise<void> => {
    await get(`/product/${prdtNo}`)
      .then((res: any) => (detail.value = res.data))
      .catch((error) => console.log(error));
  };
  const setCateList = async (param: any): Promise<void> => {
    await get(`/cate/list`, param)
      .then((res: any) => (cateList.value = res.data))
      .catch((error) => console.log(error));
  };
  const setProductData = async (param: FormData): Promise<void> => {
    const prdtNo = param.get('prdtNo');
    await post(`/product/${prdtNo}`, param)
      .then((res: any) => (saveProductResult.value = res.data || false))
      .catch((error) => console.log(error));
  };

  return {
    getList,
    getDetail,
    getCateList,
    getPrdtResult,
    setList,
    setDetail,
    setCateList,
    setProductData,
  };
});
