import axios from 'axios';
import router from "../../router";

const state = () => ({
    user: {},
    loginStatus: '',
});

const getters = {
    user(state) {
        return state.user
    },
    userToken(state) {
        return state.user.access_token
    },
    loginStatus(state) {
        return state.loginStatus
    }
};

const actions = {
    sendLogin({commit, state}, user) {
        const formData = new FormData();
        for (let key in user) {
            formData.append(key, user[key]);
        }

        axios.post(
            '/api/auth/login',
            formData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }
        ).then((result) => {
            if (result.status === 200) {
                commit('saveUser', result.data);
                router.push({name: 'home'})
            } else {
                commit('loginStatus', result.data.message)
            }
        });
    }
}

const mutations = {
    saveUser(state, user) {
        state.user = user
        localStorage.setItem('token', user.access_token)
    },
    loginStatus(state, msg) {
        state.loginStatus = msg
    }
}

export default {
    namespaced: true,
    mutations,
    getters,
    state,
    actions
};

