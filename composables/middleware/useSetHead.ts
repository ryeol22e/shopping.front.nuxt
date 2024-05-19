export const useSetHead = (to: any) => ({
  setHead() {
    const pageName = to.name;
    const head = <HeadObject>{};

    switch (pageName) {
      case 'index':
        head.title = 'shoppingmall';
        break;
      case 'product-prdtNo':
        const storeProduct = useStoreProduct();
        head.title = computed(() => storeProduct.getDetail.prdtName);
        break;
      default:
        head.title = pageName;
        break;
    }

    useHead(head);
  },
});
