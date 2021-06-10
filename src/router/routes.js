/**
 *
 * routes.js
 * @author : ONDER SAHIN
 * @year : 2020
 *
 */

//import DefaultLayout from '../layouts/Default.vue';
import store from '../store/'
// {
//     path: '/',
//         component: () => import('@/layouts/home/Index.vue'),
//     redirect:'/home',

const routes = [
    {
        path: '/login',
        component: () => import('@/views/login/'),
        name: 'login',
        meta: {
            isPublic: true,
            onlyWhenLoggedOut: true,
        }
    },

    {
        path: '/',
        component: () => import('@/container/Full'),
        redirect: '/games',
        children: [
            {
                path: '/games',
                component: () => import('@/views/games/'),
                name: 'games',
                meta: {
                    isPublic: false,
                    requiresAuth: true,
                },
            },
            {
                path: '/candy-crush',
                name: 'candycrush_game',
                component: () => import(/* webpackChunkName: "about" */ '@/views/candycrush/'),
                meta: {
                    isPublic: false,
                    requiresAuth: true,

                },
            }
        ]
    },

]
export default routes;
