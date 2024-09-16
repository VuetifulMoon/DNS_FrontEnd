<template>
  <div>
    <ul>
      <li v-for="post in posts" :key="post.postId">
        <BoardList :post="post" />
      </li>
    </ul>
  </div>
</template>
<script>
import BoardList from "./BoardList";
export default {
  components: {
    BoardList,
  },
  created() {
    this.fetchBoard();
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
          contents: "저녁먹고싶다.",
          images: ["게시글 사진1", "게시글 사진2"],
        },
      ],
    };
  },
  methods: {
    //게시글 목록 조회
    // fetchBoard() {
    //   return (
    //     this.$axios
    //       // .get("http://172.16.101.131:8080/posts")
    //       .get("/posts")
    //       .then((res) => {
    //         console.log("통신 결과값 :" + res);
    //         this.posts.push(res.data);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       })
    //   );
    // },
  },
};
</script>