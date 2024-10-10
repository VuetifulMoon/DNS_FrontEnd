<template>
  <div>
    <h3>대댓글 목록</h3>
    <hr />
    프로필 이미지 :{{ reply.memberProfile.profileImageUrl }}<br />
    닉네임 :{{ reply.memberProfile.nickname }} <br />
    작성 내용 :{{ reply.commentContent }}
  </div>
</template>
<script>
export default {
  props: {
    reply: {
      type: Object,
      required: true,
    },
  },
};
</script>