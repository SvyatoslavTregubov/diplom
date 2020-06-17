import axios from 'axios';
import User from "../../helpers/user";

const state = () => ({
    machines: {},
    loading: {},
    msg: ''
});

const getters = {
    machinesList(state) {
        return state.machines
    },
    load(state) {
        return state.loading
    },
    msg(state) {
        return state.msg
    }
};

const actions = {
    getMachines({commit, state}) {
        commit('setLoading', true)
        axios.get(
            '/api/machines',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': 'Bearer '+ User.getToken()
                }
            }
        ).then((result) => {
            if (result.status === 200) {
                commit('setMachines', result.data.products);
            }
            commit('setLoading', false)
        });
    },
    addMachine({commit, state}, machine) {
        const formData = new FormData();
        for (let key in machine) {
            formData.append(key, machine[key]);
        }
        commit('setLoading', true)
        axios.post(
            '/api/machines',
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
                commit('addMachine', result.data);
                commit('setMsg', "Оборудование успешно добавлено");
            }
            commit('setLoading', false)
        });
    },
    deleteMachine({commit, state}, machineId) {
        commit('setLoading', true)
        axios.delete(
            `/api/machines/${machineId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': 'Bearer '+ User.getToken()
                }
            }
        ).then((result) => {
            if (result.status === 200) {
                commit('removeMachine', machineId);
                commit('setMsg', result.data.msg);
            }
            commit('setLoading', false)
        });
    }
}

const mutations = {
    setMachines(state, machines) {
        state.machines = machines;
    },
    setLoading(state, value) {
        state.loading = value
    },
    addMachine(state, value) {
        state.machines.push(value)
    },
    setMsg(state, value) {
        state.msg = value
    },
    removeMachine(state, machineId) {
        state.machines = state.machines.filter((machine) => machine.id != machineId);
    }
}

export default {
    namespaced: true,
    mutations,
    getters,
    state,
    actions
};

