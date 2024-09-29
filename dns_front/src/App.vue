<template>
  <div>
    <Router-link to="/">Home</Router-link>
    <br />
    <Router-link to="/dmMain">DM</Router-link>
    <br />
    <Router-link to="/posts">Board</Router-link>
    <br />
    <Router-link to="/notification/1">알림</Router-link>
    <br />
    <Router-link to="/memberSignup">회원가입</Router-link>
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
</style>