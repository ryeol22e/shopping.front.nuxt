export default defineNuxtPlugin({
  name: 'auth-check',
  enforce: process.server ? 'pre' : 'post',
  async setup() {
    const storeMember = useStoreMember();
    await storeMember.authCheck();
  },
});
