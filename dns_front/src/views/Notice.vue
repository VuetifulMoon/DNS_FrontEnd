<template>
  <div class="notice">
    <v-icon @click="showHandler" large>mdi-bell</v-icon>
    <NoticeItem v-show="show"/>
  </div>
</template>

<script>
import NoticeItem from '../components/notice/NoticeItem.vue';

export default {
  components: {
    NoticeItem
  },
  data() {
    return{
      show: false
    }
  },
  methods: {
    showHandler() {
      this.show = !this.show;
    }
  },
  created() {
    this.$store.dispatch('fetchNotice', 1);
  }
}
</script>

<style>
</style>