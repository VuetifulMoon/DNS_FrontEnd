<template>
  <div id="app">
    <div>NickName</div>
    <button>새로운 메세지 생성</button>
    <ul>
      <li v-for="list in roomList" :key="list.dmRoomId">
        <Router-link :to="`/dm-rooms/${list.dmRoomId}`">
          멤버아이디 : {{ list.memberId }}
          <br />
          닉네임 : {{ list.nickname }}
          <br />
          최근 메세지 : {{ list.recentMessage }}
          <br />
          최근 메세지 시간 : {{ list.recentMessageTime }}
          <br />
        </Router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      memberId: 1,
      roomList: [],
    };
  },
  created() {
    //채팅 목록을 가져옴
    this.fetchRoom();
  },
  methods: {
    fetchRoom() {
      // const serverURL = "http://localhost:8080"; // server URL

      this.$axios
        .get(`/dm-rooms?memberId=${this.memberId}`)
        .then((res) => {
          console.log(res.data);
          this.roomList = res.data;
        })
        .catch((err) => {
          console.error("에러 발생:" + err);
        });
    },
  },
};
</script>