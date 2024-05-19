import type { MetaObject } from 'nuxt/schema';

export {};

declare global {
  interface MemberInfo {
    memberId: string;
    memberPassword: string;
  }
  interface AnyObject {
    [key: string | number]: any;
  }
  interface SEOMetaObject {
    title?: MaybeComputedRefOrPromise;
    ogTitle?: MaybeComputedRefOrPromise;
    description?: MaybeComputedRefOrPromise;
    ogDescription?: MaybeComputedRefOrPromise;
    ogImage?: MaybeComputedRefOrPromise;
    twitterCard?: MaybeComputedRefOrPromise;
  }
  interface HeadObject {
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
  }
}
