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
      path: "/dm-rooms",
      name: "dm-roomList",
      component: () => import("../components/dmRoom/DirectMsgList.vue"),
    },
    {
      path: "/dm-rooms/:dmRoomId",
      name: "dm-room",
      component: () => import("../components/dmRoom/DirectMsg.vue"),
    },
  ],
});
