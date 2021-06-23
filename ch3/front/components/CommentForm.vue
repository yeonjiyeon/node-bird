<template>
  <v-form ref="form" v-model="valid" style="position: relative" @submit.prevent="onSubmitForm">
    <v-textarea
      v-model="content"
      filled
      auto-grow
      label="댓글 달기"
      :hide-details="hideDetails"
      :success="success"
      :success-messages="successMessages"
      @input="onChangeTextarea"
    />
    <v-btn color="green" dark absolute top right type="submit">삐약</v-btn>
  </v-form>
</template>

<script>
  export default {
    props: {
      postId: {//id만 상속받는다
        type: String,
        required: true,
      },
    },
    data() {
      return {
        valid: false,
        content: '',
        success: false,
        successMessages: '',
        hideDetails: true,
      };
    },
    computed: {//Vuex 상태를 Vue 컴포넌트에서 가져오기
      me() {
        return this.$store.state.users.me;
      },
    },
    methods: {
      onChangeTextarea(value) {
        if (value.length) {
          this.hideDetails = true;
          this.success = false;
          this.successMessages = '';
        }
      },
      onSubmitForm() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('posts/addComment', {//dispatch함수실행시킨다
            id: Date.now(),
            postId: this.postId,
            content: this.content,
            User: {
              nickname: this.me.nickname,
            },
          })
            .then(() => {
              this.content = '';
              this.success = true;
              this.successMessages = '댓글이 작성되었습니다.';
              this.hideDetails = false;
            })
            .catch(() => {
            });
        }
      },
    },
  };
</script>

<style>
</style>