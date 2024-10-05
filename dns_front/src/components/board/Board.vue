<template>
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
      <v-icon>mdi-chat</v-icon>
      <v-icon>mdi-send</v-icon>
    </div>

    <div class="boardCreatedAt">{{ post.createdAt }}</div>
    <div class="boardContent">{{ post.postContent }}</div>

    <hr class="hr">
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
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
</style>