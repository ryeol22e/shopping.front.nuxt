export const useSetSeoMeta = (to: any) => ({
  setSeoMeta() {
    const seoMeta: object = {};
    useSeoMeta(seoMeta);
  },
});
