import Vue from 'vue'
import User from "../helpers/user";
import HomePage from "../pages/HomePage";
import ClientsPage from "../pages/ClientsPage";
import AuthPage from "../pages/AuthPage";
import VueRouter from "vue-router";
import MachinePage from "../pages/MachinePage";

Vue.use(VueRouter);

const routes = [
    {path: '/', name: 'home', component: HomePage},
    {path: '/auth', name: 'auth', component: AuthPage},
    {path: '/clients', name: 'clients', component: ClientsPage},
    {path: '/machine', name: 'machines', component: MachinePage},
];

const router = new VueRouter({
    routes: routes,
    mode: 'history'
});

// router.beforeEach((to, from, next) => {
//     console.log(User.isAuthenticated());
//     if (User.isAuthenticated() && to.name != 'auth') {
//         next()
//     } else {
//         next({name: 'auth'})
//     }
// });

export default router

