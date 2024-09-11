<template>
  <div id="app">
    <Router-link to="/">Home</Router-link>
    <br />
    <Router-link to="/dm-rooms">DM</Router-link>
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