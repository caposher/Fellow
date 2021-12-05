import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../pages/home.vue';
import about from '../pages/about.vue';
import login from '../pages/login.vue';
import board from '../pages/board.vue';
import cardDetails from '../pages/card-details.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        // component: home,
        component: login,
    },
    {
        path: '/about',
        name: 'about',
        component: about
    },
    {
        path: '/home',
        // path: '/login',
        name: 'login',
        component: home
    },
    {
        // get params id
        path: '/b/:boardId',
        name: 'board',
        component: board,
        children: [
            {
                path: 'c/:cardId',
                name: 'cardDetails',
                component: cardDetails,
            },

        ],
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
