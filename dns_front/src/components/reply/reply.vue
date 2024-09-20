<template>
  <div>
    프로필 이미지 :{{ reply.memberProfileImage }} 닉네임 :{{
      reply.memberNickName
    }}
    작성 내용 : {{ reply.commentContent }} <br />부모댓글 번호 :
    {{ reply.parentCommentId }}
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