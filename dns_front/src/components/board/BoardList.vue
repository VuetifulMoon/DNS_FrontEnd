<template>
  <div>
    <h1>게시판 입니다.</h1>
    <!-- 게시글 for문 -->
    <div v-if="isBoard == false">
      <div>
        멤버 ID : {{ post.memberId }}<br />
        {{ post.profile }}
        {{ post.nickName }}
        {{ post.createdAt }}
        <!-- 이미지 for문 -->
        <div v-for="(image, idx) in post.images" :key="idx">
          {{ image }}
        </div>
        {{ post.contents }}
      </div>
      <button @click="editBoard()">수정</button>
      <button @click="deleteBoard(post.postId)">삭제</button>
    </div>
    <div v-else>
      <div>
        멤버 ID : {{ post.memberId }}<br />
        {{ post.profile }}
        {{ post.nickName }}
        {{ post.createdAt }}
        <!-- 이미지 for문 -->
        <input type="file" multiple /><br />
        <input type="text" v-model="editBoardText" />
        <div v-for="(image, idx) in post.images" :key="idx">
          {{ image }}
        </div>
      </div>
      <button @click="EDIT_BOARD()">수정완료</button>
      <button @click="editBoardCancel()">취소</button>
    </div>
    <div>
      <button @click="fetchReply()">댓글 보기</button>
      <br />
      <div v-if="replyState == true">
        <ul>
          <li v-for="reply in comments" :key="reply.commnetId">
            <Reply :post="post" :reply="reply" />
          </li>
        </ul>
      </div>
      <div v-else>댓글 숨겨짐</div>
    </div>
  </div>
</template>
<script>
import Reply from "../reply/Reply";
export default {
  components: { Reply },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comments: [
        {
          postId: 1,
          profile: "프로필 이미지",
          nickName: "Canelo",
          comment: "좋아요!",
          commnetId: 1,
        },
      ],
      replyState: false,
      isBoard: false,
      editBoardText: "",
      editBoardImages: [],
    };
  },
  created() {
    // this.fetchBoard();
  },
  methods: {
    //댓글 목록 조회
    fetchReply() {
      this.replyState = !this.replyState;
      // return (
      //   this.$axios
      //     // .get(`http://172.16.101.131:8080//post/${this.post.postId}/comments`)
      //     .get(`/post/${this.post.postId}/comments`)
      //     .then((res) => {
      //       console.log("통신 성공!");
      //       console.log("통신 결과값 :" + res);
      //       this.commnets.push(res.data);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     })
      // );
    },
    //게시물 수정 상태 true <> false
    editBoard() {
      this.isBoard = !this.isBoard;
      this.editBoardText = this.post.contents;
      this.editBoardImages.push(this.post.images);
    },
    editBoardCancel() {
      this.isBoard = false;
      this.editBoardText = "";
      this.editBoardImages = [];
    },
    //게시물 수정
    EDIT_BOARD() {
      const editBoard = {
        text: this.editBoardText,
        images: this.editBoardImages,
      };
      this.$axios.patch(`/post/${this.post.postId}`, editBoard).then((res) => {
        if (res.state == 202) {
          alert("수정이 완료되었습니다.");
          this.isBoard = false;
        } else {
          alert("실패했습니다. 다시 시도해주세요.");
          this.isBoard = false;
        }
      });
    },
    //게시물 삭제
    deleteBoard(postId) {
      //로그인한 멤버id랑 비교하는거로 수정해야함
      if (this.post.memberId == 1) {
        this.$axios
          .delete(`/post/${postId}`)
          .then((res) => {
            if (res.status == 204) {
              alert("삭제가 완료되었습니다.");
            } else if (res.status == 400) {
              alert("존재하지 않는 게시물입니다.");
            } else {
              alert("삭제를 실패했습니다. 다시 시도해주세요.");
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
  },
};
</script>