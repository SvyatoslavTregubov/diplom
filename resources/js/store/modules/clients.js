import axios from 'axios';
import User from "../../helpers/user";

const state = () => ({
    clients: {},
    loading: {},
    msg: ''
});

const getters = {
    clientsList(state) {
        return state.clients
    },
    load(state) {
        return state.loading
    },
    msg(state) {
        return state.msg
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
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': 'Bearer '+ User.getToken()
                }
            }
        ).then((result) => {
            if (result.status === 200) {
                commit('setClients', result.data.clients);
            }
            commit('setLoading', false)
        });
    },
    addClient({commit, state}, client) {
        const formData = new FormData();
        for (let key in client) {
            formData.append(key, client[key]);
        }
        commit('setLoading', true)
        axios.post(
            '/api/clients',
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
                commit('addClient', result.data);
                commit('setMsg', "Клиент успешно добавлен");
            }
            commit('setLoading', false)
        });
    },
    deleteClient({commit, state}, clientId) {
        commit('setLoading', true)
        axios.delete(
            `/api/clients/${clientId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': 'Bearer '+ User.getToken()
                }
            }
        ).then((result) => {
            if (result.status === 200) {
                commit('removeClient', clientId);
                commit('setMsg', result.data.msg);
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
    },
    addClient(state, value) {
        state.clients.push(value)
    },
    setMsg(state, value) {
        state.msg = value
    },
    removeClient(state, clientId) {
        state.clients = state.clients.filter((client) => client.id != clientId);
    }
}

export default {
    namespaced: true,
    mutations,
    getters,
    state,
    actions
};

