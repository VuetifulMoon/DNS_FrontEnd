<template>
  <div class="home">
    <div class="navBar">
      <Router-link to="/">Home</Router-link>
      <br />
      <Router-link to="/dmMain">DM</Router-link>
      <br />
      <Router-link to="/board">Board</Router-link>
      <br />
      <Router-link to="/notification/1">알림</Router-link>
      <br />
      <Router-link to="/memberSignup">회원가입</Router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
<style>
.home {
  display: flex;
  display: 100%;
}
.navBar {
  display: flex;
  flex-direction: column;
  height: 1080px;
  background-color: aqua;
}
</style>