<template>
  <div>
    <Board class="board" v-for="post in posts" :key="post.postId" :post="post"/>
  </div>
</template>

<script>
import Board from '../components/board/Board';

export default {
  components: {
    Board
  },
  data() {
    return {
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
  }
}
</script>

<style>
.board {
  width: 400px;
}
</style>