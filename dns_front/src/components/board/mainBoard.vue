<template>
  <div>
    <h1>게시판 입니다.</h1>
    <ul>
      <!-- 게시글 for문 -->
      <li v-for="post in posts" :key="post.postId">
        <!-- 이미지 for문 -->
        멤버 ID : {{ post.memberId }}<br />
        {{ post.profile }}
        {{ post.nickName }}
        {{ post.createdAt }}
        <div v-for="(image, idx) in post.images" :key="idx">
          {{ image }}
        </div>
        {{ post.contents }}
      </li>
    </ul>
    <div>
      <button @click="fetchReply()">댓글 보기</button>
      <br />
      <div v-if="replyState == true">
        <ul>
          <li v-for="reply in comments" :key="reply.commnetId">
            <Reply :posts="posts" :reply="reply" />
          </li>
        </ul>

        <!-- 수정 상태가 false -->
        <!-- <ul v v-if="editReplyState == false">
          <li v-for="reply in comments" :key="reply.commnetId">
            {{ reply.profile }}
            {{ reply.nickName }}<br />
            {{ reply.comment }}
            <button @click="editReply(reply.commnetId)">수정</button>
            <button @click="deleteReply(posts.postId, reply.commnetId)">
              삭제
            </button>
          </li>
        </ul> -->
        <!-- 수정 상태가 true -->
        <!-- <ul v v-else>
          <li v-for="reply in comments" :key="reply.commnetId">
            {{ reply.profile }}
            {{ reply.nickName }}<br />
            <input type="text" v-model="editReplyText" />
            <button @click="EDIT_REPLY()">완료</button>
            <button @click="editReply()">취소</button>
          </li>
        </ul> -->
      </div>
      <div v-else>댓글 숨겨짐</div>
    </div>
  </div>
</template>
<script>
import Reply from "../reply/Reply";
export default {
  components: { Reply },
  data() {
    return {
      replyState: false,
      comments: [
        {
          postId: 1,
          profile: "프로필 이미지",
          nickName: "Canelo",
          comment: "좋아요!",
          commnetId: 1,
        },
      ],
      posts: [
        {
          memberId: 1,
          postId: 1,
          profile: "프로필 이미지",
          nickName: "Canelo",
          createdAt: "5분 전",
          contents: "저녁먹고싶다.",
          images: ["게시글 사진1", "게시글 사진2"],
        },
      ],
    };
  },
  created() {
    // this.fetchBoard();
  },
  methods: {
    //게시글 목록 조회
    fetchBoard() {
      return (
        this.$axios
          // .get("http://172.16.101.131:8080/posts")
          .get("/posts")
          .then((res) => {
            console.log("통신 결과값 :" + res);
            this.posts.push(res.data);
          })
          .catch((err) => {
            console.log(err);
          })
      );
    },
    //댓글 목록 조회
    fetchReply() {
      this.replyState = !this.replyState;
      // return (
      //   this.$axios
      //     // .get(`http://172.16.101.131:8080//posts/${this.posts.postId}/comments`)
      //     .get(`/posts/${this.posts.postId}/comments`)
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
  },
};
</script>