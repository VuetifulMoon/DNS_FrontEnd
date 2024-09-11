<template>
  <div>
    <h1>게시판 입니다.</h1>
    <ul>
      <!-- 게시글 for문 -->
      <li v-for="post in posts" :key="post.postId">
        <!-- 이미지 for문 -->
        멤버 ID : {{ post.memberId }}<br />
        {{ post.profile }}
        {{ post.nickName }}
        {{ post.createdAt }}
        <div v-for="(image, idx) in post.images" :key="idx">
          {{ image }}
        </div>
        {{ post.contents }}
      </li>
    </ul>
    <div>
      <button @click="fetchReply()">댓글 보기</button>
      <br />
      <br />
      <br />
      <div v-if="replyState == true">
        <ul>
          <li v-for="(reply, idx) in commnets" :key="idx">
            {{ reply.profile }}
            {{ reply.nickName }}
            {{ reply.comment }}
          </li>
        </ul>
      </div>
      <div v-else>댓글 숨겨짐</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      replyState: false,
      comments: [],
      posts: [
        // {
        //   memberId: 1,
        //   postId: 1,
        //   profile: "프로필 이미지",
        //   nickName: "Canelo",
        //   createdAt: "5분 전",
        //   contents: "저녁먹고싶다.",
        //   images: ["게시글 사진1", "게시글 사진2"],
        // },
      ],
    };
  },
  created() {
    this.fetchBoard();
  },
  methods: {
    //게시글 조회 api
    fetchBoard() {
      return this.$axios
        .get("http://172.16.101.131:8080/posts")
        .then((res) => {
          console.log("통신 결과값 :" + res);
          this.posts.push(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchReply() {
      this.replyState = !this.replyState;
      return this.$axios
        .get(`http://172.16.101.131:8080//posts/${this.posts.postId}/comments`)
        .then((res) => {
          console.log("통신 결과값 :" + res);
          this.commnets.push(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>