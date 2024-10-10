<template>
  <div>
    <!-- 수정 상태가 false -->
    <div v-if="isComment == false">
      <div>
        댓글번호 : {{ comment.commentId }}
        {{ comment.memberProfileImage }}
        {{ comment.memberProfile.nickname }}<br />
        {{ comment.commentContent }}
        <div v-if="comment.memberProfile.memberId === this.memberId">
          <button @click="editComment()">수정</button>
          <button @click="deleteComment(post.postId, comment.commentId)">
            삭제
          </button>
        </div>
      </div>
      <input type="text" v-model="reply" placeholder="대댓글 달기" />
      <button @click="postReply">작성</button>
    </div>
    <!-- 수정 상태가 true -->
    <div v-else>
      {{ comment.memberProfileImage }}
      {{ comment.memberNickName }}<br />
      <input type="text" v-model="editCommentText" />
      <button @click="EDIT_Comment(post.postId, comment.commentId)">
        수정완료
      </button>
      <button @click="editComment()">취소</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editCommentText: "",
      isComment: false,
      reply: "",
      memberId: 1,
    };
  },
  methods: {
    //댓글 수정 상태 true <> false
    editComment() {
      this.isComment = !this.isComment;
      this.editCommentText = this.comment.commentContent;
    },

    editCommentCancel() {
      this.isComment = false;
      this.editCommentText = "";
    },
    //댓글 수정
    EDIT_Comment(postId, commentId) {
      const data = { memberId: 1, commentContent: this.editCommentText };
      this.$axios
        .patch(`/posts/${postId}/comments/${commentId}`, data)
        .then((res) => {
          if (res.state == 200) {
            alert("수정이 완료되었습니다.");
            this.isComment = false;
          } else {
            alert("실패했습니다. 다시 시도해주세요.");
            this.isComment = false;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    postReply() {
      const reply = {
        memberId: 1,
        commentContent: this.reply,
      };
      this.$axios
        .post(
          `/posts/${this.post.postId}/comments?parentCommentId=${this.comment.commentId}`,
          reply
        )
        .then((res) => {
          if (res.status == 201) {
            alert("대댓글 작성이 완료되었습니다");
          } else {
            alert("실패했습니다. 다시 시도해주세요.");
          }
          this.reply = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //댓글 삭제
    deleteComment(postId, commentId) {
      //로그인한 멤버id랑 비교하는거로 수정해야함
      if (this.comment.memberProfile.memberId === this.memberId) {
        this.$axios
          .delete(
            `/posts/${postId}/comments/${commentId}?memberId=${this.memberId}`
          )
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