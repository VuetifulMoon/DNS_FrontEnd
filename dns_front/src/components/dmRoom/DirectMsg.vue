<template>
  <div>
    {{ dmRoomId }}번 채팅방<br />
    유저이름:
    <input v-model="userId" type="text" />
    내용: <input v-model="dmMessage" type="text" @keyup="sendMessage" />
    <div v-for="(item, idx) in dmMessages" :key="idx">
      <h3>유저이름: {{ item.nickname }}</h3>
      <h3>내용: {{ item.dmMessage }}</h3>
      <br />
    </div>
  </div>
</template>
<script>
import Stomp from "webstomp-client";
import SockJS from "sockjs-client";

export default {
  name: "App",
  data() {
    return {
      dmRoomId: this.$route.params.dmRoomId,
      userId: "",
      memberId: 1,
      dmMessage: "",
      dmMessages: [],
    };
  },
  props: {
    roomList: {
      type: Array,
      required: true,
    },
  },
  created() {
    this.connect();
    this.dmRoom();
  },
  methods: {
    sendMessage(e) {
      //enter 및 데이터가 존재하는 경우에만 send함수 실행
      if (e.keyCode === 13 && this.userId !== "" && this.dmMessage !== "") {
        this.send();
        this.dmMessage = "";
      }
    },
    send() {
      console.log("Send message:" + this.dmMessage);
      if (this.stompClient && this.stompClient.connected) {
        const dm = {
          userId: this.userId,
          dmMessage: this.dmMessage,
        };
        this.stompClient.send("/dm-message", JSON.stringify(dm), {});
      }
    },
    connect() {
      const serverURL = "http://localhost:8080";
      let socket = new SockJS(serverURL);
      //socket위에 stomp를 올림
      this.stompClient = Stomp.over(socket);
      console.log(`소켓 연결시도 : ${serverURL}`);
      this.stompClient.connect(
        //헤더 정보
        {},
        //연결 성공 시 호출되는 콜백 함수
        (frame) => {
          // 소켓 연결 성공
          this.connected = true;
          console.log("소켓 연결 성공", frame);
          // 구독 ,,
          this.stompClient.subscribe(`/sub/dm/${dmRoomId}`, (res) => {
            console.log("구독 성공 결과 : ", res.body);

            // JSON을 객체로 변환 후 배열에 넣어주기
            this.recvList.push(JSON.parse(res.body));
          });
        },
        (error) => {
          // 소켓 연결 실패
          console.log("소켓 연결 실패", error);
          this.connected = false;
        }
      );
    },
    dmRoom() {
      console.log(this.roomList);
      const data = {
        dmRoomId: this.dmRoomId,
        memberProfile: {
          memberId: this.memberId,
          profileImageUrl: this.roomList.memberProfile.profileImageUrl,
          nickname: this.roomList.memberProfile.nickname,
        },
      };
      this.$axios
        .get(`/dm-rooms/${this.dmRoomId}`)
        .then((res) => {
          this.recvList = res.data;
        })
        .catch((err) => {
          console.log("에러 발생 => " + err);
        });
    },
  },
};
</script>