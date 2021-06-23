export const state = () => ({
  mainPosts: [],//게시글을 담아둘 배열을 만들어 준다
});

export const mutations = {
  addMainPost(state, payload) {
    state.mainPosts.unshift(payload);//push 맨뒤에 추가, unshift 맨앞에 추가
  },
  removeMainPost(state, payload) {//게시물삭제
    const index = state.mainPosts.findIndex(v => v.id === payload.id);
    state.mainPosts.splice(index, 1);
  },
  addComment(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts[index].Comments.unshift(payload);
  }
};

export const actions = {
  add({ commit }, payload) {
    // 서버에 게시글 등록 요청 보냄
    commit('addMainPost', payload);
  },
  remove({ commit }, payload) {
    commit('removeMainPost', payload);
  },
  addComment({ commit }, payload) {
    commit('addComment', payload);
  },
};