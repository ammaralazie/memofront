import { createRouter, createWebHistory } from "vue-router";
import VerfiyComponent from "../components/VerfiyComponent.vue";
import ComplateSignUp from "../components/ComplateSignUp.vue";
import passwordConfirmation from "../components/passwordConfirmation.vue";
import HomeComponent from "../components/HomeComponent.vue";
import LoginComponent from "../components/LoginComponent.vue";
import LogoutComponent from "../components/LogoutComponent.vue";
import auth from "../middleware/authntictate";
import unauth from "../middleware/unAuthMiddleawre";
import CallComponent from "../components/CallComponent.vue"
import memo from "../assets/uploads/image/memo.png"

const routes = [
  {
    path: "/",
    name: "verify",
    component: VerfiyComponent,
    meta: {
      title: "Memo Chat",
      icon: memo,
      middleware:unauth
    },
  },
  {
    path: "/home",
    name: "home",
    meta: {
      middleware: auth,
      title: "Memo Chat",
      icon: memo,
    },
    component: HomeComponent,
  },
  {
    path: "/contact",
    name: "contact",
    meta: {
      title: "Memo Chat",
      icon: memo,
      middleware: auth,
    },
    component: CallComponent,
  },
  {
    path: "/personal-information",
    name: "personal-information",
    component: ComplateSignUp,
    meta: {
      title: "Memo Chat",
      icon: memo,
      middleware:unauth
    }
  },
  {
    path: "/login",
    name: "login",
    component: LoginComponent,
    meta: {
      title: "Memo Chat",
      icon: memo,
      middleware:unauth
    }
  },
  {
    path: "/set-password",
    name: "passwordConfirmation",
    component: passwordConfirmation,
    meta: {
      title: "Memo Chat",
      icon: memo,
      middleware:unauth
    }
  },
  {
    path:"/logout",
    name:"logout",
    component:LogoutComponent,
    middleware: auth,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});






// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});








export default router;
