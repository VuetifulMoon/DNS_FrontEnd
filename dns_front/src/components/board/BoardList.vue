<template>
  <div>
    <h1>게시판 입니다.</h1>
    <!-- 게시글 for문-->
    <div v-if="isBoard == false">
      <div>
        멤버 ID : {{ post.memberId }}<br />
        게시물 ID : {{ post.postId }}<br />
        {{ post.profile }}
        {{ post.nickname }}
        {{ post.createdAt }}<br />
        <!-- 이미지 for문 -->
        <div v-for="(image, idx) in post.images" :key="idx">
          <img :src="image" alt="사진" />
        </div>
        {{ post.postContent }}
      </div>
      <!-- 내가 작성한 게시물이면 수정,삭제 가능 -->
      <div v-if="post.memberId === this.memberId">
        <button @click="editBoard()">수정</button>
        <button @click="deleteBoard(post.postId)">삭제</button>
      </div>
    </div>
    <div v-else>
      <div>
        멤버 ID : {{ post.memberId }}<br />
        {{ post.profile }}
        {{ post.nickName }}
        {{ post.createdAt }}<br />
        <!-- 이미지 for문 -->
        <!-- <input type="file" multiple /><br /> -->
        <v-file-input
          width="200"
          type="file"
          v-model="editBoardImages"
          multiple
        />
        <div v-if="editBoardImages.length">
          <img
            v-for="(image, idx) in thumbnail"
            :key="idx"
            :src="image"
            style="width: 100px; height: 100px"
          />
        </div>
        <input type="text" v-model="editBoardText" />
      </div>
      <button @click="EDIT_BOARD()">수정완료</button>
      <button @click="editBoardCancel()">취소</button>
    </div>
    <div>
      <button @click="fetchComment(post.postId)">댓글 보기</button>
      <br />
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
    <input type="text" v-model="comment" placeholder="댓글 달기" />
    <button @click="postComment">작성</button>
  </div>
</template>
<script>
import Comment from "../reply/Comment";
import Reply from "../reply/Reply";
export default {
  components: { Comment, Reply },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      memberId: 1,
      comments: [],
      isComment: false,
      isBoard: false,
      isReply: false,
      editBoardText: "",
      editBoardImages: [],
      comment: "",
      thumbnail: [],
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
    //게시물 수정 상태 true <> false
    editBoard() {
      this.isBoard = !this.isBoard;
      this.editBoardText = this.post.postContent;
      // this.editBoardImages.push(this.post.images);
      for (let i = 0; i < this.post.images.length; i++) {
        let image = window.URL.createObjectURL(this.post.images[i]);
        this.thumbnail.push(image);
        this.editBoardImages.push(this.post.images[i]); // 배열에 파일 자체를 저장
      }
    },
    editBoardCancel() {
      this.isBoard = false;
      this.editBoardText = "";
      this.editBoardImages = [];
    },
    //게시물 수정
    EDIT_BOARD() {
      //formData 객체 생성
      const formData = new FormData();

      formData.append("postContent", this.editBoardText); //게시물 수정 내용

      this.editBoardImages.forEach((img) => {
        formData.append("images", img); // 이미지 추가
      });
      formData.append("memberId", this.memberId);

      this.$axios.patch(`/posts/${this.post.postId}`, formData).then((res) => {
        if (res.state == 202) {
          alert("수정이 완료되었습니다.");
          this.isBoard = false;
        } else {
          alert("실패했습니다. 다시 시도해주세요.");
          this.isBoard = false;
        }
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
        });
    },

    //게시물 삭제
    deleteBoard(postId) {
      //로그인한 멤버id랑 비교하는거로 수정해야함
      if (this.post.memberId == 1) {
        this.$axios
          .delete(`/posts/${postId}`)
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