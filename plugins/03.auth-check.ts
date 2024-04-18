export default defineNuxtPlugin({
  name: 'auth-check',
  enforce: 'default',
  async setup() {
    const storeMember = useStoreMember();
    await storeMember.authCheck();
  },
});
