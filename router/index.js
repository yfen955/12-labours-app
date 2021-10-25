import Vue from "vue";
import Router from "vue-router";
import { interopDefault } from "./utils";

Vue.use(Router);

const ContactUs = () =>
  interopDefault(
    import(
      "../pages/contact-us/index.vue" /* webpackChunkName: "pages/contact-us/index" */
    )
  );
const SiteFeecback = () =>
  interopDefault(
    import(
      "../pages/site-feedback/index.vue" /* webpackChunkName: "pages/site-feedback/index" */
    )
  );
const TermsOfService = () =>
  interopDefault(
    import(
      "../pages/terms-of-service/index.vue" /* webpackChunkName: "pages/terms-of-service/index" */
    )
  );
const NewsAndEventsEvents = () =>
  interopDefault(
    import(
      "../pages/news-and-events/events/index.vue" /* webpackChunkName: "pages/news-and-events/events/index" */
    )
  );
const NewsAndEventsNews = () =>
  interopDefault(
    import(
      "../pages/news-and-events/news/index.vue" /* webpackChunkName: "pages/news-and-events/news/index" */
    )
  );
const NewsAndEventsEventsDetail = () =>
  interopDefault(
    import(
      "../pages/news-and-events/events/_detail.vue" /* webpackChunkName: "pages/news-and-events/events/_detail" */
    )
  );
const NewsAndEventsNewsDetail = () =>
  interopDefault(
    import(
      "../pages/news-and-events/news/_detail.vue" /* webpackChunkName: "pages/news-and-events/news/_detail" */
    )
  );
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
        path: "/contact-us",
        component: ContactUs,
        name: "contact-us",
      },
      {
        path: "/site-feedback",
        component: SiteFeecback,
        name: "site-feedback",
      },
      {
        path: "/terms-of-service",
        component: TermsOfService,
        name: "terms-of-service",
      },
      {
        path: "/news-and-events",
        component: NewsAndEvents,
        name: "news-and-events",
      },
      {
        path: "/news-and-events/events",
        component: NewsAndEventsEvents,
        name: "news-and-events-events",
      },
      {
        path: "/news-and-events/news",
        component: NewsAndEventsNews,
        name: "news-and-events-news",
      },
      {
        path: "/news-and-events/events/:detail?",
        component: NewsAndEventsEventsDetail,
        name: "news-and-events-events-detail",
      },
      {
        path: "/news-and-events/news/:detail?",
        component: NewsAndEventsNewsDetail,
        name: "news-and-events-news-detail",
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
