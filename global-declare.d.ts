export {};

declare global {
  interface MemberInfo {
    memberId: string;
    memberPassword: string;
  }
  interface AnyObject {
    [key: string | number]: any;
  }
}
