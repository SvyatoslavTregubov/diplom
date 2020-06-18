import axios from 'axios';
import User from "../../helpers/user";

const state = () => ({
    errors: {},
    loading: {},
    msg: ''
});

const getters = {
    errorsList(state) {
        return state.errors
    },
    load(state) {
        return state.loading
    },
    msg(state) {
        return state.msg
    }
};

const actions = {
    getErrors({commit, state}) {
        commit('setLoading', true)
        axios.get(
            '/api/errors',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': 'Bearer ' + User.getToken()
                }
            }
        ).then((result) => {
            if (result.status === 200) {
                commit('setErrors', result.data.errors);
            }
            commit('setLoading', false)
        });
    },
    filter({commit, state}, type) {
        commit('setLoading', true)
        axios.get(
            '/api/errors/' + type,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': 'Bearer ' + User.getToken()
                }
            }
        ).then((result) => {
            if (result.status === 200) {
                commit('setErrors', result.data.errors);
            }
            commit('setLoading', false)
        });
    },
    updateError({commit, state}, error) {
        const formData = new FormData();
        for (let key in error) {
            formData.append(key, error[key]);
        }
        commit('setLoading', true)
        axios.post(
            `/api/errors`,
            formData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': 'Bearer ' + User.getToken()
                }
            }
        ).then((result) => {
            if (result.status === 203) {

                commit('removeError', error.id)
                commit('addError', result.data);
            }
            commit('setLoading', false)
        });
    }
}

const mutations = {
    setErrors(state, errors) {
        state.errors = errors;
    },
    setLoading(state, value) {
        state.loading = value
    },
    addError(state, value) {
        state.errors.push(value)
    },
    removeError(state, errId) {
        state.errors = state.errors.filter((error) => error.id != errId);
    }
}

export default {
    namespaced: true,
    mutations,
    getters,
    state,
    actions
};

