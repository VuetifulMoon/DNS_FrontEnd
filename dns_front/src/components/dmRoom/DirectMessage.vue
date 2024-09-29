<template>
  <div>
    <h1>디엠리스트</h1>
    <ul>
      <li v-for="list in roomList" :key="list.dmRoomId">
        <!-- 클릭 시 해당 방의 정보를 changeDetail로 업데이트하고 라우터 이동 -->
        <Router-link
          :to="{
            name: 'dm-room',
            params: { dmRoomId: list.dmRoomId, list: list },
          }"
          @click="changeDetail"
        >
          <direct-msg-list :list="list" />
        </Router-link>
        <div v-if="isDirect === true">
          <h1>디엠상세</h1>
          <!-- <direct-msg :list="list" /> -->
          <router-view v-if="list" :list="list" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import DirectMsg from "./DirectMsg.vue";
import DirectMsgList from "./DirectMsgList.vue";
export default {
  components: { DirectMsgList, DirectMsg },
  data() {
    return {
      isDirect: false,
      memberId: 1,
      roomList: [],
      list: {},
    };
  },
  created() {
    // 채팅 목록을 가져옴
    this.fetchRoom();
  },
  methods: {
    // 클릭한 방의 정보를 업데이트
    changeDetail() {
      console.log("a");
      this.isDirect = !this.isDirect;
    },
    fetchRoom() {
      // 서버에서 채팅방 목록 가져오기
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
