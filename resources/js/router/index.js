import Vue from 'vue'
import User from "../helpers/user";
import ExampleComponent from "../components/ExampleComponent";
import AuthPage from "../pages/AuthPage";
import VueRouter from "vue-router";

Vue.use(VueRouter);


const routes = [
    {path: '/', name: 'home', component: ExampleComponent},
    {path: '/auth', name: 'auth', component: AuthPage},
];

const router = new VueRouter({
    routes: routes,
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    // if (User.isAuthenticated()) {
    //     next()
    // }
    // next('/auth')
    next();

});

export default router

