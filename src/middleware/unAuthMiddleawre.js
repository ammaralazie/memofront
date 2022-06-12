import * as cookie from "vue-cookies"
export default function auth({ next, router }) {
  if (cookie.get("user")) {
    return router.push({ name: 'home' });
  }/* end of auth */
  return next();
}/* end of auth */


