import type { CategoryInfo, ProductInfo } from '~/@types/business-type';

export const useStoreProduct = defineStore('useStoreProduct', () => {
  const { getFetch } = useAppFetch();

  const list = ref<Array<ProductInfo>>([]);
  const detail = ref<ProductInfo>({
    prdtNo: '',
    cateNo: '',
    dispYn: 'N',
    prdtName: '',
    imageFullPath: '',
    imagePath: '',
    sellPrice: '',
    useYn: 'N',
    normalPrice: '',
    prdtIndex: -1,
  });
  const cateList = ref<Array<CategoryInfo>>([]);
  const saveProductResult = ref<boolean>(false);

  const setList = async (cateNo: string): Promise<void> => {
    list.value = await getFetch<Array<ProductInfo>>('/display/product/list', {
      cateNo,
      useYn: 'Y',
      dispYn: 'Y',
    }).catch(() => []);
  };
  const setDetail = async (prdtNo: string): Promise<void> => {
    detail.value = await getFetch<ProductInfo>(`/product/${prdtNo}`).catch(() => ({} as ProductInfo));
  };
  const setCateList = async (param: any): Promise<void> => {
    cateList.value = await getFetch<Array<CategoryInfo>>(`/cate/list`, param).catch(() => []);
  };
  const setProductData = async (param: FormData): Promise<void> => {
    const prdtNo = param.get('prdtNo');
    saveProductResult.value = await getFetch<boolean>(`/product/${prdtNo}`, param).catch(() => false);
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
