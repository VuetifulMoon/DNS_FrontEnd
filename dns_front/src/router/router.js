// src/router.js
import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";

Vue.use(Router);

export default new Router({
  mode: "history", // URL에 # 제거, 없애지 않으려면 'hash'로 설정
  routes: [
    {
      path: "/",
      name: "home",
      component: HelloWorld,
    },
    {
      path: "/direct",
      name: "directMessage",
      // lazy-loaded 라우팅
      component: () => import("../components/DirectMsg.vue"),
    },
  ],
});
