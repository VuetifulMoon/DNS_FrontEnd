<template>
  <div class="container">
    <div class="boardItem">
      <div class="profile">
        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          max-height="100"
          max-width="100"
          src="https://picsum.photos/id/11/500/300"
          class="profileImg"
        ></v-img>
        <div class="profileInfo">{{ post.nickName }}</div>
      </div>

      <v-icon class="invisibleMenu">mdi-menu</v-icon>

      <v-img
        lazy-src="https://picsum.photos/id/11/10/6"
        max-height="300"
        max-width="400"
        src="https://picsum.photos/id/11/500/300"
        class="img"
      ></v-img>

      <div class="icon">
        <v-icon @click="fetchComment(post.postId)">mdi-chat</v-icon>
        <v-icon>mdi-send</v-icon>
      </div>

      <div class="boardCreatedAt">{{ post.createdAt }}</div>
      <div class="boardContent">{{ post.postContent }}</div>

      <hr class="hr" />
    </div>
    <div class="comment">
      <div v-if="isComment === true">
        <ul>
          <li v-for="comment in comments" :key="comment.commentId">
            <Comment :post="post" :comment="comment" />
            <button @click="fetchReply(comment.commentId)">댓글 더보기</button>
            <br />
            <br />
            <br />
            <div v-if="isReply === true">
              <ul v-for="(reply, idx) in comment.reply" :key="idx">
                <Reply :reply="reply" />
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div v-else>댓글 숨겨짐</div>
    </div>
  </div>
</template>

<script>
import Comment from "@/components/reply/Comment.vue";
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  components: { Comment },
  data() {
    return {
      comments: [],
      isComment: false,
      isBoard: false,
      isReply: false,
      editBoardText: "",
      editBoardImages: [],
      comment: "",
    };
  },
  methods: {
    //댓글 목록 조회
    fetchComment(postId) {
      this.isComment = !this.isComment;
      console.log(this.post.content);
      return (
        this.$axios
          // .get(`http://172.16.101.131:8080//post/${this.post.postId}/comments`)
          .get(`/posts/${postId}/comments`)
          .then((res) => {
            console.log("통신 성공!");
            console.log(res);
            this.comments = res.data.content;
          })
          .catch((err) => {
            console.log(err);
          })
      );
    },
    //대댓글 상태
    fetchReply(commentId) {
      this.$axios
        .get(`/posts/${this.post.postId}/comments/${commentId}`)
        .then((res) => {
          const index = this.comments.findIndex((comment) => {
            return comment.commentId === commentId;
          });
          this.comments[index].reply = res.data.content;
          this.isReply = !this.isReply;
        });
    },
  },
};
</script>

<style scoped>
.container {
  width: 1280px;
  display: flex;
}
.boardItem {
  position: relative;
  background-color: aqua;
}
.profile {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
}
.profileImg {
  border-radius: 100px;
}
.profileInfo {
  display: flex;
}
.invisibleMenu {
  position: absolute;
  right: 20px;
  top: 20px;
}
.img {
  border-radius: 10px;
}
.icon {
  display: flex;
  padding: 10px;
  gap: 10px;
}
.boardCreatedAt {
  color: gray;
  font-size: 14px;
  padding: 5px 10px;
}
.boardContent {
  padding: 10px;
}
.hr {
  margin: 5px;
}
.comment {
  width: 50%;
  display: flex;
  justify-content: center;
  height: 442px;
  overflow-y: scroll;
  background-color: blue;
}
</style>