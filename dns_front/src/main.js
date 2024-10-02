import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import axios from "axios";
Vue.prototype.$axios = axios;

// SockJS 관련 설정
const socket = new SockJS("http://localhost:8080/ws-stomp"); // SockJS 서버 URL
const stompClient = Stomp.over(socket); // STOMP 클라이언트 생성

// 전역으로 STOMP 클라이언트를 사용할 수 있게 등록
Vue.prototype.$stompClient = stompClient;

// Vuetify 스타일 추가
import "vuetify/dist/vuetify.min.css";
import router from "./router/router";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
