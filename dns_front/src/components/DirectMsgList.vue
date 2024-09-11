<template>
  <div id="app">
    <div>NickName</div>
    <button>메세지 추가</button>
    <ul>
      <li v-for="list in roomList" :key="list.dmRoomId">
        <Router-link :to="`/dm-rooms/${list.dmRoomId}`">
          {{ list.profile }}
          {{ list.nickName }}
          {{ list.dmMessage }}
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
      roomList: [
        {
          dmRoomId: 1,
          profile: "profile1",
          nickName: "nick1",
          dmMessage: "message1",
        },
        {
          dmRoomId: 2,
          profile: "profile2",
          nickName: "nick2",
          dmMessage: "message2",
        },
        {
          dmRoomId: 3,
          profile: "profile3",
          nickName: "nick3",
          dmMessage: "message3",
        },
        {
          dmRoomId: 4,
          profile: "profile4",
          nickName: "nick4",
          dmMessage: "message4",
        },
        {
          dmRoomId: 5,
          profile: "profile5",
          nickName: "nick5",
          dmMessage: "message5",
        },
        {
          dmRoomId: 6,
          profile: "profile6",
          nickName: "nick6",
          dmMessage: "message6",
        },

        //... more items
      ],
    };
  },
  created() {
    //채팅 목록을 가져옴
    // this.fetchRoom();
  },
  methods: {
    fetchRoom() {
      const serverURL = "http://localhost:8080"; // server URL

      this.$axios
        .get(`${serverURL}` + "/dm-rooms")
        .then((res) => {
          this.roomList = res.data;
        })
        .catch((err) => {
          console.error("에러 발생:" + err);
        });
    },
  },
};
</script>