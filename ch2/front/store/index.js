export const state = () => ({
    hello: 'vuex',
  });
  
  export const mutations = {
    bye(state) {//state에 접근하기 위해 파라미터로 받아준다
      state.hello = 'goodbye';
    },
    addMainPost() {
  
    },
  };
  