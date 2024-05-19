export const useSetSeoMeta = (to: any) => ({
  setSeoMeta() {
    const pageName = to.name;
    const seoMeta = <SEOMetaObject>{};

    switch (pageName) {
      case 'index':
        seoMeta.title = 'shoppingmall';
        break;
      case 'product-prdtNo':
        const storeProduct = useStoreProduct();
        const detail = computed(() => storeProduct.getDetail);
        seoMeta.title = computed(() => detail.value.prdtName);
        seoMeta.ogImage = computed(() => `${detail.value.imagePath}/${detail.value.imageName}`);
        break;
      default:
        seoMeta.title = pageName;
        break;
    }

    useSeoMeta(seoMeta);
  },
});
