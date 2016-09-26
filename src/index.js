import Vue from 'vue';
import VueRouter from 'vue-router';
// import VueResource from 'vue-resource';
import App from './components/app.vue';
import Home from './components/home.vue';
import Login from './components/login.vue';

// Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter();

router.map({
    '/home': {
        component: Home
    },
    '/login': {
        component: Login
    }
});

router.redirect({
    '*': '/home'
});

router.start(App, '#app');

export default router;
