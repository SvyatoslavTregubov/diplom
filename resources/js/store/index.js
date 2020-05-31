import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import user from './modules/user'
import clients from './modules/clients';
import agents from "./modules/agents";


const store = new Vuex.Store({
    modules: {
        user,
        clients,
        agents
    }
})

export default store
