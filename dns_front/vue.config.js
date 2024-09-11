const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  //스프링 부트와 겹치기 때문에 3000 포트로 변경
  devServer: {
    port: 3000,
    proxy: "http://localhost:8080",
  },
});
