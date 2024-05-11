class MEMBER_CONST {
  private constructor() {}

  static ADMIN = '10003';
  static MEMBER = '10000';
  static ANONYMOUS = '9999';
  static VIP = '10001';
}
class COMMON_CONST {
  private constructor() {}
}

export default () => ({
  COMMON_CONST,
  MEMBER_CONST,
});
