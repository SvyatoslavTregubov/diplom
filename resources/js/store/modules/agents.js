import axios from 'axios';
import User from "../../helpers/user";

const state = () => ({
    agents: [],
    loading: {}
});

const getters = {
    agentsList(state) {
        return state.clients
    },
    load(state) {
        return state.loading
    }
};

const actions = {
    getAgents({commit, state}) {
        commit('setLoading', true)
        axios.get(
            '/api/agents',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': 'Bearer '+ User.getToken()
                }
            }
        ).then((result) => {
            console.log(result);
            if (result.status === 200) {
                commit('setAgents', result.data);
            }
            commit('setLoading', false)
        });
    },
    addAgent({commit, state}, agent) {
        const formData = new FormData();
        for (let key in agent) {
            formData.append(key, agent[key]);
        }
        commit('setLoading', true)
        axios.post(
            '/api/agents',
            formData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': 'Bearer '+ User.getToken()
                }
            }
        ).then((result) => {
            if (result.status === 201) {
                commit('addAgent', result.data);
            }
            commit('setLoading', false)
        });
    }
}

const mutations = {
    setAgents(state, clients) {
        state.clients = clients;
    },
    addAgent(state, agent) {
        state.agents.push(agent);
    },
    setLoading(state, value) {
        state.loading = value
    },
}

export default {
    namespaced: true,
    mutations,
    getters,
    state,
    actions
};

