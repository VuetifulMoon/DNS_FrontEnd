import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import io from "socket.io-client";
const socket = io("http://localhost:8080");

Vue.prototype.$socket = socket;

//vuetify 스타일 추가
import "vuetify/dist/vuetify.min.css";
import router from "./router/router";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
