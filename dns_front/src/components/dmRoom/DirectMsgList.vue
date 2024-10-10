<template>
  <div id="app">
    <button>새로운 메세지 생성</button>
    멤버아이디 : {{ list.memberId }}
    <br />
    닉네임 : {{ list.nickname }}
    <br />
    최근 메세지 : {{ list.recentMessage }}
    <br />
    최근 메세지 시간 : {{ list.recentMessageTime }}
    <br />
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Object,
      required: true,
    },
  },
};
</script>