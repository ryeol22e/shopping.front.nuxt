export const useSetSeoMeta = (to: any) => ({
  setSeoMeta() {
    type signature = {
      [key: string]: any;
      [key: number]: any;
    };

    const seoMeta: object = {};
    useSeoMeta(seoMeta);
  },
});
