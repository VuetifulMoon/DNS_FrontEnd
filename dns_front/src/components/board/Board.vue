<template>
  <div class="container">
    <div v-if="isBoard == false" class="boardItem">
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

      <v-icon @click="editBoard" class="invisibleMenu">mdi-menu</v-icon>

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
      <button @click="EDIT_BOARD()">(수정완료)</button>
      <button @click="editBoardCancel()">(취소)</button>
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
      memberId: 1,
      comments: [],
      isComment: false,
      isBoard: false,
      isReply: false,
      editBoardText: "",
      editBoardImages: [],
      comment: "",
      commentId: 1,
      thumbnail: [],
    };
  },
  methods: {
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
    //게시물 삭제
    deleteBoard(postId) {
      //로그인한 멤버id랑 비교하는거로 수정해야함
      if (this.post.memberId == 1) {
        this.$axios
          .delete(`/post/${postId}`)
          .then((res) => {
            if (res.status == 200) {
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