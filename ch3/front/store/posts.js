export const state = () => ({
  mainPosts: [],//게시글을 담아둘 배열을 만들어 준다
  hasMorePost: true,//10개 불러오고 시작 10개이하시 false로 바뀌다
});

const totalPosts = 51;//총 개시물 수 더미데이터 넣어준다
const limit = 10;

export const mutations = {
  addMainPost(state, payload) {
    state.mainPosts.unshift(payload);//push 맨뒤에 추가, unshift 맨앞에 추가
  },
  removeMainPost(state, payload) {//게시물삭제
    const index = state.mainPosts.findIndex(v => v.id === payload.id);
    state.mainPosts.splice(index, 1);//index자리에서 1개를 자르겠다는 의미
  },
  addComment(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts[index].Comments.unshift(payload);//state.mainPosts[index].Comments = payload.data
  },
  loadPosts(state) {
    const diff = totalPosts - state.mainPosts.length; // 아직 안 불러온 게시글 수
    const fakePosts = Array(diff > limit ? limit : diff).fill().map(v => ({
      id: Math.random().toString(),
      User: {
        id: 1,
        nickname: '제로초',
      },
      content: `Hello infinite scrolling~ ${Math.random()}`,
      Comments: [],
      Images: [],
    }));
    state.mainPosts = state.mainPosts.concat(fakePosts);
    state.hasMorePost = fakePosts.length === limit;
  },
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
  loadPosts({ commit, state }, payload) {
    if (state.hasMorePost) {
      commit('loadPosts');
    }
  }
};