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
    // {
    //   path: "/dm-rooms/:dmRoomId",
    //   name: "dm-room",
    //   component: () => import("../components/dmRoom/DirectMsg.vue"),
    //   props: (route) => ({ list: route.params.list }),
    // },
    {
      path: "/posts",
      name: "mainBoard",
      component: () => import("../components/board/MainBoard.vue"),
    },
    // {
    //   path: "/posts/:postId/comments",
    //   name: "reply",
    //   component: () => import("../components/reply/Reply.vue"),
    // },
    {
      path: "/notification/:memberId",
      name: "notification",
      component: () => import("../views/Notice.vue"),
    },
    {
      path: "/dmMain",
      name: "DirectMessageMain",
      component: () => import("../components/dmRoom/DirectMessage.vue"),
    },
    {
      path: "/memberSignup/",
      name: "memberSignup",
      component: () => import("../components/member/MemberSingup.vue"),
    },
    {
      path: "/board",
      name: "board",
      component: () => import("../views/Board.vue"),
    },
  ],
});
