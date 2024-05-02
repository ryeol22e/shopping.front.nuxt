export default defineNuxtPlugin({
  name: 'auth-check',
  enforce: process.server ? 'pre' : 'post',
  async setup() {
    await useStoreMember().authCheck();
  },
});
