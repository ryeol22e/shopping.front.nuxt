export declare type KeyObject = {
  [key: string | number];
};
export declare type SEOMetaObject = {
  title?: MaybeComputedRefOrPromise;
  ogTitle?: MaybeComputedRefOrPromise;
  description?: MaybeComputedRefOrPromise;
  ogDescription?: MaybeComputedRefOrPromise;
  ogImage?: MaybeComputedRefOrPromise;
  twitterCard?: MaybeComputedRefOrPromise;
};
export declare type HeadObject = {
  title?: Title;
  titleTemplate?: string | ((title?: string) => string);
  base?: Base;
  link?: Link[];
  meta?: Meta[];
  style?: Style[];
  script?: Script[];
  noscript?: Noscript[];
  htmlAttrs?: HtmlAttributes;
  bodyAttrs?: BodyAttributes;
};

export declare type CommonField = {
  codeId: number;
  codeType: string;
  codeDepth: number;
  codeName: string;
  useYn: string;
  addInfo1: strin;
  addInfo2: string;
};
