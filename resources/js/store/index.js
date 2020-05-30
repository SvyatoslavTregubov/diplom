import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import user from './modules/user'
import clients from './modules/clients';


const store = new Vuex.Store({
    modules: {
        user,
        clients
    }
})

export default store
