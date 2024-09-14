<template>
  <div>
    <!-- 수정 상태가 false -->
    <ul v v-if="editReplyState == false">
      <div>
        {{ reply.profile }}
        {{ reply.nickName }}<br />
        {{ reply.comment }}
        <button @click="editReply(reply.commnetId)">수정</button>
        <button @click="deleteReply(posts.postId, reply.commnetId)">
          삭제
        </button>
      </div>
    </ul>
    <!-- 수정 상태가 true -->
    <ul v v-else>
      <div>
        {{ reply.profile }}
        {{ reply.nickName }}<br />
        <input type="text" v-model="editReplyText" />
        <button @click="EDIT_REPLY()">완료</button>
        <button @click="editReply()">취소</button>
      </div>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    posts: {
      type: Array,
      required: true,
    },
    reply: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editReplyText: "",
      editReplyState: false,
    };
  },
  methods: {
    //수정 상태 true <> false
    editReply() {
      this.editReplyState = !this.editReplyState;
      this.editReplyText = this.reply.comment;
      console.log(this.reply);
    },
    //댓글 수정
    EDIT_REPLY() {
      this.$axios
        .patch(
          `/posts/${this.post.postId}/comments/${this.commnets.commentId}`,
          this.editReplyText
        )
        .then((res) => {
          if (res.state == 202) {
            alert("수정이 완료되었습니다.");
            this.editReplyState = false;
          } else {
            alert("실패했습니다. 다시 시도해주세요.");
          }
        });
    },
    //댓글 삭제
    deleteReply(postId, commentId) {
      if (this.comments.memberId == 1) {
        this.$axios
          .delete(`/posts/${postId}/comments/${commentId}`)
          .then((res) => {
            if (res.status == 204) {
              alert("삭제가 완료되었습니다.");
            } else {
              alert("실패했습니다. 다시 시도해주세요.");
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