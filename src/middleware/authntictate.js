import * as cookie from "vue-cookies"
export default function unauth({ next, router }) {
  if (!cookie.get("user")) {
    return router.push({ name: 'verify' });
  }/* end of auth */
  return next();
}/* end of auth */


