<template>
  <div>
    <NoticeItem/>
  </div>
</template>

<script>
import NoticeItem from './NoticeItem.vue';

export default {
  components: {
    NoticeItem
  },
  created() {
    this.$store.dispatch('fetchNotice', 1);
  }
}
</script>

<style>

</style>