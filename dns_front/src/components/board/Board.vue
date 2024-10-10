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
        <v-icon @click="fetchComment">mdi-chat</v-icon>
        <v-icon>mdi-send</v-icon>
      </div>

      <div class="boardCreatedAt">{{ post.createdAt }}</div>
      <div class="boardContent">{{ post.postContent }}</div>

      <hr class="hr" />
    </div>
    <div class="comment">
      <div v-if="isComment === true">
        <input type="text" v-model="comment" placeholder="댓글 달기" />
        <button @click="postComment">작성</button>
        <ul>
          <li v-for="comment in comments" :key="comment.commentId">
            <hr />
            <Comment :post="post" :comment="comment" />
            <button @click="fetchReply(comment.commentId)">댓글 더보기</button>
            <br />
            <div v-if="isReply === true">
              <ul v-for="(reply, idx) in comment.reply" :key="idx">
                <Reply :reply="reply" />
              </ul>
            </div>
          </li>
        </ul>
        <infinite-loading
          @infinite="fetchComment"
          spinner="spiral"
          :scrollable-target="'.comment'"
        ></infinite-loading>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "@/components/reply/Comment.vue";
import InfiniteLoading from "vue-infinite-loading";
import Reply from "@/components/reply/Reply.vue";
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  components: { Reply, Comment, InfiniteLoading },
  data() {
    return {
      comments: [],
      isComment: false,
      isBoard: false,
      isReply: false,
      editBoardText: "",
      editBoardImages: [],
      comment: "",
      commentId: 1,
    };
  },
  methods: {
    //댓글 작성
    postComment() {
      const comment = {
        memberId: 1,
        commentContent: this.comment,
      };
      this.$axios
        .post(`/posts/${this.post.postId}/comments`, comment)
        .then((res) => {
          if (res.status == 201) {
            alert("댓글 작성이 완료되었습니다");
          } else {
            alert("실패했습니다. 다시 시도해주세요.");
          }
          this.comment = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchComment($state) {
      this.isComment = true;
      let url = `/posts/${this.post.postId}/comments`;

      if (this.commentId > 1) {
        url = `/posts/${this.post.postId}/comments?lastCommentId=${this.commentId}`;
      }
      this.$axios
        .get(url)
        .then((res) => {
          if (res.data.content.length > 0) {
            this.comments = [...this.comments, ...res.data.content];
            this.commentId =
              res.data.content[res.data.content.length - 1].commentId;

            // 데이터가 더 이상 없으면 complete 호출
            if (res.data.content.length < 10) {
              if ($state) $state.complete();
            } else {
              if ($state) $state.loaded();
            }
          } else {
            if ($state) $state.complete();
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
          console.log(this.comments[0].reply);
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
  overflow-y: auto;
}
</style>