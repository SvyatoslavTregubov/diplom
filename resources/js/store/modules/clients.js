import axios from 'axios';

const state = () => ({
    clients: {},
    loading: {}
});

const getters = {
    clientsList(state) {
        return state.clients
    },
    load(state) {
        return state.loading
    }
};

const actions = {
    getClients({commit, state}) {
        commit('setLoading', true)
        axios.get(
            '/api/clients',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }
        ).then((result) => {
            if (result.status === 200) {
                commit('setClients', result.data);
            }
            commit('setLoading', false)
        });
    }
}

const mutations = {
    setClients(state, clients) {
        state.clients = clients;
    },
    setLoading(state, value) {
        state.loading = value
    }
}

export default {
    namespaced: true,
    mutations,
    getters,
    state,
    actions
};

