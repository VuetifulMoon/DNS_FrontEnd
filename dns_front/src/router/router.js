// src/router.js
import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import VueRouter from "vue-router";

Vue.use(Router);

export default new VueRouter({
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
    {
      path: "/posts",
      name: "mainBoard",
      component: () => import("../components/board/mainBoard.vue"),
    },
    {
      path: "/posts/:postId/comments",
      name: "reply",
      component: () => import("../components/reply/reply.vue"),
    },
    {
      path: "/notification/:memberId",
      name: "notification",
      component: () => import("../views/Notice.vue"),
    }
  ],
});
