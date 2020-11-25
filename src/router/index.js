import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/explorer",
    name: "Explorer",
    component: () =>
      import(/* webpackChunkName: "explorer" */ "../views/Explorer.vue")
  },
  {
    path: "/quorum",
    name: "Quorum",
    component: () =>
      import(/* webpackChunkName: "quorum" */ "../views/Quorum.vue")
  },
  {
    path: "/nodes",
    name: "Node",
    component: () =>
      import(/* webpackChunkName: "node" */ "../views/Node.vue")
  },
];

const router = new VueRouter({
  routes
});

export default router;
