import axios from 'axios';
import User from "../../helpers/user";

const state = () => ({
    agents: [],
    loading: {},
    msg: '',
});

const getters = {
    agentsList(state) {
        return state.agents
    },
    load(state) {
        return state.loading
    },
    msg(state) {
        return state.msg
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
                commit('setMsg', 'Агент успешно добавлен');
            }
            commit('setLoading', false)
        });
    }
}

const mutations = {
    setAgents(state, agents) {
        state.agents = agents;
    },
    addAgent(state, agent) {
        state.agents.push(agent);
    },
    setLoading(state, value) {
        state.loading = value
    },
    setMsg(state, msg) {
        state.msg = msg
    }
}

export default {
    namespaced: true,
    mutations,
    getters,
    state,
    actions
};

