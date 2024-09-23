<template>
  <div>
    <!-- 수정 상태가 false -->
    <ul v v-if="isComment == false">
      <div>
        댓글번호 : {{ comment.commentId }}
        {{ comment.memberProfileImage }}
        {{ comment.memberProfile.nickname }}<br />
        {{ comment.commentContent }}
        <button @click="editComment()">수정</button>
        <button @click="deleteComment(post.postId, comment.commentId)">
          삭제
        </button>
      </div>
    </ul>
    <!-- 수정 상태가 true -->
    <ul v v-else>
      <div>
        {{ comment.memberProfileImage }}
        {{ comment.memberNickName }}<br />
        <input type="text" v-model="editCommentText" />
        <button @click="EDIT_Comment(post.postId, comment.commentId)">
          수정완료
        </button>
        <button @click="editComment()">취소</button>
      </div>
    </ul>
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
      //       "content": [
      // {
      // "commentId": 12,
      // "postId": 2,
      // "memberProfile": {
      // "memberId": 1,
      // "profileImageUrl": "a"
      // "nickname": "a"
      // },
      // "commentContent": "12",
      // "createdAt": "2024-09-18T16:02:54"
      // "updatedAt": null,
      // "parentCommentId": null,
      // "deleted": false
      // ] ,
      // "pageNumber": 0,
      // "size": 10,
      // "first": true,
      // "last": true
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editCommentText: "",
      isComment: false,
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
      this.$axios
        .patch(`/posts/${postId}/comments/${commentId}`, this.editCommentText)
        .then((res) => {
          if (res.state == 202) {
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
    //댓글 삭제
    deleteComment(postId, commentId) {
      //로그인한 멤버id랑 비교하는거로 수정해야함
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