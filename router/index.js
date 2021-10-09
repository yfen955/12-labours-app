import Vue from "vue";
import Router from "vue-router";
import { interopDefault } from "./utils";

Vue.use(Router);

const About = () =>
  interopDefault(
    import(
      "../pages/about/index.vue" /* webpackChunkName: "pages/about/index" */
    )
  );
const NewsAndEvents = () =>
  interopDefault(
    import(
      "../pages/news-and-events/index.vue" /* webpackChunkName: "pages/news-and-events/index" */
    )
  );
const Resources = () =>
  interopDefault(
    import(
      "../pages/resources/index.vue" /* webpackChunkName: "pages/resources/index" */
    )
  );
const Index = () =>
  interopDefault(
    import("../pages/index.vue" /* webpackChunkName: "pages/index" */)
  );

export function createRouter() {
  return new Router({
    mode: "history",
    routes: [
      {
        path: "/about",
        component: About,
        name: "about",
      },
      {
        path: "/news-and-events",
        component: NewsAndEvents,
        name: "news-and-events",
      },
      {
        path: "/resources/:pageName*",
        component: Resources,
        name: "resources",
      },
      {
        path: "/",
        component: Index,
        name: "index",
      },
    ],
  });
}
