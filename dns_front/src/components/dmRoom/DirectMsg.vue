<template>
  <div v-if="list">
    {{ list.dmRoomId }}번 채팅방<br />
    내용:
    <input
      v-model="dmMessage"
      type="text"
      @keyup="sendMessage"
      style="
         {
          border: 1px solid black;
          width: 200px;
          height: 20px;
        }
      "
      placeholder="내용 입력 후 엔터"
    />
    <div v-for="(item, idx) in dmMessages" :key="idx">
      <h3>유저이름: {{ item.nickname }}</h3>
      <h3>내용: {{ item.allMessages.content }}</h3>
      <br />
    </div>
  </div>
</template>

<script>
import Stomp from "webstomp-client";
import SockJS from "sockjs-client";

export default {
  name: "DirectMsg",
  props: {
    list: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      memberId: 1,
      dmMessage: "",
      dmMessages: [],
      stompClient: null, // Stomp 클라이언트 초기화
    };
  },
  created() {
    // WebSocket 연결 및 메시지 구독
    this.connect();
    // DM 방 정보 가져오기
    if (this.list) {
      this.dmRoom();
    }
    // 콘솔에서 받아온 dmRoomId 확인
    console.log(this.list.dmRoomId);
  },

  methods: {
    sendMessage(e) {
      // Enter 키와 입력값이 있을 때 메시지 전송
      if (e.keyCode === 13 && this.dmMessage !== "") {
        this.send();
        this.dmMessage = "";
      }
    },
    send() {
      // WebSocket을 통한 메시지 전송
      console.log("Send message:" + this.dmMessage);
      if (this.stompClient && this.stompClient.connected) {
        const dm = {
          dmRoomId: this.list.dmRoomId,
          senderId: this.memberId,
          time: new Date(),
          content: this.dmMessage,
        };
        this.stompClient.send("/pub/dm-message", JSON.stringify(dm), {});
      }
    },
    connect() {
      // WebSocket 서버 연결
      const serverURL = "http://localhost:8080/ws-stomp";
      let socket = new SockJS(serverURL);
      this.stompClient = Stomp.over(socket);

      console.log(`소켓 연결시도 : ${serverURL}`);
      this.stompClient.connect(
        {},
        (frame) => {
          // 소켓 연결 성공
          console.log("소켓 연결 성공", frame);
          this.stompClient.subscribe(`/sub/dm/${this.list.dmRoomId}`, (res) => {
            console.log("구독 성공 결과 : ", res.body);
            // 메시지 배열에 추가
            this.dmMessages.allMessage.push(JSON.parse(res.body));
          });
        },
        (error) => {
          // 소켓 연결 실패
          console.log("소켓 연결 실패", error);
          console.log("재연결 시도...");
          //3초 후 재연결 시도
          setTimeout(() => {
            this.connect();
          }, 3000);
        }
      );
    },
    dmRoom() {
      // 채팅방 정보 가져오기
      const data = {
        dmRoomId: this.list.dmRoomId,
        memberId: this.list.memberId,
        profileImageUrl: this.list.profileImageUrl,
        nickname: this.list.nickname,
      };
      console.log(data);
      this.$axios
        .get(`/dm-rooms/${this.list.dmRoomId}`, {
          params: {
            dmRoomId: this.list.dmRoomId,
            memberId: this.list.memberId,
            profileImageUrl: this.list.profileImageUrl,
            nickname: this.list.nickname,
          },
        })
        .then((res) => {
          this.dmMessages = res.data;
        })
        .catch((err) => {
          console.log("에러 발생 => " + err);
        });
    },
  },
};
</script>
