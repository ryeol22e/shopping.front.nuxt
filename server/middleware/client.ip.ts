export default defineEventHandler((event) => {
  if (process.server) {
    // console.log(getRequestIP(event));
  }
});
