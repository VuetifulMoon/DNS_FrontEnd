import axios from "axios";

const state = () => ({
  notice: []
})

const mutations = {
  fetchNotice(state, notice) {
    state.notice = notice;
  }

}
const actions = {
  fetchNotice({commit}, memberId) {
    axios.get(`/notification/${memberId}`)
    .then((res) => {
      commit('fetchNotice', res.data);
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }
}

export default {
  amespaced: true,
  state,
  actions,
  mutations
}