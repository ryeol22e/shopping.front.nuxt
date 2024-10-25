/**
 * 배너
 */
export type BannerInfo = {
  id: number;
  bannerType: string;
  imageData: Blob;
  title: string;
  description: string;
  dispYn: string;
  useYn: string;
  dispStartDtm: string;
  dispEndDtm: string;
  rgstDtm: string;
  modDtm: string;
  file: File;
};

/**
 * 카테고리
 */
export type CategoryInfo = {
  cateId: number;
  cateNo: string;
  cateDepth: string;
  upCateNo: string;
  cateName: string;
  cateFullPath: string;
  useYn: string;
  dispYn: string;
};

export type ProductInfo = {
  prdtIndex: number;
  prdtNo: string;
  cateNo: string;
  prdtName: string;
  dispYn: string;
  useYn: string;
  normalPrice: string;
  sellPrice: string;
  imagePath: string;
  imageFullPath: string;
  file: File;
};
