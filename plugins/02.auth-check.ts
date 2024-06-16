export default defineNuxtPlugin({
  name: 'auth-check',
  enforce: import.meta.server ? 'pre' : 'post',
  async setup() {
    await useStoreMember().authCheck();
  },
});
