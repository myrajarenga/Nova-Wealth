import { onRequestGet as __api_auth_google_callback_js_onRequestGet } from "C:\\Users\\Myra\\OneDrive\\Desktop\\nova wealth\\functions\\api\\auth\\google\\callback.js"
import { onRequestPost as __api_auth_mfa_verify_js_onRequestPost } from "C:\\Users\\Myra\\OneDrive\\Desktop\\nova wealth\\functions\\api\\auth\\mfa\\verify.js"
import { onRequestGet as __api_auth_google_index_js_onRequestGet } from "C:\\Users\\Myra\\OneDrive\\Desktop\\nova wealth\\functions\\api\\auth\\google\\index.js"
import { onRequestPost as __api_auth_login_js_onRequestPost } from "C:\\Users\\Myra\\OneDrive\\Desktop\\nova wealth\\functions\\api\\auth\\login.js"
import { onRequestGet as __api_auth_me_js_onRequestGet } from "C:\\Users\\Myra\\OneDrive\\Desktop\\nova wealth\\functions\\api\\auth\\me.js"
import { onRequestPost as __api_auth_register_js_onRequestPost } from "C:\\Users\\Myra\\OneDrive\\Desktop\\nova wealth\\functions\\api\\auth\\register.js"
import { onRequestPost as __api_leads_index_js_onRequestPost } from "C:\\Users\\Myra\\OneDrive\\Desktop\\nova wealth\\functions\\api\\leads\\index.js"
import { onRequest as __api_test_js_onRequest } from "C:\\Users\\Myra\\OneDrive\\Desktop\\nova wealth\\functions\\api\\test.js"
import { onRequest as ___middleware_js_onRequest } from "C:\\Users\\Myra\\OneDrive\\Desktop\\nova wealth\\functions\\_middleware.js"

export const routes = [
    {
      routePath: "/api/auth/google/callback",
      mountPath: "/api/auth/google",
      method: "GET",
      middlewares: [],
      modules: [__api_auth_google_callback_js_onRequestGet],
    },
  {
      routePath: "/api/auth/mfa/verify",
      mountPath: "/api/auth/mfa",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_mfa_verify_js_onRequestPost],
    },
  {
      routePath: "/api/auth/google",
      mountPath: "/api/auth/google",
      method: "GET",
      middlewares: [],
      modules: [__api_auth_google_index_js_onRequestGet],
    },
  {
      routePath: "/api/auth/login",
      mountPath: "/api/auth",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_login_js_onRequestPost],
    },
  {
      routePath: "/api/auth/me",
      mountPath: "/api/auth",
      method: "GET",
      middlewares: [],
      modules: [__api_auth_me_js_onRequestGet],
    },
  {
      routePath: "/api/auth/register",
      mountPath: "/api/auth",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_register_js_onRequestPost],
    },
  {
      routePath: "/api/leads",
      mountPath: "/api/leads",
      method: "POST",
      middlewares: [],
      modules: [__api_leads_index_js_onRequestPost],
    },
  {
      routePath: "/api/test",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_test_js_onRequest],
    },
  {
      routePath: "/",
      mountPath: "/",
      method: "",
      middlewares: [___middleware_js_onRequest],
      modules: [],
    },
  ]