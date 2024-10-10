<template>
  <div>
    <button @click="postBoard">게시물 작성</button>
    <div v-if="isPost === true">
      <div>
        <input type="file" multiple v-on:change="upLoadImg" /><br />
        <div v-if="thumbnailImages.length">
          <img
            v-for="(image, idx) in thumbnailImages"
            :key="idx"
            :src="image"
            style="width: 100px; height: 100px"
          />
        </div>
        프로필 이미지 닉네임
        <input
          type="text"
          v-model="boardText"
          style="border: 1px solid black"
          placeholder="작성할 내용을 입력"
        />
        <button @click="POST_BOARD()">작성완료</button>
        <button>취소</button>
      </div>
    </div>
    <Board
      class="board"
      v-for="post in posts"
      :key="post.postId"
      :post="post"
    />
  </div>
</template>

<script>
import Board from "../components/board/Board";

export default {
  components: {
    Board,
  },
  data() {
    return {
      boardText: "",
      thumbnailImages: [],
      boardImage: [],
      isPost: false,
      memberId: 1,
      posts: [
        {
          memberId: 1,
          postId: 1,
          profile: "프로필 이미지",
          nickName: "Canelo",
          createdAt: "5분 전",
          postContent: "저녁먹고싶다.",
          images: ["게시글 사진1", "게시글 사진2"],
        },
      ],
    };
  },
  methods: {
    upLoadImg(e) {
      const files = e.target.files;
      this.boardImage = []; // 기존 이미지 배열 초기화

      for (let i = 0; i < files.length; i++) {
        let image = window.URL.createObjectURL(files[i]);
        //썸네일 이미지 배열에 추가
        this.thumbnailImages.push(image); // 배열에 이미지 URL 추가
        this.boardImage.push(files[i]); // 배열에 파일 자체를 저장
        console.log(image);
      }
    },
    postBoard() {
      this.isPost = !this.isPost;
    },
    POST_BOARD() {
      //formData 객체 생성
      const formData = new FormData();

      formData.append("postContent", this.boardText); // 게시물 텍스트 추가

      this.boardImage.forEach((img) => {
        formData.append("images", img); // 파일 추가
      });
      formData.append("memberId", this.memberId);

      this.$axios
        .post("/posts", formData)
        .then((res) => {
          if (res.status === 201) {
            alert("게시물 작성이 완료되었습니다");
            window.location.reload();
          } else {
            alert("작성을 실패하였습니다. 다시 시도해라");
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    },
    fetchBoard() {
      return (
        this.$axios
          // .get("http://172.16.101.131:8080/posts")
          .get("/posts?page=0")
          .then((res) => {
            console.log("통신 결과값 :" + res);
            this.posts = res.data.content;
          })
          .catch((err) => {
            console.log(err);
          })
      );
    },
  },
  created() {
    this.fetchBoard();
  },
};
</script>

<style>
.board {
  width: 400px;
}
</style>